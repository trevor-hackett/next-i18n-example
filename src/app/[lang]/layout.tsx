import { Inter } from "next/font/google";
import Link from "next/link";
import {
  GenerateMetadata,
  LayoutProps,
  getPageTranslations,
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

export default async function RootLayout({ children }: LayoutProps) {
  const { terms } = await getTermTranslations();
  const { sections } = await getPageTranslations();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ul className="flex gap-2 m-8">
          <li>
            <Link href="/en" className="underline">
              English
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href="/fr" className="underline">
              Français
            </Link>
          </li>
        </ul>
        <TermsProvider terms={terms}>
          <SectionProvider sections={sections}>{children}</SectionProvider>
        </TermsProvider>
      </body>
    </html>
  );
}
