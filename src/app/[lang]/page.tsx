import { redirect } from "next/navigation";
import { PageProps } from "../../lib/i18n";

export default function RootPage({ params }: PageProps) {
  redirect(`/${params.lang}/home`);
}
