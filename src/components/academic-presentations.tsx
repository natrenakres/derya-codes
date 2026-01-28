'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Presentation } from '@/lib/matadata-parser';
import { PresentationList } from './presentation-list';
import { TypographyH2 } from './ui/typography';
import { Separator } from './ui/separator';

export function AcademicPresentations({
  presentationList,
}: {
  presentationList: Presentation[];
}) {
  const [selectedYear, setSelectedYear] = useState(
    presentationList[0].metadata.year
  );
  const [selectedPresentation, setSelectedPresentation] = useState<
    Presentation | undefined
  >(findPresentation(selectedYear));

  function findPresentation(year: string) {
    return presentationList.find((p) => +p.metadata.year === +year);
  }

  function handleSelection(year: string) {
    setSelectedYear(year);
    const presentation = findPresentation(year);
    if (presentation) {
      setSelectedPresentation(presentation);
    }
  }

  return (
    <section className='py-4'>
      <div className='container mx-auto px-0'>
        <div className='flex gap-4'>
          <TypographyH2>
            Academic Presentations{' '}
          </TypographyH2>
          <Select
              onValueChange={(value) => handleSelection(value)}
              value={selectedYear}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a year' />
              </SelectTrigger>
              <SelectContent>
                {presentationList.map((presentation) => (
                  <SelectItem
                    key={`${presentation.slug}-${presentation.metadata.year}`}
                    value={presentation.metadata.year}
                  >
                    {presentation.metadata.year}
                  </SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col'>
          <Separator />
          {selectedPresentation && (
            <PresentationList
              key={selectedPresentation.slug}
              presentationMeta={selectedPresentation.metadata}
            />
          )}
        </div>
      </div>
    </section>
  );
}
