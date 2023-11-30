import { Inter } from "next/font/google";
import {
  GenerateMetadata,
  LayoutProps,
  getPageTranslations,
  getPathname,
  getTermTranslations,
} from "../../lib/i18n";
import { SectionProvider } from "../section-provider";
import { TermsProvider } from "../terms-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata: GenerateMetadata = async () => {
  const { getTerm } = await getTermTranslations();

  return {
    title: {
      template: getTerm("title-template"),
      default: getTerm("title-default"),
    },
  };
};

export default async function RootLayout(props: LayoutProps) {
  const pathname = getPathname();

  const { terms } = await getTermTranslations();
  const { sections } = await getPageTranslations();

  return (
    <html lang="en">
      <body className={inter.className}>
        <TermsProvider terms={terms}>
          <SectionProvider sections={sections}>
            {props.children}
          </SectionProvider>
        </TermsProvider>
      </body>
    </html>
  );
}
