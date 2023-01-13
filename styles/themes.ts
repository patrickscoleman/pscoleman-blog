import { createTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "@/tailwind.config.js";

const tailwindConfig = resolveConfig(tailwindConfigModule);

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.primary.light,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // @ts-ignore
      main: tailwindConfig.theme.colors.primary.dark,
    },
  },
});
