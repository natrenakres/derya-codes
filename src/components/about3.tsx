import Image from "next/image";
import ProfileImg from "@/assets/img/derya.jpg";
import Matlab from "@/assets/img/matlab.svg";
import Stata from "@/assets/img/stata.svg";
import RLogo from "@/assets/img/Rlogo.svg";
import Python from "@/assets/img/python.svg";
import Gauss from "@/assets/img/gauss.png";
import Latex from "@/assets/img/latex.svg";

import { siteMetadata } from "@/data/metadata";

import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAuthorData } from "@/lib/fetch";
import { TypographyH2 } from "./ui/typography";
import { Experience1 } from "./experience1";




export async function About3() {
  const { description } = siteMetadata;
  const { citationCount, hIndex, paperCount } = await getAuthorData();
  const myAchievements = [
      { id: 101, label: "Papers ", value: paperCount },
      { id: 102, label: "h-index", value: hIndex },
      { id: 103, label: "Citations", value: citationCount }      
    ];

  return (
    <section className="py-4">
      <div className="container m-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">About</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-(--card-radius) bg-black/2 dark:bg-white/15 p-(--card-padding) outline -outline-offset-1 outline-black/4 dark:outline-white/25 [--card-padding:--spacing(3)] [--card-radius:var(--radius-4xl)]">
            <Image
              src={ProfileImg}
              alt="Derya Uysal profile photo"
              className="aspect-5/6 rounded-[calc(var(--card-radius)-var(--card-padding))] bg-gray-800 object-cover shadow-2xl outline -outline-offset-1 outline-white/10"
            />
          </div>
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
                <Image src={Gauss} className="h-auto w-auto md:h-18" alt="GAUSS logo" />
                <Image src={Latex} className="h-16 w-auto md:h-18 dark:bg-white" alt="Latex logo" />
              </div>
          </div>
        </div>
        <div className="bg-muted relative overflow-hidden rounded-xl p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              My Achievements in Numbers
            </h2>            
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-3">
            {myAchievements.map(item => (
              <div className="flex flex-col gap-2" key={item.id}>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-32">
          <TypographyH2>Professional Activities</TypographyH2>
          <div className="py-4 grid grid-cols-3 gap-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Refereeing</CardTitle>
              </CardHeader>
              <CardContent>
                Journal of Causal Inference, Referee for Journal of Business & Economic Statistics, Journal of the Royal Statistical Society, Journal of Economic Psychology, Journal of Banking and Finance, IHS Economics Series, Empirical Economics, Journal of Statistical Computation and Simulation, Journal of Human Capital, Journal of Labor Research
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Administrative</CardTitle>
              </CardHeader>
              <CardContent>
                Women’s representative, Department of Economics, LMU Munich, 10/2016-09/2018 Co-organizer Research Workshop "Empirical Economics", LMU Munich, 02/2016-current Co-organizer Econometrics Seminar, IHS Vienna, 11/2011-11/2015
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Professional Memberships</CardTitle>
                </CardHeader>
                <CardContent>
                  Member of the graduate program GRK 1928 "Microeconomic Determinants of Labor Productivity" funded by the Deutsche Forschungsgemeinschaft (DFG) Member of the Collaborative Research Center (SFB) TRR 190 funded by the Deutsche Forschungsgemeinschaft (DFG) The Econometric Society Verein für Socialpolitik German Statistical Society (DStatG)
                </CardContent>
            </Card>
          </div>
        </div>
        <Experience1 />
      </div>
    </section>
  );
};

