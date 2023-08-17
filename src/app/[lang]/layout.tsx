import { Inter } from "next/font/google";
import "./globals.css";
import { GenerateMetadata, getTermTranslations } from "./i18n";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const terms = await getTermTranslations(params.lang);

  return {
    title: {
      template: terms("title-template"),
      default: terms("title-default"),
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
