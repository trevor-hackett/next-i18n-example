"server only";

export type LayoutLocaleRequest<T = {}> = {
  params: T & { lang: string };
  children: React.ReactNode;
};

export type PageLocaleRequest<T = {}> = {
  params: T & { lang: string };
};

export async function getTerms(languageId: string) {
  const searchParams = new URLSearchParams({ languageId });
  const response = await fetch(
    `https://cms-dev.emergencydispatch.org/api/terms?languageId=${searchParams}`,
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

  return t;
}
