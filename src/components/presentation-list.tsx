import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaMapMarker } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TypographyH2 } from './ui/typography';

import type { PresentationMeta } from '@/lib/matadata-parser';

interface PresentationListProps {
  presentationMeta: PresentationMeta;
}

export const PresentationList = ({
  presentationMeta,
}: PresentationListProps) => {
  return presentationMeta.presentations.map((presentation) => (
    <React.Fragment key={presentation.id}>
      <div className='grid items-center gap-4 px-4 py-5 md:grid-cols-4'>
        <div className='order-2 flex items-center gap-2 md:order-0'>
          <span className='bg-muted flex h-14 w-16 shrink-0 items-center justify-center rounded-md'>
            <FaMapMarker />
          </span>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold'>{presentation.location}</h3>
          </div>
        </div>
        <p className='order-1 text-2xl font-semibold md:order-0 md:col-span-2'>
          {presentation.title}
        </p>
        {presentation.url && (
          <Button variant='outline' asChild>
            <Link
              target='_blank'
              className='order-3 ml-auto w-fit gap-2 md:order-0'
              href={presentation.url}
            >
              <span>More</span>
              <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        )}
      </div>
      <Separator />
    </React.Fragment>
  ));
};
