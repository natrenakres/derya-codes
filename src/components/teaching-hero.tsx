'use client';
import Image, { StaticImageData } from 'next/image';

import { TypographyMuted, TypographyP } from '@/components/ui/typography';
import WorkingPaperCover1 from '@/assets/img/working_paper_cover_1.png';
import WorkingPaperCover2 from '@/assets/img/working_paper_cover_2.png';

import { University } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { teachingData } from '@/data/teaching';

// Term sorting için basit fn
function normalizeTerm(term: string): number {
  // Ör: "Winter 2023" → 2023.1 , "Summer 2023" → 2023.0
  const [season, year] = term.split(' ');
  const y = parseInt(year);

  return season.toLowerCase().startsWith('winter') ? y + 0.1 : y;
}

export function TeachingHero() {
  // Tüm kursları tek listede topla
  const allCourses = teachingData.flatMap((inst) =>
    inst.courses.flatMap((c) =>
      c.terms.map((t) => ({
        institution: inst.institution,
        title: c.title,
        degree: c.degree,
        term: t,
        sortKey: normalizeTerm(t),
      }))
    )
  );

  // Sort descending → en yeni dersler en başa
  const latestTwo = allCourses
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, 2);

  return (
    <section className='py-4'>
      <div className='container mx-auto mb-10'>
        <Card className='border-none p-8 shadow-sm bg-linear-to-br from-background to-muted/40'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-3xl font-bold'>
              Latest Teaching
            </CardTitle>
          </CardHeader>
          <CardContent className='grid gap-6 md:grid-cols-2'>
            {latestTwo.map((lecture) => (
              <TeachingHeroCard
                key={`${lecture.title}-${lecture.term}`}
                lecture={lecture}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function TeachingHeroCard({
  lecture,
}: {
  lecture: {
    institution: string;
    title: string;
    degree: string | undefined;
    term: string;
    sortKey: number;
  };
}) {
  const { institution, title, degree, term } = lecture;
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
          <TypographyP>{title}</TypographyP>
        </CardContent>
        <CardFooter className='flex flex-col items-start space-y-4'>
          <TypographyMuted>{degree}</TypographyMuted>
          <div className='flex w-full justify-between'>
            <Badge>{term}</Badge>
          </div>
        </CardFooter>
      </Card>
      {/* <Image src={lecture.cover} alt={lecture.name} /> */}
    </div>
  );
}
