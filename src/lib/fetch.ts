import Bottleneck from "bottleneck";
import { SEMANTICSCHOLAR_API_URL, SEMANTICSCHOLAR_AUTHOR_ID  } from "./constants";
import redis, { CACHE_TTL } from "./cache";


const limeter = new Bottleneck({
  minTime: 300,
  maxConcurrent: 1
})

async function fetchJson<T>(url: URL, headers: HeadersInit = {}) {
  const res = await fetch(url, {
    headers,
  });

  if (!res.ok)
    throw new Error(`HTTP error ${res.status} for ${url.toString()}`);
  return res.json() as T;
}


const getSemanticScholarDataLimitter = limeter.wrap(getSemanticScholarData);
const getSemanticScholarPaperDataLimitter = limeter.wrap(getSemanticScholarPaperData);

async function getSemanticScholarData(authorId: string): Promise<Author> {
  const url = new URL(
    `${SEMANTICSCHOLAR_API_URL}/graph/v1/author/${authorId}?fields=paperCount,citationCount,hIndex,papers.year,papers.citationCount,papers.publicationTypes,papers.publicationDate,papers.journal,papers.fieldsOfStudy,papers.venue,papers.title,papers.isOpenAccess,papers.externalIds`
  );
  return await fetchJson<Author>(url);
}

async function getSemanticScholarPaperData(paperId: string)  {

  const url = new URL(
    `${SEMANTICSCHOLAR_API_URL}/graph/v1/paper/${paperId}?fields=abstract,publicationVenue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy,publicationDate,journal,authors`
  );

  return await fetchJson<PaperDetail>(url);


}


type ExternaleId = {
                ArXiv: string,
                DOI: string,
                CorpusId: string
            }
type Journal = {
              volume: string,
              pages: string,
              name: string
          }

export type Paper = {
  paperId: string,
  title: string,
  externalIds?: ExternaleId,
  venue?: string,
  year?: number,
  citationCount: number,
  isOpenAccess: boolean,
  fieldsOfStudy: Array<string>,
  publicationTypes?: Array<string>,
  publicationDate?: string,
  journal?: Journal
}

type Author = {
  authorId: string,
  paperCount: number,
  citationCount: number,
  hIndex: number,
  papers: Array<Paper>
  name?: string
}

type PublicationVenue = {
    id: string;
    name: string;
    type: string;
    alternate_names: string[];
    issn: string | null;
    url: string | null;
    alternate_urls: string[];
  }

  type OpenAccessPdf = {
    url: string | null;
    status: string | null;
    license: string | null;
    disclaimer: string | null;
  }

  type FieldsOfStudy = {
    category: string;
    source: string;
  }

export type PaperDetail = {
  paperId: string;
  publicationVenue: PublicationVenue  | null;
  title: string;
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean;
  openAccessPdf: OpenAccessPdf | null;
  fieldsOfStudy: string[];
  s2FieldsOfStudy: Array<FieldsOfStudy>;
  publicationDate: string | null; 
  journal: Journal | null;
  authors: Array<Author>;
  abstract: string | null;
}


type WorkType = "journal-article" | "working-paper";

export async function getPaperList(type: WorkType) {
  const key = `author:${SEMANTICSCHOLAR_AUTHOR_ID}:${type}`;
  const cached = await redis.get(key);
  if(cached) {
    console.log("Hit the cache key: ", key);
    return cached as Paper[];
  }
  
  const data = await getPaperListByAuthorId(type, SEMANTICSCHOLAR_AUTHOR_ID);

  await redis.set(key, data, {
    ex: CACHE_TTL
  })

  return data;
}


async function getPaperListByAuthorId( type: WorkType, authorId?: string,): Promise<Array<Paper>> {
  if(!authorId) {
    throw Error("Author ID cannat be null");
  }

  try {
    const response = await getSemanticScholarDataLimitter(authorId);
    
    if(type === "journal-article") {
      const papers = response.papers.filter(p => p.publicationDate);  
      return papers
    }
  
    return response.papers.filter(p => !p.publicationDate); 
  } catch (error) {
    console.error("Error during the fetch working list by author id ", error);
    throw error;
  }
}


export async function getPaper(paperId: string): Promise<PaperDetail> {
  const key = `paper:${paperId}`;
  const cached = await redis.get(key);
  if(cached) {
    console.log("Hit the paper cache: ", paperId);
    return cached as PaperDetail;
  }

  const response = await getSemanticScholarPaperDataLimitter(paperId);

  await redis.set(key, response, {
    ex: CACHE_TTL
  })

  return response;
}