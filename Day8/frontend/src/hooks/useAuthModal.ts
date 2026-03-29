import { useState } from "react";

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tabOption, setTabOption] = useState<"signin" | "signup">("signin");

  const open = (tab: "signin" | "signup") => {
    console.log("Opening modal with tab:", tab);
    setTabOption(tab);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, tabOption, open, close };
}
