import { Download } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

const Experience1 = () => {
  const experience = [
    {
      period: "02/2016-present",
      title: "Associate Professor (untenured)",
      description: "",
      company: "University of Munich Department of Economics",
    },
    {
      period: "06/2016-present",
      title: "Research Network Affiliate",
      description: "",
      company: "CESifo",
    },
    {
      period: "01/2017-present",
      title: "Member",
      description: "",
      company: 'Collaborative Research Center Transregio 190 “Rationality and Competition”, funded by the German Science Foundation (DFG)',
    },
    {
      period: "01/2018-09/2022",
      title: "Member",
      description: "",
      company: 'Member of the graduate program GRK 1928 “Microeconomic Determinants of Labor Productivity” funded by the German Science Foundation (DFG)',
    },
    {
      period: "11/2011-01/2016",
      title: "Researcher",
      description: "",
      company: 'Institute for Advanced Studies Postdoctoral Researcher, Department of Economics & Finance',
    },
    {
      period: "09/2008-10/2011",
      title: "Research Assistant, Chair of Economics and Econometrics",
      description: "",
      company: 'University of Konstanz',
    },
    {
      period: "09/2017-10/2017",
      title: "Visiting Researcher",
      description: "",
      company: 'Harvard University ',
    },
    {
      period: "06/2014-07/2014",
      title: "Visiting Researcher",
      description: "",
      company: 'NYU ',
    }
  ];

  return (
    <section className="py-32">
      <div className="container space-y-10 lg:space-y-20">
        <div className="flex w-full items-end justify-between">
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-6xl">
            Experience
          </h1>
          <Button variant="ghost" size="lg" className="font-semibold">
            Download CV <Download className="size-4" />
          </Button>
        </div>

        <ul>
          {experience.map((exp, index) => (
            <li
              key={index}
              className="flex flex-col justify-between border-b py-10 md:flex-row"
            >
              <div className="max-w-lg text-xl font-semibold tracking-tighter lg:w-1/3">
                {exp.period}
              </div>
              <div className="lg:w-1/3">
                <h2 className="mb-4 text-2xl font-semibold tracking-tighter">
                  {exp.title}
                </h2>
                <p className="text-foreground/50">{exp.description}</p>
              </div>
              <div className="text-right lg:w-1/4">{exp.company}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Experience1 };
