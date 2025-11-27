import Bottleneck from "bottleneck";
import { getFromCache, writeToCache } from "./cache";
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
  const url = new URL(`${ORCID_API_URL}/${orcidId}/works`);
  return await fetchJson(url, { Accept: 'application/json' });
}

async function getCrossrefMetadata(doi: string) {
  const url = new URL(
    `${CROSSREF_API_URL}/works/${encodeURIComponent(doi)}`
  );
  const data = await fetchJson(url);
  return data.message;
}

const getSemanticScholarDataLimitter = limeter.wrap(getSemanticScholarData);

async function getSemanticScholarData(doi: string) {
  const cached = getFromCache(doi);
  if(cached) {
    console.log("Hit the cache for sematic scholar");
    return cached
  };   

  const url = new URL(
    `${SEMANTICSCHOLAR_API_URL}/graph/v1/paper/DOI:${encodeURIComponent(
      doi
    )}?fields=title,year,citationCount,authors`
  );
  const data = await fetchJson(url);

  writeToCache(doi, data);
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

export async function getPublicationsFromOrcid() {
  try {
    const works: OrcidWork  = await getOrcidWorks(process.env.ORCID_ID ?? '');    
    const filteredWorks = works.group.filter(w => w['work-summary'][0].type === "journal-article");    
    const dois = extractDois(filteredWorks); 

    const publications = [];

    for (const doi of dois) {      
      const meta = await getCrossrefMetadata(doi);
      console.log("Meta: ", util.inspect(meta, { depth: null, colors: true}));
      const semantic = await getSemanticScholarDataLimitter(doi);
      console.log("Semantic: ", util.inspect(semantic, { depth: null, colors: true}));

      const pub = {
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
      };

      publications.push(pub);
    }

    publications.sort((a, b) => b.year - a.year);

    return { count: publications.length, publications };
  } catch (error: unknown) {
    console.error('Error getting data ', error);
    return;
  }
}
