import {
  PageProps,
  getPageTranslations,
  getTermTranslations,
  type GenerateMetadata,
} from "../../../lib/i18n";
import { Button } from "./button";

const pageRoute = "/home";

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const page = await getPageTranslations(params.lang, pageRoute);

  return {
    title: page.title,
    keywords: page.keywords,
    description: page.description,
  };
};

export default async function Home({ params }: PageProps) {
  const { getTerm } = await getTermTranslations(params.lang);
  const { getSection } = await getPageTranslations(params.lang, pageRoute);

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
