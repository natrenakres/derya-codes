import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PaperCover from "@/assets/img/sample.png";
import Link from 'next/link';
import Image from 'next/image';
import { TypographyH2 } from '@/components/ui/typography';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import WorkingPaperCover1 from "@/assets/img/working_paper_cover_1.png";
import WorkingPaperCover2 from "@/assets/img/working_paper_cover_2.png";
import WorkingPaperCover3 from "@/assets/img/working_paper_cover_3.png";
import WorkingPaperCover4 from "@/assets/img/working_paper_cover_4.png";
import { PublicationList } from '@/components/publication-list';


const workingPapers = [
    {
        id: 1,
        title: "Heterogeneity in Network Peer Effects",
        abstract: "We study the peer effects on school achievement exploiting the network structure of friendships within a classroom. In particular, we focus on the role of heterogeneity in network peer effects by accounting for network-specific factors and different driving mechanisms of peer behavior. ",
        link: "/",
        cover: WorkingPaperCover1
    },
    {
        id: 2,
        title: "Covariate Balancing and the Equivalence of Weighting and Doubly Robust Estimators of AverageTreatment Effects",
        abstract: "We show that when the propensity score is estimated using a suitable covariate balancing procedure, the commonly used inverse probability weighting (IPW) estimator, augmented inverse probability weighting (AIPW) with linear conditional mean, and inverse probability weighted regression adjustment (IPWRA) with linear conditional mean are all numerically the same for estimating the average treatment effect (ATE) or the average treatment effect on the treated (ATT). Further, suitably chosen covariate balancing weights are automatically normalized, which means that normalized and unnormalized versions of IPW and AIPW are identical.",
        link: "/",
        cover: WorkingPaperCover2
    }, 
    {
        id: 3,
        title: "Doubly Robust Estimation of Local Average Treatment Effects Using Inverse Probability Weighted Regression Adjustment",
        abstract: "We revisit the problem of estimating the local average treatment effect (LATE) and the local average treatment effect on the treated (LATT) when control variables are available, either to render the instrumental variable (IV) suitably exogenous or to improve precision.",
        link: "/",
        cover: WorkingPaperCover3
    }, 
    {
        id: 4,
        title: "The Impact of Retention on School Attainment: Local Average Treatment Effect(s) with a Multivalued Instrument",
        abstract: "We investigate the identification and estimation of different local average treatment effect (LATE) parameters that are defined in terms of a multivalued instrument.",
        link: "/",
        cover: WorkingPaperCover4

    }
]

const projects = [
    {
        id: 10,
        title: "Effect of school quality on rental prices: Application of Machine Learning Methods"
    },
    {
        id:11,
        title: "Estimation of causal effects of multiple treatments in observational studies with machine learning methods"
    }, 
    {
        id: 12,
        title: "Network effect of unliked ones"
    }, 
    {
        id: 13,
        title: "Testing complier's characteristics"
    }
]

export default function ResearchPage() {
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
              Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect
            </TypographyH2>
            <p className='text-muted-foreground mb-8 max-w-xl lg:text-xl'>
              Journal of Business & Economic Statistics2024
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row '>
                <Button asChild className='w-full sm:w-auto'>
                    <Link href="/research">
                    Read
                    <span className='sr-only'>
                        Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect paper.
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
                        workingPapers.map(paper => (
                            <Card key={paper.id} className='w-80'>
                                <CardHeader>
                                    <Image src={paper.cover} alt={paper.title} />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{paper.title}</CardTitle>
                                    <CardDescription>{paper.abstract}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <CardAction>
                                        <Button asChild>
                                            <Link href={paper.link}>Read</Link>
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
                        projects.map(project => (
                            <Card key={project.id} className='p-2'>
                                <CardTitle>{project.title}</CardTitle>
                            </Card>
                        ))

                    }
                </div>
            </div>
      </section>

      <PublicationList />

    </div>
  );
}
