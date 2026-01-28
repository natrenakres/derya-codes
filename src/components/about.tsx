import Image from "next/image";
import ProfileImg from "@/assets/img/derya.jpg";
import Matlab from "@/assets/img/matlab.svg";
import Stata from "@/assets/img/stata.svg";
import RLogo from "@/assets/img/Rlogo.svg";
import Python from "@/assets/img/python.svg";
import Gauss from "@/assets/img/gauss.png";
import Latex from "@/assets/img/latex.svg";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthorData } from "@/lib/fetch";
import { TypographyH2 } from "./ui/typography";
import { ExperienceList } from "./experience-list";
import { getExperienceList, getPackage, type Packages } from "@/lib/matadata-parser";
import { DownloadFileButton } from "./download-file-button";


import AboutContent from "@/data/markdown/about/about.mdx";
import { RenderMdx } from "./render-mdx";

export async function About() {    
  const { citationCount, hIndex, paperCount } = await getAuthorData();
  const experinceList = await getExperienceList();  
  const packages = await getPackage();
  
  const myAchievements = [
      { id: 101, label: "Papers ", value: paperCount },
      { id: 102, label: "h-index", value: hIndex },
      { id: 103, label: "Citations", value: citationCount }      
    ];


  

  return (
    <section className="py-4">
      <div className="container m-auto">
        <TypographyH2>About</TypographyH2>
        <div className="grid grid-cols-3 gap-8 items-start shadow-sm bg-linear-to-br from-background to-muted/40">
          <div className="col-span-1 xl:col-span-1 rounded-(--card-radius) bg-black/2 dark:bg-white/15 p-(--card-padding) outline -outline-offset-1 outline-black/4 dark:outline-white/25 [--card-padding:--spacing(3)] [--card-radius:var(--radius-4xl)]">
            <Image
              src={ProfileImg}
              alt="Derya Uysal profile photo"
              className="aspect-5/6 rounded-[calc(var(--card-radius)-var(--card-padding))] bg-gray-800 object-cover shadow-2xl outline -outline-offset-1 outline-white/10"
            />
          </div>
          <div className="col-span-2 xl:col-span-2 prose max-w-none dark:prose-invert ">
              <AboutContent />
          </div>
        </div>
        <div className="container m-auto py-4">
          <TypographyH2>Softwares</TypographyH2>
          <div className="flex gap-4  py-4">
              {
              packages.map((pcg: Packages) => (
                <Card key={pcg.slug} className="flex flex-col justify-between shadow-sm bg-linear-to-br from-background to-muted/40 border-none">
                    <div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{pcg.metadata.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="prose dark:prose-invert mb-8">
                        <RenderMdx markdownContent={pcg.content} />
                      </CardContent>
                    </div>                    
                </Card>
              )) 
            }
            
          </div>        
        </div>
        <div className="py-16">
          <TypographyH2>Programming languages and softwares</TypographyH2>
          <div className="mt-8 flex flex-wrap justify-center gap-8 shadow-sm bg-linear-to-br from-background to-muted/40">
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
        <TypographyH2>
          My Achievements in Numbers
        </TypographyH2>            
        <div className="relative overflow-hidden rounded-xl p-4 shadow-sm bg-linear-to-br from-background to-muted/40">          
          <div className="mt-10 grid grid-cols-2 gap-x-2 gap-y-4 text-center lg:grid-cols-3">
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
        <div className="py-16">
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
        <section className='py-16'>
          <div className='container space-y-10 lg:space-y-20'>
            <div className='flex w-full items-end justify-between'>
              <TypographyH2>Experiences</TypographyH2>
              <DownloadFileButton fileName="derya_uysal_cv.pdf" label="Download CV" />
            </div>
            {
              experinceList.map(experince => (
                  <ExperienceList key={experince.slug} experience={experince.metadata} />
              ))
            }
          </div>
        </section>
      </div>
    </section>
  );
};

