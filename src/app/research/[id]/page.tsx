import { PaperContent } from '@/components/paper-content';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPaper } from '@/lib/fetch';

export default async function ResearchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const paperId = (await params).id;
  const paper = await getPaper(paperId);  
  return (
    <>
      <section className='py-4'>
        <div className='container m-auto'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/research'>Researches</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{paper?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <PaperContent paper={paper} />
    </>
  );
}
