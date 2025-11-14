import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PaperCover from "@/assets/img/sample.png";
import Link from 'next/link';
import Image from 'next/image';
import { TypographyH2 } from '@/components/ui/typography';

export default function ResearchPage() {
  return (
    <div className='py-4'>
      <section className='py-4'>
        <div className='container m-auto flex gap-4 justify-between'>
          <span className='font-semibold'>Research Interest:</span>
          <Badge>Econometrics</Badge>
          <Badge>Microeconometrics</Badge>
          <Badge>Causal Inference</Badge>
          <Badge>Data Science</Badge>
          <Badge>Machine Learning</Badge>
        </div>
      </section>
      <section className='py-4'>
        <div className='container m-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-20'>
          <div className='mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl '>
            <p className='text-muted-foreground mb-2 max-w-xl lg:text-xl'>
              Last Publication
            </p>
            <TypographyH2>
              Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect
            </TypographyH2>
            <p className='text-muted-foreground mb-8 max-w-xl lg:text-xl'>
              Journal of Business & Economic Statistics2024
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row '>
                <Button asChild className='w-full sm:w-auto'>
                    <Link href="/research">
                    Read
                    <span className='sr-only'>
                        Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect paper.
                    </span>
                    </Link>
                </Button>
              
            </div>
          </div>
          <div className='flex border-2 border-secondary'>
            <Image
              src={PaperCover}
              alt="Abadie's Kappa and Weighting Estimators of the Local Average Treatment Effect image"
              className='max-h-[200px] w-full rounded-md object-cover lg:max-h-[400px] border border-primary'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
