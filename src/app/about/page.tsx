import util from "node:util";
import type { Metadata } from "next/types"

import { About3 } from "@/components/about3"
import { getPublicationsFromOrcid } from "@/lib/fetch";


export const metadata: Metadata = {    
    title : "About",
    description: `Here are some details about my self`,    
}


export default async function AboutPage() {
    const works = await getPublicationsFromOrcid();
      const sortedWorks = works?.publications.sort((a, b)=> b.year-a.year)
    
    //   console.log("Works: ", util.inspect(sortedWorks, { depth: null, colors: true}));
    

    return (
        <About3 />
    )
}