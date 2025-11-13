import { FaGithub, FaResearchgate, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import Link from "next/link";

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
  copyright = "© 2024 deryauysal.com. All rights reserved.",  
}: Footer2Props) => {
  return (
    <section className="py-4 border-t">
      <div className="container mx-auto">
        <footer>
          <div className="flex justify-center gap-4">
            <Link href="https://github.com/deryauysal">
              <FaGithub size="2rem" />
            </Link>
            
            <Link href="https://scholar.google.com/citations?user=l2jgZ9sAAAAJ">
              <FaGoogleScholar size="2rem" />
            </Link>
            <Link href="https://www.researchgate.net/profile/Derya_Uysal">
              <FaResearchgate size="2rem" />
            </Link>
            <Link href="https://twitter.com/sderyauysal">
              <FaTwitter size="2rem" />
            </Link>
            <Link href="http://www.linkedin.com/in/derya-uysal-econometrics">
              <FaLinkedin size="2rem" />
            </Link>
          </div>
          <div className="text-muted-foreground flex justify-center text-sm font-medium mt-4">
            <p>{copyright}</p>            
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
