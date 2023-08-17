import { redirect } from "next/navigation";
import { PageProps } from "./i18n";

export default function RootPage({ params }: PageProps) {
  redirect(`/${params.lang}/home`);
}
