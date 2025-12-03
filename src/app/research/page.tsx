import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/typography';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjectList } from '@/lib/matadata-parser';
import { PublicationList } from '@/components/publication-list';
import { GoProject } from 'react-icons/go';

import PaperCover from "@/assets/img/sample.png";
import WorkingPaperCover1 from "@/assets/img/working_paper_cover_1.png";
import { getPaperList } from '@/lib/fetch';


export const metadata: Metadata = {
    title: "Research",
    description: "Explore Derya’s academic research, published papers, and ongoing projects all in one place."
}

export default async function ResearchPage() {
    const paperList = await getPaperList("journal-article");   
    const workingPaperList = await getPaperList("working-paper");
    const projectList = await getProjectList();
    const lastPublication = paperList[0];    

  return (
    <div className='py-4'>
      <section className='hidden md:block py-4'>
        <div className='container m-auto flex flex-col md:flex-row gap-4 justify-between'>
          <span className='font-semibold'>Research Interest:</span>
          <Badge>Econometrics</Badge>
          <Badge>Microeconometrics</Badge>
          <Badge>Causal Inference</Badge>
          <Badge>Data Science</Badge>
          <Badge>Machine Learning</Badge>
        </div>
      </section>
      <section className='py-4'>
        <div className='container m-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-20'>
          <div className='mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl '>
            <p className='text-muted-foreground mb-2 max-w-xl lg:text-xl'>
              Last Publication
            </p>
            <TypographyH2>
              {lastPublication.title}
            </TypographyH2>
            <p className='text-muted-foreground mb-8 max-w-xl lg:text-xl'>
              {lastPublication.journal?.name}
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row '>
                <Button asChild className='w-full sm:w-auto'>
                    <Link href={`/research/${lastPublication.paperId}`}>
                    Read
                    <span className='sr-only'>
                        {lastPublication.title}
                    </span>
                    </Link>
                </Button>
              
            </div>
          </div>
          <div className='flex border-2 border-secondary'>
            <Image
              src={PaperCover}
              alt="Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect image"
              className='max-h-[200px] w-full rounded-md object-cover lg:max-h-[400px] border border-primary'
            />
          </div>
        </div>
      </section>
      <section className='py-4'>
            <div className="container m-auto">
                <TypographyH2>Working Papers</TypographyH2>
                <div className='mx-auto grid grid-cols-1 md:grid-cols-4 gap-1'>
                    {
                        workingPaperList.map(paper => (
                            <Card key={paper.paperId} className='w-full md:w-95'>
                                <CardHeader>
                                    <Image src={WorkingPaperCover1} alt={paper.title ?? ""} />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{paper.title}</CardTitle>                                    
                                </CardContent>
                                <CardFooter>
                                    <CardAction>
                                        <Button asChild>
                                            <Link href={`/research/${paper.paperId}`}>Read</Link>
                                        </Button>
                                    </CardAction>
                                </CardFooter>
                            </Card>

                        ))
                    }
                </div>
            </div>
      </section>
      <section className='py-4'>
            <div className='container m-auto'>
                <TypographyH2>Projects</TypographyH2>
                <div className="mx-auto flex flex-col md:flex-row gap-4">
                    {
                        projectList.map(project => (
                            <Link key={project.slug} href={`/research/${project.slug}`}>
                                <Card  className='p-2 flex flex-row max-w-2xl'>
                                    <GoProject className="h-10 w-10" />
                                    <CardTitle>{project.metadata.title}</CardTitle>                                     
                                </Card>
                            </Link>
                        ))

                    }
                </div>
            </div>
      </section>
      <PublicationList paperList={paperList} />
    </div>
  );
}
