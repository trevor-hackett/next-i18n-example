"use client";

import { ReactNode, createContext, useContext } from "react";

const termContext = createContext<
  [(term: string) => string, Record<string, string>]
>([() => "test", {}]);

export const useTerms = () => {
  return useContext(termContext);
};

// export const TermsProvider = termContext.

export function TermsProvider({
  children,
  terms,
}: {
  children: ReactNode;
  terms: Record<string, string>;
}) {
  function t(key: string) {
    return terms[key] || key;
  }

  return (
    <termContext.Provider value={[t, terms]}>{children}</termContext.Provider>
  );
}
