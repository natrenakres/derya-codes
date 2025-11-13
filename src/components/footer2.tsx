import { FaGithub } from "react-icons/fa";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({    
  copyright = "© 2024 Shadcnblocks.com. All rights reserved.",  
}: Footer2Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">            
            <FaGithub />
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>            
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
