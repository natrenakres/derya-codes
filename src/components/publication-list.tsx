import { Target } from 'lucide-react';
import { BorderButton } from '@/components/shadcnblocks/border-button';
import Link from 'next/link';
import { TypographyH2 } from './ui/typography';
import { Separator } from './ui/separator';
import type { Publication } from '@/lib/matadata-parser';


const PublicationList = ({publicationList}: {publicationList: Publication[]}) => { 

  return (
    <section className='bg-background py-4'>
      <div className='lg:gap-15 container mx-auto '>
        <TypographyH2>
          Publications
        </TypographyH2>
        <div className='flex w-full flex-wrap gap-4 lg:flex-row'>
          <Separator />
          {publicationList.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} />
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
  publication: Publication}) {
    const { metadata, slug } = publication;
  return (
    <div className='bg-muted flex w-full md:w-80 flex-col justify-between gap-2 rounded-3xl p-5'>
      <div>
        <h2 className='text-xl font-semibold tracking-tight'>
          {metadata.title}
        </h2>
        <p className='text-foreground/60 mt-4 w-full max-w-xs text-lg tracking-tight'>
          {metadata.journal}
        </p>
      </div>
      <ul className='mt-5'>
        <li className='text-foreground/40 mb-4 text-xs font-medium uppercase'>
          Keywords:
        </li>
        {metadata.keywords?.map((keyword) => (
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
          <JournalYear date={metadata.date} />
        </h2>
        <Link href={`/research/${slug}`}>
          <BorderButton
            variant='outline'
            className='relative rounded-none px-4! uppercase shadow-none cursor-pointer'
          >
            Read
            <span className='sr-only'>
              more about Derya's publication which is {metadata.title}
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