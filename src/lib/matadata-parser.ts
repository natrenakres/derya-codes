import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Metadata = Record<string, string>;

// papers metadata
export type PaperMeta = Metadata & {
  layout?: string;
  title?: string;
  doi?: string;
  page?: string;
  volume?: string;
  journal?: string;
  published?: boolean;
  submitted?: boolean;
  date?: string;
  keywords: Array<string> 
  coauthor: Array<string>
};

export type ProjectMeta = Metadata & {
  layout?: string;
  title?: string;
  summary?: string;
  desc?: string;
  coauthor: Array<string>
}

export function parseFrontmatter<T extends Metadata = Metadata>(
  fileContent: string
) {
  const { content, data} = matter(fileContent);

  return {
    metadata: data as T,
    content
  };
}

export function readMDXFile<T extends Metadata = Metadata>(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter<T>(raw);
}

export function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function getMDXData<T extends Metadata = Metadata>(dir: string) {
  const files = getMDXFiles(dir);

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const { metadata, content } = readMDXFile<T>(filePath);
    const slug = path.basename(file, ".mdx");

    return { metadata, slug, content };
  });
}


export async function getPaperList(): Promise<Array<Publication>> {
  const dir = path.join(process.cwd(), 'src', 'data', 'markdown', 'papers');

  return getMDXData<PaperMeta>(dir);
}

export async function getProjectList(): Promise<Array<Project>> {
  const dir = path.join(process.cwd(), 'src', 'data', 'markdown', 'projects');

  return getMDXData<ProjectMeta>(dir);
}

export type Publication = {
    metadata: PaperMeta;
    slug: string;
    content: string;
}

export type Project = {
  metadata: ProjectMeta;
  slug: string;
  content: string;
}