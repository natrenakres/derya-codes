export type TeachingEntry = {
  institution: string;
  courses: {
    title: string;
    degree?: string;
    terms: string[];
  }[];
};

export const teachingData: TeachingEntry[] = [
  {
    institution: "LMU Munich",
    courses: [
      {
        title: "Microeconometrics",
        degree: "Master",
        terms: ["Summer 2016", "Summer 2017", "Summer 2018", "Summer 2020"],
      },
      {
        title: "Econometrics: Advanced Methods",
        degree: "Master",
        terms: [
          "Winter 2016",
          "Winter 2017",
          "Winter 2019",
          "Winter 2022",
          "Winter 2023",
        ],
      },
      {
        title: "Applied Microeconometrics",
        degree: "PhD",
        terms: ["Winter 2016", "Winter 2018"],
      },
      {
        title:
          "Seminar: Cognitive and Non-cognitive Skills in Relation with Labour Market Outcomes",
        degree: "Bachelor",
        terms: ["Summer 2016"],
      },
      {
        title: "Seminar: Economic Inequality",
        degree: "Bachelor",
        terms: ["Winter 2016/17"],
      },
      {
        title:
          "Seminar: Effects of Early Childhood Experiences on the Later Life Outcomes",
        degree: "Bachelor",
        terms: ["Summer 2017"],
      },
      {
        title: "Seminar: Potential Outcome Framework and Causal Effects",
        terms: ["Winter 2017/18"],
      },
      {
        title: "Seminar: Decomposition Methods in Economics",
        terms: ["Summer 2018"],
      },
      {
        title: "Seminar: Text as Data",
        terms: ["Summer 2020"],
      },
      {
        title: "Seminar: Statistical Learning Methods",
        terms: ["Winter 2023"],
      },
    ],
  },
  {
    institution: "IHS Vienna",
    courses: [
      {
        title: "Statistics",
        degree: "Master",
        terms: ["Winter 2012", "Winter 2013", "Winter 2014", "Winter 2015"],
      },
      {
        title: "Econometrics III",
        degree: "Master",
        terms: ["Summer 2012", "Summer 2013", "Summer 2014", "Summer 2015"],
      },
      {
        title: "Econometrics IV",
        degree: "Master",
        terms: ["Summer 2012", "Summer 2013", "Summer 2014", "Summer 2015"],
      },
    ],
  },
  {
    institution: "University of Graz",
    courses: [
      {
        title: "Microeconometrics",
        degree: "Master",
        terms: ["October 2014", "October 2015"],
      },
    ],
  },
  {
    institution: "University of Konstanz",
    courses: [
      {
        title: "Microeconometrics",
        degree: "Master/PhD",
        terms: ["July 2014"],
      },
    ],
  },
];
