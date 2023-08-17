import {
  PageLocaleRequest,
  getPageTranslations,
  getTermTranslations,
} from "./i18n";

export default async function Home({ params }: PageLocaleRequest) {
  const t = await getTermTranslations(params.lang);
  const page = await getPageTranslations(params.lang, "/home");

  return (
    <main>
      <p>This comes from terms: {t("ace-portal-term")}</p>

      <section
        dangerouslySetInnerHTML={{
          __html: page.getSection("ace-portal-section"),
        }}
      />
    </main>
  );
}
