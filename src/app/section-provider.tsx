"use client";

import { ReactNode, createContext, useContext } from "react";

const sectionContext = createContext<
  [(section: string) => string, Record<string, string>]
>([() => "test", {}]);

export const usePageSections = () => {
  return useContext(sectionContext);
};

export function SectionProvider({
  children,
  sections,
}: {
  children: ReactNode;
  sections: Record<string, string>;
}) {
  function t(key: string) {
    return sections[key] || key;
  }

  return (
    <sectionContext.Provider value={[t, sections]}>
      {children}
    </sectionContext.Provider>
  );
}
