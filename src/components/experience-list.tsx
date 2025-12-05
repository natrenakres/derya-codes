import type { ExperienceMeta } from '@/lib/matadata-parser';
import { TypographyH4 } from './ui/typography';

export function ExperienceList({ experience }: { experience: ExperienceMeta }) {
  
  return (
   
      <div className='container space-y-10 lg:space-y-20'>
        <div className='flex w-full items-end justify-between'>
          <TypographyH4>
            {experience.label}  
          </TypographyH4>          
        </div>
         <ul>
          {experience.experiences?.map((exp) => (
            <li
              key={exp.id}
              className='flex flex-col justify-between border-b py-10 md:flex-row'
            >
              <div className='max-w-lg text-xl font-semibold tracking-tighter lg:w-1/3'>
                {exp.period}
              </div>
              <div className='lg:w-1/3'>
                <h2 className='mb-4 text-2xl font-semibold tracking-tighter'>
                  {exp.title}
                </h2>
                <p className='text-foreground/50'>{exp.description}</p>
              </div>
              <div className='text-right lg:w-1/4'>{exp.company}</div>
            </li>
          ))}
        </ul>
      </div>
    
  );
}
