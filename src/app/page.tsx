import { Contact7 } from "@/components/contact7";
import { Hero3 } from "@/components/hero3";
import { List2 } from "@/components/list2";
import { PublicationList } from "@/components/publication-list";
import { getPublicationList } from "@/lib/fetch";

export default async function Home() {
  const publicationList = await getPublicationList(); 

  return (
    <>
      <Hero3 />    
      <PublicationList />
      <List2 />
      <Contact7 />
    </>
  );
}
