import { Contact7 } from "@/components/contact7";
import { MainHero } from "@/components/main-hero";
import { List2 } from "@/components/list2";
import { PublicationList } from "@/components/publication-list";
import { getPaperList } from "@/lib/matadata-parser";
import { sortByDateDesc } from "@/lib/utils";

export default async function Home() {
  const paperList = await getPaperList();   
  return (
    <>
      <MainHero />    
      <PublicationList publicationList={sortByDateDesc(paperList.filter(p => p.metadata.published))} />
      <List2 />
      <Contact7 />
    </>
  );
}
