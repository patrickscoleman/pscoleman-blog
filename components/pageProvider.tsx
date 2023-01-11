import { darkTheme, lightTheme } from "@/styles/themes";
import { ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface PageProviderProps {
  children: ReactNode;
}
const PageProviderComponent = ({ children }: PageProviderProps) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }
  }, [resolvedTheme]);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export const PageProvider = PageProviderComponent;
