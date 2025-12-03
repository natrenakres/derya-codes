import Image from "next/image";
import ProfileImg from "@/assets/img/derya.jpg";
import Matlab from "@/assets/img/matlab.svg";
import Stata from "@/assets/img/stata.svg";
import RLogo from "@/assets/img/Rlogo.svg";
import Python from "@/assets/img/python.svg";

import { siteMetadata } from "@/data/metadata";
import { Badge } from "./ui/badge";
import { FaBook, FaR } from "react-icons/fa6";
import { FaBookOpen, FaBookReader, FaGithub, FaPython } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const softwares = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Publications ", value: "16" },
  { label: "h-index", value: "8" },
  { label: "Citations", value: "256" },
  { label: "Recognized Awards", value: "10+" },
];

const About3 = ({
  title = "About",    
  secondaryImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    alt: "placeholder",
  },
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com",
  },
  companiesTitle = "Valued by clients worldwide",
  companies = softwares,
  achievementsTitle = "My Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  const { description } = siteMetadata;
  return (
    <section className="py-4">
      <div className="container m-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <Image
            src={ProfileImg}
            alt="Derya Uysal profile photo"
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">            
            <Card>                            
                <CardHeader>
                  <CardTitle>Stata package: kappalate</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert mb-8">
                  <p>
                    Stata package to estimate the local average treatment effect (LATE) using Abadie's kappa approach and other weighting estimators (with Tymon Słoczyński and Jeffrey M. Wooldridge).
                  </p>
                  <p>
                    To download from SSC, type ssc install kappalate in Stata.
                  </p>
                </CardContent>
                <CardFooter>                  
                  <Button asChild>
                    <Link href="https://github.com/deryauysal/kappalate"><FaGithub /></Link>
                  </Button>
                </CardFooter>
            </Card>            
            <Card>                            
                <CardHeader>
                  <CardTitle>Stata and R package: teffects2</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert mb-8">
                  <p>
                    It contains the Stata package teffects2. teffects2 estimates average treatment effects (ATEs) and average treatment effects on the treated (ATTs) using observational data. As in Stata's official teffects command, inverse probability weighting (IPW), augmented inverse probability weighting (AIPW), and inverse probability weighted regression adjustment (IPWRA) estimators are supported. However, unlike teffects, teffects2 supports covariate balancing estimation of the propensity score.
                  </p>
                  <p>
                    It contains the R package to estimate AIPW, IPW, and IPWRA estimators using Covariate Balancing Methods: IPT, Graham et al. (2012), and CBSP, Imai and Ratkovic (2014) in addition to the standard approach using maximum likelihood. You can download it via the devtools package and entering install_github("deryauysal/teffects2"). The package is based on the great work on treatment effect estimation in R by 
                    <Link href="https://github.com/ohines/teffectsR">Oliver Hines.</Link>
                  </p>
                </CardContent>
                <CardFooter>                  
                  <Button asChild>
                    <Link href="https://github.com/deryauysal/teffects2"><FaGithub /></Link>
                  </Button>
                </CardFooter>
            </Card>            
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">Programming languages and softwares that I used during my researches</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
                <Image src={Python}  className="h-16 w-auto md:h-18" alt="Python programming language logo" />
                <Image src={RLogo} className="h-16 w-auto md:h-18" alt="R programming language logo" />
                <Image src={Matlab} className="h-16 w-auto md:h-18" alt="Matlab logo" />
                <Image src={Stata} className="h-16 w-auto md:h-18" alt="Stata logo" />
              </div>
          </div>
        </div>
        <div className="bg-muted relative overflow-hidden rounded-xl p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-2" key={item.label + idx}>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { About3 };
