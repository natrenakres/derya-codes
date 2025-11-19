import { Mail, MapPin,  Phone } from "lucide-react";
import { TypographyH2 } from "./ui/typography";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { siteMetadata } from "@/data/metadata";

interface Contact7Props {
  title?: string;  
  emailLabel?: string;  
  officeLabel?: string;    
  phoneLabel?: string;    
  githubLabel?: string;  
  
}

const Contact7 = ({
  title = "Contact",  
  emailLabel = "Email",  
  officeLabel = "Office",    
  phoneLabel = "Phone",    
  githubLabel = "Github"  
}: Contact7Props) => {
  const { email, emailDisplay, officeAddress, phone, github, githubAccount } = siteMetadata;
  return (
    <section className="py-4">
      <div className="container mx-auto">
        <div className="mb-14">
          <TypographyH2>
            {title}
          </TypographyH2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-muted rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>            
            <a
              href={`mailto:${email}`}
              className="font-semibold hover:underline"
            >
              {emailDisplay}
            </a>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>            
            <span className="font-semibold hover:underline">
              {officeAddress}
            </span>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>            
            <a href={`tel:${phone}`} className="font-semibold hover:underline">
              {phone}
            </a>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <FaGithub  className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{githubLabel}</p>            
            <a href={github} className="font-semibold hover:underline">
              {githubAccount}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
