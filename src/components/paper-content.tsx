"use client";

import {
  AlignLeft,
  GalleryVerticalEnd,
  Lightbulb,
  ListChecks,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Paper, PaperDetail } from "@/lib/fetch";

const PaperContent = ({
  paper
} : { paper: PaperDetail}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };  

  const { title, publicationVenue, abstract, authors, year, journal } = paper;

  return (
    <section className="py-4">
      <div className="container m-auto max-w-8xl">
        <div className="relative grid-cols-3 gap-20 lg:grid">
          <div className="lg:col-span-2">
            <div>
              <Badge variant="outline">{year}</Badge>
              <h2 className="mt-3 text-3xl font-extrabold">
                {title}
              </h2>
              <p className="text-muted-foreground mt-2 text-lg">
                {publicationVenue?.name || journal?.name}
              </p>
            </div>
            <section                            
              className="prose dark:prose-invert mb-8"
            >
              <p>
                {abstract}
              </p>
            </section>            
          </div>
          <div className="sticky top-8 hidden h-fit lg:block">
            <span className="flex items-center gap-2 text-sm">
              <AlignLeft className="h-4 w-4" />
              Co-Authors
            </span>
            <nav className="mt-2 text-sm">
              <ul>
                {
                  authors.map(author => (
                    <li key={author.authorId}>
                      <a
                        href="#section1"
                        className={cn(
                          "block py-1 transition-colors duration-200",
                          activeSection === "section1"
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-primary",
                        )}
                      >
                        {author.name}
                      </a>
                    </li>
                  ))
                }                
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PaperContent };
