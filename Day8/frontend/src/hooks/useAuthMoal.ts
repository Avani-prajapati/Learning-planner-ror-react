import { useState } from "react";

interface AuthModalState {
  isOpen: boolean;
  tabOption: string;
}

export function useAuthModal() {
  const [state, setState] = useState<AuthModalState>({
    isOpen: false,
    tabOption: "",
  });

  const open = (tab: string) => setState({ isOpen: true, tabOption: tab });
  const close = () => setState({ isOpen: false, tabOption: "" });

  return { ...state, open, close };
}
