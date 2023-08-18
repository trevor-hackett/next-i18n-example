import { TermsProvider } from "@/app/terms-provider";
import {
  type GenerateMetadata,
  PageProps,
  getPageTranslations,
  getTermTranslations,
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
  const [t] = await getTermTranslations(params.lang);
  const page = await getPageTranslations(params.lang, pageRoute);

  return (
    <main>
      <p>This comes from terms: {t("ace-portal-term")}</p>

      <section
        dangerouslySetInnerHTML={{
          __html: page.getSection("ace-portal-section"),
        }}
      />

      <Button />
    </main>
  );
}
