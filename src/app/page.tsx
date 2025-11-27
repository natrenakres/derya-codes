import { Contact } from "@/components/contact";
import { MainHero } from "@/components/main-hero";
import { PresentationList } from "@/components/presentation-list";
import { PublicationList } from "@/components/publication-list";
import { getPaperList, getPeresentationList } from "@/lib/matadata-parser";
import { sortByDateDesc } from "@/lib/utils";

export default async function Home() {  
  const paperList = await getPaperList();   
  const presentationList = await getPeresentationList();
  return (
    <>
      <MainHero />    
      <PublicationList publicationList={sortByDateDesc(paperList.filter(p => p.metadata.published))} />
        {
          presentationList
          .sort((a, b) => +b.metadata.year - +a.metadata.year)
          .map(presentation => (
            <PresentationList presentationMeta={presentation.metadata} key={presentation.slug} />
          ))
        }
      <Contact />
    </>
  );
}
