import {
  PageProps,
  getPageTranslations,
  getTermTranslations,
  type GenerateMetadata,
} from "../../../lib/i18n";
import { Button } from "./button";

export const generateMetadata: GenerateMetadata = async () => {
  const page = await getPageTranslations();

  return {
    title: page.title,
    keywords: page.keywords,
    description: page.description,
  };
};

export default async function Home({ params }: PageProps) {
  const { getTerm } = await getTermTranslations();
  const { getSection } = await getPageTranslations();

  return (
    <main>
      <p>This comes from terms: {getTerm("ace-portal-term")}</p>

      <section
        dangerouslySetInnerHTML={{
          __html: getSection("ace-portal-section"),
        }}
      />

      <Button />
    </main>
  );
}
