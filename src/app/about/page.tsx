import { About3 } from "@/components/about3"
import type { Metadata } from "next/types"



export const metadata: Metadata = {    
    title : "About",
    description: `Here are some details about my self`,    
}


export default function AboutPage() {

    return (
        <About3 />
    )
}