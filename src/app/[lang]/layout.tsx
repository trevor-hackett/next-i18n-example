import { Inter } from "next/font/google";
import "./globals.css";
import {
  GenerateMetadata,
  LayoutProps,
  getTermTranslations,
} from "../../lib/i18n";
import { TermsProvider } from "../terms-provider";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const [terms] = await getTermTranslations(params.lang);

  return {
    title: {
      template: terms("title-template"),
      default: terms("title-default"),
    },
  };
};

export default async function RootLayout(props: LayoutProps) {
  const [_, terms] = await getTermTranslations(props.params.lang);

  console.log(props);

  return (
    <html lang="en">
      <body className={inter.className}>
        <TermsProvider terms={terms}>{props.children}</TermsProvider>
      </body>
    </html>
  );
}
