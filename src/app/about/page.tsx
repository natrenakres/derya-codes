import type { Metadata } from "next/types";
import { About } from "@/components/about";

export const metadata: Metadata = {    
    title : "About",
    description: `Here are some details about my self`,    
}

export default async function AboutPage() {
    return (
        <About />
    )
}