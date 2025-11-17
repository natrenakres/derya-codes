import Image, { StaticImageData } from 'next/image';
import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography';
import WorkingPaperCover1 from '@/assets/img/working_paper_cover_1.png';
import WorkingPaperCover2 from '@/assets/img/working_paper_cover_2.png';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { University } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teaching",
  description: "Discover Derya’s teaching portfolio, including courses taught, instructional materials, and her approach to fostering analytical and evidence-based learning."
}


export default function TeachingPage() {
  return (
    <section className='py-4'>
      <div className='container m-auto'>
        <TypographyH2>Teaching</TypographyH2>
        <div className='grid grid-cols-2'>
            <TeachingHeroCard institution='LMU Munich' lecture={
                {
                    name: "Microeconometrics",
                    cover: WorkingPaperCover1,
                    level: "master",
                    semester: "summer",
                    year: 2024
                }
            } />
            <TeachingHeroCard institution='LMU Munich' lecture={
                {
                    name: "Econometrics: Advanced Methods",
                    cover: WorkingPaperCover2,
                    level: "master",
                    semester: "winter",
                    year: 2023
                }
            } />
          
        </div>
      </div>
    </section>
  );
}

function TeachingHeroCard({
    institution,
    lecture
}:
    {
        institution: string, 
        lecture:  { name: string, cover: StaticImageData, level: "master" | "licence", semester: "summer" | "winter", year: number}}) {
  return (
    <div className='flex'>
      <Card>
        <CardHeader>
          <div className='flex gap-4 items-center'>
            <University />
            <CardTitle>{institution}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TypographyP>{lecture.name}</TypographyP>
        </CardContent>
        <CardFooter className='flex flex-col items-start space-y-4'>
          <TypographyMuted>{lecture.level}</TypographyMuted>
          <div className='flex w-full justify-between'>
            <Badge>{lecture.semester}</Badge>
            <Badge>{lecture.year}</Badge>
          </div>
        </CardFooter>
      </Card>
      <Image src={lecture.cover} alt={lecture.name} />
    </div>  
  );
}
