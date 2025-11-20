import { Mail, MapPin, Phone } from 'lucide-react';
import { TypographyH2 } from './ui/typography';
import { FaGithub } from 'react-icons/fa';
import { siteMetadata } from '@/data/metadata';

const Contact = () => {
  const { email, emailDisplay, officeAddress, phone, github, githubAccount } =
    siteMetadata;
  return (
    <section className='py-4'>
      <div className='container mx-auto'>
        <div className='mb-14'>
          <TypographyH2>Contact</TypographyH2>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='bg-muted rounded-lg p-6'>
            <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
              <Mail className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Email</p>
            <a
              href={`mailto:${email}`}
              className='font-semibold hover:underline'
            >
              {emailDisplay}
            </a>
          </div>
          <div className='bg-muted rounded-lg p-6'>
            <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
              <MapPin className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Office</p>
            <span className='font-semibold hover:underline'>
              {officeAddress}
            </span>
          </div>
          <div className='bg-muted rounded-lg p-6'>
            <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
              <Phone className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Phone</p>
            <a href={`tel:${phone}`} className='font-semibold hover:underline'>
              {phone}
            </a>
          </div>
          <div className='bg-muted rounded-lg p-6'>
            <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
              <FaGithub className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Github</p>
            <a href={github} className='font-semibold hover:underline'>
              {githubAccount}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact };
