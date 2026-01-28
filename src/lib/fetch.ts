import Bottleneck from "bottleneck";
import { SEMANTICSCHOLAR_API_URL, SEMANTICSCHOLAR_AUTHOR_ID  } from "./constants";
import { cache } from "./cache";


const limeter = new Bottleneck({
  minTime: 3000,
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

const getCachedPaperList = cache(getPaperListByAuthorId, "paperListByAuthorId", 24 * 60 * 60);

export async function getPaperList(type: WorkType) {
  return await getCachedPaperList(type, SEMANTICSCHOLAR_AUTHOR_ID);
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
    throw error;
  }
}

const getCachedAuthorData = cache(getSemanticScholarDataLimitter, "authorData", 24 * 60 * 60);

export async function getAuthorData() : Promise<Author> {  
  return await getCachedAuthorData(SEMANTICSCHOLAR_AUTHOR_ID);
}

const getCachedPaper = cache(getSemanticScholarPaperDataLimitter, "paper", 24 * 60 * 60);

export async function getPaper(paperId: string): Promise<PaperDetail> {
  return await getCachedPaper(paperId);
}