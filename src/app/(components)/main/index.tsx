import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { CTA_LINK } from "~/const";
import Link from "next/link";
import { CollegeLogo } from "./logos";
import { VideoSection } from "./video";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "~/i18n/language-switcher";

const COLLEGES = [
  { src: "/colleges/cmu-q.jpg", className: "bg-[#C51130]" },
  { src: "/colleges/cornell.svg", className: "bg-white" },
  { src: "/colleges/drexel.svg", className: "bg-[#1A3B73]" },
  { src: "/colleges/nyu.svg", className: "bg-[#57068C]" },
];

export const Main: React.FC = () => {
  const t = useTranslations("Main");

  return (
    <>
      <div className="flex flex-col items-center mx-auto w-full max-w-md px-4 mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Image src="/logo.svg" alt="admit.kz logo" width={24} height={24} />
          <p className="tracking-tighter font-medium pt-[1px]">admitium</p>

          <LanguageSwitcher />
        </div>
        <h1 className="tracking-tight text-neutral-800 mb-2 text-3xl md:text-4xl font-bold leading-none text-center text-pretty">
          {t("title")}
        </h1>
        <p className="text-neutral-500 text-center leading-tight text-base md:text-lg font-medium mb-12">
          {t("subtitle")}
        </p>
        <Link
          href={CTA_LINK}
          className="bg-neutral-800 hover:scale-105 duration-150 ease-out hover:bg-black mb-8 text-white font-medium px-4 py-2 md:px-2 md:py-1.5 rounded-xl tracking-tighter leading-5 flex items-center gap-2"
        >
          {t("getAccess")} <ArrowRight size={16} />
        </Link>

        <div className="flex gap-3 items-center">
          <div className="flex items-center -space-x-4">
            {COLLEGES.map((college, index) => (
              <CollegeLogo
                key={college.src}
                src={college.src}
                className={college.className}
                index={index}
              />
            ))}
          </div>
          <p className="text-neutral-500 leading-tight font-medium text-sm">
            {t("invitations")}
          </p>
        </div>
      </div>
      <VideoSection />
    </>
  );
};
