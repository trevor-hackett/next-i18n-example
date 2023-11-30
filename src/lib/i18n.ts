import "server-only";

import { defaultLocale } from "@/middleware";
import { Metadata } from "next";
import { headers } from "next/headers";

export type LayoutProps<T = {}> = {
  params: T & { lang: string };
  children: React.ReactNode;
};

export type MetadataProps<T = {}> = {
  params: T & { lang: string };
};

export type PageProps<T = {}> = {
  params: T & { lang: string };
};

export type GenerateMetadata<T = {}> = (
  props: MetadataProps<T>
) => Promise<Metadata>;

export async function getTermTranslations() {
  const languageId = getLocale();

  const searchParams = new URLSearchParams({ languageId });
  const response = await fetch(
    `https://cms-dev.emergencydispatch.org/api/terms?${searchParams}`,
    {
      headers: {
        siteId: "ace-portal",
      },
      next: {
        revalidate: 60 * 5, // 5 minutes
      },
    }
  );

  const terms = (await response.json()) as Record<string, string>;

  function getTerm(key: string) {
    return terms[key] || key;
  }

  return { getTerm, terms };
}

export async function getPageTranslations() {
  const languageId = getLocale();
  const route = getPathname();

  console.log({ languageId, route });

  const searchParams = new URLSearchParams({ languageId, route });
  const response = await fetch(
    `https://cms-dev.emergencydispatch.org/api/pages?${searchParams}`,
    {
      headers: {
        siteId: "ace-portal",
      },
      next: {
        revalidate: 60 * 5, // 5 minutes
      },
    }
  );

  const page = (await response.json()) as PageI18n;

  function getSection(key: string) {
    return page.sections[key] || key;
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    sections: page.sections,
    getSection,
  };
}

export function getLocale() {
  const requestHeaders = headers();

  const pathname = new URL(requestHeaders.get("x-url") || "/").pathname;
  let sections = pathname.split("/");

  return sections[1] || defaultLocale;
}

export function getPathname() {
  const requestHeaders = headers();

  const pathname = new URL(requestHeaders.get("x-url") || "/").pathname;

  let sections = pathname.split("/");
  sections = sections.slice(2);

  return `/${sections.join("/")}`;
}

type PageI18n = {
  title: string;
  description: string;
  keywords: string;
  sections: Record<string, string>;
};
