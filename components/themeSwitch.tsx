import tailwindConfigModule from "@/tailwind.config.js";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Skeleton, Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindConfig = resolveConfig(tailwindConfigModule);

const ThemeSwitchComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs after the client has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const switchTheme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // Controls defaults (unchecked) settings for the thumb
            // @ts-ignore
            backgroundColor: tailwindConfig.theme.colors.accent.light,
            // @ts-ignore
            color: tailwindConfig.theme.colors.accent.lighttext,
            height: "2rem",
            width: "2rem",
            top: "50%",
            marginTop: "-1rem",
            marginLeft: ".2rem",
            "&:hover": {
              // @ts-ignore
              backgroundColor: tailwindConfig.theme.colors.accent.lighthover,
            },
          },
          colorPrimary: {
            "&.Mui-checked": {
              // Controls checked settings for the thumb
              // @ts-ignore
              backgroundColor: tailwindConfig.theme.colors.accent.dark,
              // @ts-ignore
              color: tailwindConfig.theme.colors.accent.darktext,
              "&:hover": {
                // @ts-ignore
                backgroundColor: tailwindConfig.theme.colors.accent.darkhover,
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex items-center">
      <ThemeProvider theme={switchTheme}>
        <Switch
          // resolvedTheme will be undefined on the first render, so use light theme by default
          checked={!mounted ? false : resolvedTheme === "dark"}
          icon={<LightModeIcon />}
          checkedIcon={<DarkModeIcon />}
          onChange={handleChange}
          aria-label="Switch theme"
        />
      </ThemeProvider>
    </div>
  );
};

export const ThemeSwitch = ThemeSwitchComponent;
