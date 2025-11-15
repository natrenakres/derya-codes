import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import LogoLight from "@/assets/img/logo-light.svg";
import LogoDark from "@/assets/img/logo-dark.svg";
import Image from "next/image";

const pages = [
    {
        id: 1,
        label: "Home",
        href: "/"
    },
    {
        id: 2,
        label: "Research",
        href: "/research"
    },
    {
        id: 3,
        label: "Teaching",
        href: "/teaching"
    },
    {
        id: 4,
        label: "Software",
        href: "/software"
    },
    {
        id: 5,
        label: "About",
        href: "/about"
    }
]


export function NavBar(){
    return (
        <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="font-bold text-xl tracking-tight text-primary uppercase">
                            <Image src={LogoLight} alt="Logo" className="w-40" />
                    </Link>
                </h1>
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-2">
                        {
                            pages.map(page => (
                                <NavigationMenuItem key={page.id}>                            
                                    <Link href={page.href}>{page.label}</Link>                            
                                </NavigationMenuItem>

                            ))
                        }                        
                        <NavigationMenuItem>
                            <Button asChild variant="outline">
                                <Link href="/research">CV</Link>
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )   
}