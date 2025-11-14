import { Target } from 'lucide-react';
import { BorderButton } from '@/components/shadcnblocks/border-button';
import Link from 'next/link';
import { TypographyH2 } from './ui/typography';
import { Separator } from './ui/separator';


const PublicationList = () => {
  const publicationList = [
    {
      id: 1,
      title:
        "Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect",
      journal: 'Journal of Business & Economic Statistics',
      year: '2024',
      keywords: [
        'Local Average Treatment Effect (LATE)',
        'Weighting Estimators',
        'Normalization / Scale Invariance',
        'Instrumental Variables Estimation',
      ],
    },
    {
      id: 2,
      title:
        'Estimation of Causal Effects with a Binary Treatment Variable: A Unified M-Estimation Framework',
      journal: 'Journal of Econometric Methods',
      year: '2024',
      keywords: [
        'ATE',
        'M-estimation',
        'treatment effects',
        'double robustness',
      ],
    },
    {
      id: 3,
      title:
        'Estimating Causal Effects for Multivalued Treatments: A Comparison of Approaches',
      journal: 'Statistics in Medicine 35 534–552 ',
      year: '2016',
      keywords: [
        'Multivalued Treatment Effects',
        'Doubly Robust Estimation',
        'Unconfoundedness Assumption',
        'Monte Carlo Simulation',
      ],
    },
    {
      id: 4,
      title:
        'A Simple and Successful Shrinkage Method for Weighting Estimators of Treatment Effects',
      journal: 'Computational Statistics & Data Analysis 100 512-525',
      year: '2016',
      keywords: [
        'Average treatment effect',
        'Econometric evaluation',
        'Penalizing',
        'Propensity score',
        'Shrinkage',
      ],
    },
    {
      id: 5,
      title:
        'Doubly Robust Estimation of Causal Effects with Multivalued Treatments: An Application to the Returns to Schooling',
      journal: 'Journal of Applied Econometrics 30(5) 763-786',
      year: '2015',
      keywords: [
        'Doubly Robust Estimators',
        'Multivalued Treatment Framework',
        'Returns to Education',
        'British Cohort Study (BCS70)',
      ],
    },
    {
      id: 6,
      title:
        'Price Dynamics in the Belarusian Black Market for Foreign Exchange',
      journal: 'Journal of International Economics 94:1 169–176',
      year: '2014',
      keywords: [
        'Black market',
        'FX market',
        'Technological progress',
        'Price setting',
      ],
    },
  ];

  return (
    <section className='bg-background py-4'>
      <div className='lg:gap-15 container mx-auto '>
        <TypographyH2>
          Publications
        </TypographyH2>
        <div className='flex w-full flex-wrap gap-4 lg:flex-row'>
          <Separator />
          {publicationList.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { PublicationList };

function PublicationCard({
  publication,
}: {
  publication: {
    id: number;
    title: string;
    journal: string;
    year: string;
    keywords: string[];
  };
}) {
  return (
    <div className='bg-muted flex w-full md:w-80 flex-col justify-between gap-2 rounded-3xl p-5'>
      <div>
        <h2 className='text-xl font-semibold tracking-tight'>
          {publication.title}
        </h2>
        <p className='text-foreground/60 mt-4 w-full max-w-xs text-lg tracking-tight'>
          {publication.journal}
        </p>
      </div>
      <ul className='mt-5'>
        <li className='text-foreground/40 mb-4 text-xs font-medium uppercase'>
          Keywords:
        </li>
        {publication.keywords.map((keyword) => (
          <li
            key={keyword}
            className='mt-1 flex items-center gap-2 font-medium'
          >
            <Target className='size-4' />
            {keyword}
          </li>
        ))}
      </ul>
      <div className='mt-5 flex items-end justify-between'>
        <h2 className='text-base font-medium tracking-tighter'>
          <span className='font-mono'>{publication.year}</span>
        </h2>
        <Link href='/research'>
          <BorderButton
            variant='outline'
            className='relative rounded-none px-4! uppercase shadow-none cursor-pointer'
          >
            Read
            <span className='sr-only'>
              more about Derya's publication which is {publication.title}
            </span>
          </BorderButton>
        </Link>
      </div>
    </div>
  );
}
