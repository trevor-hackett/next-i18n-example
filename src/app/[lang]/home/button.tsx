"use client";

import { useTerms } from "@/app/terms-provider";

export function InnerButton() {
  const [t] = useTerms();

  return (
    <button onClick={() => console.log("I was click")}>
      {t("trevor-test")}
    </button>
  );
}

export function Button() {
  return <InnerButton />;
}
