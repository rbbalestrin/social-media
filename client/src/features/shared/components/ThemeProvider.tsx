import { createContext, use, useEffect, useState } from "react";

import { getItem, setItem } from "@/lib/utils/localStorage";

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void
}

type ThemeProviderProps = {
  children: React.ReactNode,
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => { }
})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "social-media-theme" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getItem<Theme>(storageKey) ?? defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light"

      root.classList.add(systemTheme)
      setItem(storageKey, systemTheme)
      return
    }
    root.classList.add(theme)
    setItem(storageKey, theme)
  }, [theme, storageKey])

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}

export function useTheme() {
  const context = use(ThemeContext)

  if (context === null) {
    console.error("useTheme precisa ser usado em um ThemeContext")
  }
  return context
}


