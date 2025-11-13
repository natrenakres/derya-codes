import { ArrowDownRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/assets/img/hero.jpg";

interface Hero3Props {
  heading?: string;
  title?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
}

const Hero3 = ({
  heading = "Dr. Derya Uysal",
  title = "Associate Professor",
  description = "I am an associate professor in the Department of Economics at the University of Munich. I am also an Affiliate at CESifo. My research interests are microeconometrics and applied econometrics in labour economics, with particular emphasis on program evaluation.",
  buttons = {
    primary: {
      text: "Research",
      url: "/resarch",
    },
    secondary: {
      text: "About",
      url: "/about",
    },
  }
}: Hero3Props) => {
  return (
    <section className="container m-auto py-4">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <p className="text-muted-foreground mb-2 max-w-xl lg:text-xl">
            {title}
          </p>
          <h1 className="my-4 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">
            {heading}
          </h1>          
          <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline">
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex">
          <Image
            src={HeroImage}
            alt="Derya Uysal profile photo"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero3 };
