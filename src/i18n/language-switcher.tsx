"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "~/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ru" : "en";
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="bg-neutral-100 mx-1 hover:bg-white duration-200 ease-out border border-transparent hover:border-neutral-300 text-neutral-500 py-0.5 px-2 rounded-lg text-sm font-medium z-50"
    >
      {locale === "en" ? "RU" : "EN"}
    </button>
  );
}
