'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DownloadFileButton({
  fileName,
  label,
}: {
  fileName: string;
  label: string;
}) {
  return (
    <a href={`/uploads/${fileName}`} download={fileName}>
      <Button variant='ghost' size='lg' className='font-semibold'>
        {label} <Download className='size-4' />
      </Button>
    </a>
  );
}
