import { getPeresentationList } from "@/lib/matadata-parser";
import { sortByDateDesc } from "@/lib/utils";
import { Contact } from "@/components/contact";
import { MainHero } from "@/components/main-hero";
import { AcademicPresentations } from "@/components/academic-presentations";
import { PublicationList } from "@/components/publication-list";
import { getWorkListFromOrcid } from "@/lib/fetch";

export default async function Home() {  
  const workResult = await getWorkListFromOrcid("journal-article");   
  const presentationList = await getPeresentationList();
  return (
    <>
      <MainHero />    
      <PublicationList workList={workResult?.workList} />
      <AcademicPresentations presentationList={presentationList.sort((a, b) => +b.metadata.year - +a.metadata.year)}  />          
      <Contact />
    </>
  );
}
