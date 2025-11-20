import { FaGithub, FaResearchgate, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import Link from "next/link";
import { siteMetadata } from "@/data/metadata";

const Footer = () => {
  const { github, googleScholar, researchGate, twitter, linkedIn, siteUrl } = siteMetadata;
  const year = new Date().getFullYear();
  return (
    <section className="py-4 border-t">
      <div className="container mx-auto">
        <footer>
          <div className="flex justify-center gap-4">
            <Link href={github}>
              <FaGithub size="2rem" />
            </Link>            
            <Link href={googleScholar}>
              <FaGoogleScholar size="2rem" />
            </Link>
            <Link href={researchGate}>
              <FaResearchgate size="2rem" />
            </Link>
            <Link href={twitter}>
              <FaTwitter size="2rem" />
            </Link>
            <Link href={linkedIn}>
              <FaLinkedin size="2rem" />
            </Link>
          </div>
          <div className="text-muted-foreground flex justify-center text-sm font-medium mt-4">
            <p>&copy; {year} {siteUrl} All rights reserved.</p>            
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
