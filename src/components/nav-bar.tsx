import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";


export function NavBar(){
    return (
        <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="font-bold text-xl tracking-tight text-primary uppercase">
                            Derya Uysal
                    </Link>
                </h1>
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-2">
                        <NavigationMenuItem>                            
                            <Link href="/">Home</Link>                            
                        </NavigationMenuItem>
                        <NavigationMenuItem>                            
                            <Link href="/research">Research</Link>                            
                        </NavigationMenuItem>
                        <NavigationMenuItem>                            
                            <Link href="/research">Teaching</Link>                            
                        </NavigationMenuItem>
                        <NavigationMenuItem>                            
                            <Link href="/research">Software</Link>                            
                        </NavigationMenuItem>
                        <NavigationMenuItem>                            
                            <Link href="/research">About</Link>                            
                        </NavigationMenuItem>
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