import { PageLocaleRequest, getTerms } from "./i18n";

export default async function Home({ params }: PageLocaleRequest) {
  const t = await getTerms(params.lang);

  return <main>{t("ace-portal-term")}</main>;
}
