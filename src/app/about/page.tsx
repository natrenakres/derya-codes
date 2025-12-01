import type { Metadata } from "next/types";
import { About3 } from "@/components/about3";

export const metadata: Metadata = {    
    title : "About",
    description: `Here are some details about my self`,    
}

export default async function AboutPage() {
    return (
        <About3 />
    )
}