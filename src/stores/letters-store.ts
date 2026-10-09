import { createStore } from "zustand/vanilla";
import { Letter } from "../types";

export type LettersState = {
  letters: Letter[];
};

export type LettersActions = {
  createLetter: (newLetter: Letter) => void;
};

export type LettersStore = LettersState & LettersActions;

export const defaultInitState: LettersState = {
  letters: [],
};

export const createLettersStore = (
  initState: LettersState = defaultInitState,
) => {
  return createStore<LettersStore>()((set) => ({
    ...initState,
    createLetter: (newLetter: Letter) =>
      set((state) => ({
        letters: [...state.letters, newLetter],
      })),
  }));
};
