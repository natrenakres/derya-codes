import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { sortByDateDesc } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/typography';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getPaperList, getProjectList } from '@/lib/matadata-parser';
import { PublicationList } from '@/components/publication-list';
import { GoProject } from 'react-icons/go';

import PaperCover from "@/assets/img/sample.png";
import WorkingPaperCover1 from "@/assets/img/working_paper_cover_1.png";
import WorkingPaperCover2 from "@/assets/img/working_paper_cover_2.png";
import WorkingPaperCover3 from "@/assets/img/working_paper_cover_3.png";
import WorkingPaperCover4 from "@/assets/img/working_paper_cover_4.png";

export const metadata: Metadata = {
    title: "Research",
    description: "Explore Derya’s academic research, published papers, and ongoing projects all in one place."
}


const workingPapers = [
    {
        id: 1,
        title: "Heterogeneity in Network Peer Effects",
        abstract: "We study the peer effects on school achievement exploiting the network structure of friendships within a classroom. In particular, we focus on the role of heterogeneity in network peer effects by accounting for network-specific factors and different driving mechanisms of peer behavior. ",
        link: "/research/1",
        cover: WorkingPaperCover1
    },
    {
        id: 2,
        title: "Covariate Balancing and the Equivalence of Weighting and Doubly Robust Estimators of AverageTreatment Effects",
        abstract: "We show that when the propensity score is estimated using a suitable covariate balancing procedure, the commonly used inverse probability weighting (IPW) estimator, augmented inverse probability weighting (AIPW) with linear conditional mean, and inverse probability weighted regression adjustment (IPWRA) with linear conditional mean are all numerically the same for estimating the average treatment effect (ATE) or the average treatment effect on the treated (ATT). Further, suitably chosen covariate balancing weights are automatically normalized, which means that normalized and unnormalized versions of IPW and AIPW are identical.",
        link: "/research/2",
        cover: WorkingPaperCover2
    }, 
    {
        id: 3,
        title: "Doubly Robust Estimation of Local Average Treatment Effects Using Inverse Probability Weighted Regression Adjustment",
        abstract: "We revisit the problem of estimating the local average treatment effect (LATE) and the local average treatment effect on the treated (LATT) when control variables are available, either to render the instrumental variable (IV) suitably exogenous or to improve precision.",
        link: "/research/3",
        cover: WorkingPaperCover3
    }, 
    {
        id: 4,
        title: "The Impact of Retention on School Attainment: Local Average Treatment Effect(s) with a Multivalued Instrument",
        abstract: "We investigate the identification and estimation of different local average treatment effect (LATE) parameters that are defined in terms of a multivalued instrument.",
        link: "/research/4",
        cover: WorkingPaperCover4

    }
]



export default async function ResearchPage() {
    const paperList = await getPaperList();   
    const projectList = await getProjectList();
    const publicationList = sortByDateDesc(paperList.filter(p => p.metadata.published));
    const workingPaperList = sortByDateDesc(paperList.filter(p => !p.metadata.published));
    const lastPublication = publicationList[0];

  return (
    <div className='py-4'>
      <section className='py-4'>
        <div className='container m-auto flex gap-4 justify-between'>
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
              {lastPublication.metadata.title}
            </TypographyH2>
            <p className='text-muted-foreground mb-8 max-w-xl lg:text-xl'>
              {lastPublication.metadata.journal}
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row '>
                <Button asChild className='w-full sm:w-auto'>
                    <Link href={`/research/${lastPublication.slug}`}>
                    Read
                    <span className='sr-only'>
                        {lastPublication.metadata.title}
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
                <div className='mx-auto flex gap-4'>
                    {
                        workingPaperList.map(paper => (
                            <Card key={paper.slug} className='w-80'>
                                <CardHeader>
                                    <Image src={WorkingPaperCover1} alt={paper.metadata.title ?? ""} />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{paper.metadata.title}</CardTitle>
                                    {/* <CardDescription>{paper.metadata.}</CardDescription> */}
                                </CardContent>
                                <CardFooter>
                                    <CardAction>
                                        <Button asChild>
                                            <Link href={`/research/${paper.slug}`}>Read</Link>
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
                <div className="mx-auto flex gap-4">
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
      <PublicationList publicationList={publicationList} />
    </div>
  );
}
