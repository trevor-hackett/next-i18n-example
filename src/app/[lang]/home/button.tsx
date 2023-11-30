"use client";

import { usePageSections } from "@/app/section-provider";
import { useTerms } from "@/app/terms-provider";

export function InnerButton() {
  const [t] = useTerms();
  const [s] = usePageSections();

  return (
    <button
      onClick={() => console.log(s("ace-portal-section"))}
      className="bg-red-700 py-1 px-2.5 rounded hover:bg-red-800"
    >
      {t("trevor-test")}
    </button>
  );
}

export function Button() {
  return <InnerButton />;
}
