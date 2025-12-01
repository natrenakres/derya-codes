import type { Work } from '@/lib/fetch';
import Link from 'next/link';
import { Target } from 'lucide-react';
import { BorderButton } from '@/components/shadcnblocks/border-button';
import { TypographyH2 } from './ui/typography';
import { Separator } from './ui/separator';



const PublicationList = ({workList}: {workList?: Work[]}) => { 

  return (
    <section className='bg-background py-4'>
      <div className='lg:gap-15 container mx-auto '>
        <TypographyH2>
          Publications
        </TypographyH2>
        <div className='flex w-full flex-wrap gap-4 lg:flex-row'>
          <Separator />
          {workList?.map((work) => (
            <PublicationCard key={work.paperId} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { PublicationList };

function PublicationCard({
  work,
}: {
  work: Work}) {
    const { paperId, title, journal, keywords, publicationDate  } = work;
  return (
    <div className='bg-muted flex w-full md:w-80 flex-col justify-between gap-2 rounded-3xl p-5'>
      <div>
        <h2 className='text-xl font-semibold tracking-tight'>
          {title}
        </h2>
        <p className='text-foreground/60 mt-4 w-full max-w-xs text-lg tracking-tight'>
          {journal}
        </p>
      </div>
      <ul className='mt-5'>
        <li className='text-foreground/40 mb-4 text-xs font-medium uppercase'>
          Keywords:
        </li>
        {keywords?.map((keyword) => (
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
          <JournalYear date={publicationDate} />
        </h2>
        <Link href={`/research/${paperId}`}>
          <BorderButton
            variant='outline'
            className='relative rounded-none px-4! uppercase shadow-none cursor-pointer'
          >
            Read
            <span className='sr-only'>
              more about Derya's publication which is {title}
            </span>
          </BorderButton>
        </Link>
      </div>
    </div>
  );
}

function JournalYear({date}:{date?: string}) {
  if(!date) return null;

  const parsedDate = new Date(date);
  if(parsedDate) {
    return (
      <span className='font-mono'>{parsedDate.getFullYear()}</span>)
  }
  return null;
}