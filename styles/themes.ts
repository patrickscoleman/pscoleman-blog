import { createTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "@/tailwind.config.js";

const tailwindConfig = resolveConfig(tailwindConfigModule);

declare module "@mui/material/styles" {
  interface Palette {
    menu: Palette["primary"];
  }
  interface PaletteOptions {
    menu: PaletteOptions["primary"];
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.accent.light,
    },
    menu: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.text.light,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.accent.dark,
    },
    menu: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.text.darkbold,
    },
  },
});
