"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,  
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { teachingData } from '@/data/teaching';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { TypographyH2 } from "./ui/typography";
import { Badge } from "./ui/badge";


export function TeachingList() {
    const [query, setQuery] = useState("");
  const filteredData = useMemo(()=> {
    if(!query.trim()) return teachingData;

    const q = query.toLowerCase();

    return teachingData.
      map((inst) => {
        const filteredCourses = inst.courses.filter(c=> {
          const inTitle = c.title.toLowerCase().includes(q);
          const inDegree = c.degree?.toLowerCase().includes(q);
          const inTerms = c.terms.some((t) => t.toLowerCase().includes(q));

          return inTitle || inDegree || inTerms;
        });

        if(inst.institution.toLowerCase().includes(q) ||
          filteredCourses.length > 0) {
            return {
              ...inst,
              courses: filteredCourses.length > 0 ? filteredCourses : inst.courses,
            };
          }
        return null;
      })
      .filter(Boolean);

  }, [query]);


  return (
    <section className='py-4'>
        <div className='container m-auto space-y-4'>
          <TypographyH2>Other Courses</TypographyH2>
          <div className="p-8">
            <div className="flex items-center space-x-2 px-6">
                <Label className="text-xl" htmlFor="search">Serach teaching</Label>
                <Input id="search" placeholder='Course name or...' value={query} onChange={(e)=> setQuery(e.target.value)} className='max-w-md' />
            </div>          
            <div className='grid gap-8 grid-cols-1 shadow-sm bg-linear-to-br from-background to-muted/40'>
                {
                filteredData.length === 0 ? (
                    <p className='text-muted-foreground'>No result found</p>
                ) : (
                filteredData.map((inst) => (
                <Accordion key={inst?.institution} type="single" collapsible className="w-full">
                    <AccordionItem
                    key={inst?.institution}
                    value={inst?.institution ?? ""}
                    >
                    <AccordionTrigger className="px-4 py-2 text-lg font-semibold">
                        <div className="px-4 py-2 text-lg font-semibold flex items-center justify-between">
                            <span>{inst?.institution}</span>
                            <Badge variant="secondary" className="ml-2">{inst?.courses.length} courses</Badge>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="grid gap-4 p-4">
                        {inst?.courses.map(course => (
                            <Card key={course.title}>
                            <CardHeader>
                                <CardTitle className="text-base">
                                {course.title}
                                {course.degree && (
                                    <span className="text-sm text-muted-foreground block">
                                    ({course.degree})
                                    </span>
                                )}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {course.terms.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                                </ul>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </AccordionContent>
                    </AccordionItem>          
                </Accordion>
                )))
                }
            </div>
          </div>
        </div>
      </section>
  )

}
