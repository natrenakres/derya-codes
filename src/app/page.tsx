import { getPeresentationList } from "@/lib/matadata-parser";
import { Contact } from "@/components/contact";
import { MainHero } from "@/components/main-hero";
import { AcademicPresentations } from "@/components/academic-presentations";
import { PublicationList } from "@/components/publication-list";
import { getPaperList } from "@/lib/fetch";

export default async function Home() {  
  const paperList = await getPaperList("journal-article");   
  const presentationList = await getPeresentationList();
  return (
    <>    
      <MainHero />    
      <PublicationList paperList={paperList} />
      <AcademicPresentations presentationList={presentationList.sort((a, b) => +b.metadata.year - +a.metadata.year)}  />          
      <Contact />
    </>
  );
}
