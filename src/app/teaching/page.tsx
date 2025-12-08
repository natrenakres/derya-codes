import type { Metadata } from 'next';
import { TypographyH2 } from '@/components/ui/typography';
import { TeachingList } from '@/components/teaching-list';
import { TeachingHero } from '@/components/teaching-hero';



export const metadata: Metadata = {
  title: 'Teaching',
  description:
    'Discover Derya’s teaching portfolio, including courses taught, instructional materials, and her approach to fostering analytical and evidence-based learning.',
};

export default function TeachingPage() {  
  

  return (
    <>
      <section className='py-4'>
        <div className='container m-auto'>
          <TypographyH2>Teaching</TypographyH2>          
        </div>
      </section>
      <TeachingHero />
      <TeachingList />
    </>
  );
}
