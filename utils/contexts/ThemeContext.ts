import { createContext, Dispatch, SetStateAction } from "react";

export enum Theme {
  LIGHT,
  DARK,
}

interface ContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext({} as ContextType);
