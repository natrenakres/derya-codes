import { Mail, MapPin,  Phone } from "lucide-react";
import { TypographyH2 } from "./ui/typography";
import { FaTwitter } from "react-icons/fa";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDisplay?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  socialLabel?: string;  
  socialLink?: string;
}

const Contact7 = ({
  title = "Contact",  
  emailLabel = "Email",  
  emailDisplay = "derya.uysal(at)econ.lmu.de",
  email = "derya.uysal@econ.lmu.de",
  officeLabel = "Office",  
  officeAddress = "University of Munich (LMU Munich) Department of Economics Munich Germany",
  phoneLabel = "Phone",  
  phone = "+498921802224",
  socialLabel = "Social",  
  socialLink = "@deryauysal",
}: Contact7Props) => {
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
              <FaTwitter className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{socialLabel}</p>            
            <a href="#" className="font-semibold hover:underline">
              {socialLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
