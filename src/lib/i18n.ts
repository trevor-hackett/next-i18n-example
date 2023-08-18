import "server-only";

import { Metadata } from "next";

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

export async function getTermTranslations(
  languageId: string
): Promise<[(term: string) => string, Record<string, string>]> {
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

  const dictionary = (await response.json()) as Record<string, string>;

  function t(key: string) {
    return dictionary[key] || key;
  }

  return [t, dictionary];
}

export async function getPageTranslations(languageId: string, route: string) {
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
    getSection,
  };
}

type PageI18n = {
  title: string;
  description: string;
  keywords: string;
  sections: Record<string, string>;
};
