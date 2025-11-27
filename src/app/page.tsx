import { getPaperList, getPeresentationList } from "@/lib/matadata-parser";
import { sortByDateDesc } from "@/lib/utils";
import { Contact } from "@/components/contact";
import { MainHero } from "@/components/main-hero";
import { AcademicPresentations } from "@/components/academic-presentations";
import { PublicationList } from "@/components/publication-list";

export default async function Home() {  
  const paperList = await getPaperList();   
  const presentationList = await getPeresentationList();
  return (
    <>
      <MainHero />    
      <PublicationList publicationList={sortByDateDesc(paperList.filter(p => p.metadata.published))} />
      <AcademicPresentations presentationList={presentationList.sort((a, b) => +b.metadata.year - +a.metadata.year)}  />          
      <Contact />
    </>
  );
}
