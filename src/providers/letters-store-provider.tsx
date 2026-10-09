"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type LettersStore,
  createLettersStore,
  type LettersState,
} from "../stores/letters-store";

export type LettersStoreApi = ReturnType<typeof createLettersStore>;

export const LettersStoreContext = createContext<LettersStoreApi | undefined>(
  undefined,
);

export interface LettersStoreProviderProps {
  children: ReactNode;
  initialLetters: LettersState["letters"];
}

export const LettersStoreProvider = ({
  children,
  initialLetters,
}: LettersStoreProviderProps) => {
  const storeRef = useRef<LettersStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createLettersStore({ letters: initialLetters });
  }

  return (
    <LettersStoreContext.Provider value={storeRef.current}>
      {children}
    </LettersStoreContext.Provider>
  );
};

export const useLettersStore = <T,>(
  selector: (store: LettersStore) => T,
): T => {
  const lettersStoreContext = useContext(LettersStoreContext);

  if (!lettersStoreContext) {
    throw new Error("useLettersStore must be used within LettersStoreProvider");
  }

  return useStore(lettersStoreContext, selector);
};
