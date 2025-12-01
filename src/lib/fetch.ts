import Bottleneck from "bottleneck";
import redis, { CACHE_TTL } from "./cache";
import { CROSSREF_API_URL, ORCID_API_URL, SEMANTICSCHOLAR_API_URL } from "./constants";
import util from "node:util";

const limeter = new Bottleneck({
  minTime: 300,
  maxConcurrent: 1
})

async function fetchJson(url: URL, headers: HeadersInit = {}) {
  const res = await fetch(url, {
    headers,
  });

  if (!res.ok)
    throw new Error(`HTTP error ${res.status} for ${url.toString()}`);
  return res.json();
}

async function getOrcidWorks(orcidId: string) {
  const key = `orcid:${orcidId}`;
  const cached = await redis.get(key);
  if(cached) {    
    return cached;
  }

  const url = new URL(`${ORCID_API_URL}/${orcidId}/works`);
  const data =  await fetchJson(url, { Accept: 'application/json' });

  await redis.set(key, data, {
    ex: CACHE_TTL
  });

  return data;
}

async function getCrossrefMetadata(doi: string) {
    const key = `crossref:${doi}`;
    const cached = await redis.get(key);
    if(cached) {      
      return cached;
    }

  const url = new URL(
    `${CROSSREF_API_URL}/works/${encodeURIComponent(doi)}`
  );
  const data = await fetchJson(url);

  await redis.set(key, data.message, {
    ex: CACHE_TTL
  });

  return data.message;
}

const getSemanticScholarDataLimitter = limeter.wrap(getSemanticScholarData);

async function getSemanticScholarData(doi: string) {
  const key = `semantic:${doi}`;
  const cached = await redis.get(key);
  if(cached) {
    return cached
  };   

  const url = new URL(
    `${SEMANTICSCHOLAR_API_URL}/graph/v1/paper/DOI:${encodeURIComponent(
      doi
    )}?fields=url,papers.year,papers.citationCount,papers.publicationTypes,papers.publicationDate,papers.journal,papers.fieldsOfStudy,papers.venue,papers.title,papers.isOpenAccess,papers.externalIds`
  );
  const data = await fetchJson(url);

  redis.set(key, data, {
    ex: CACHE_TTL
  });

  return data;
}

function extractDois(orcidWorks: any) {  
  const dois = [];
  for (const item of orcidWorks) {
    const extIds =
      item['external-ids']?.['external-id']?.filter(
        (id: any) => id['external-id-type'] === 'doi'
      ) || [];

    for (const id of extIds) {
      dois.push(id['external-id-value']);
    }
  }

  return [...new Set(dois)];
}

type OrcidWork = {
  group: Array<any>
}

export type Work = {
  paperId: string
  title: string
  year: string
  doi?: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  authors: Array<string>
  citations: number
  keywords: Array<string>
  publicationDate?: string
}



export async function getWorkListFromOrcid(type: "journal-article" | "working-paper") {
  try {
    const orcidWork: OrcidWork  = await getOrcidWorks(process.env.ORCID_ID ?? '');    
    const filteredWorks = orcidWork.group.filter(w => w['work-summary'][0].type === type);    
    const dois = extractDois(filteredWorks); 

    const workList = [];

    for (const doi of dois) {      
      const meta = await getCrossrefMetadata(doi);      
      const semantic = await getSemanticScholarDataLimitter(doi);

      const work: Work = {
        paperId: meta.paperId,
        title: meta.title?.[0] ?? semantic.title,
        year:
          meta.created?.["date-parts"]?.[0]?.[0] ??
          meta.published?.["date-parts"]?.[0]?.[0] ??
          semantic.year,
        doi,
        journal: meta["container-title"]?.[0] ?? null,
        volume: meta.volume ?? null,
        issue: meta["journal-issue"]?.issue ?? null,
        pages: meta.page ?? null,
        authors: meta.author?.map((a: any) => `${a.given} ${a.family}`) ?? [],
        citations: semantic.citationCount ?? 0,
        publicationDate: meta.publicationDate,
        keywords: []
      };

      workList.push(work);
    }

    workList.sort((a, b) => +b.year - +a.year);

    return { count: workList.length, workList };
  } catch (error: unknown) {
    console.error('Error getting data ', error);
    return;
  }
}
