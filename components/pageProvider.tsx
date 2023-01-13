import { darkTheme, lightTheme } from "@/styles/themes";
import { ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface PageProviderProps {
  children: ReactNode;
}

// PageProvider applies the theme to the MUI components
const PageProviderComponent = ({ children }: PageProviderProps) => {
  // resolvedTheme is undefined on the first render, so use light theme by default
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  // useEffect only runs after the client has mounted
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
