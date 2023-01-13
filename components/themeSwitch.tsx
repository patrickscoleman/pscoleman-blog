import tailwindConfigModule from "@/tailwind.config.js";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindConfig = resolveConfig(tailwindConfigModule);

const ThemeSwitchComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs after the client has mounted, which triggers a page update
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
            // Controls default (unchecked) settings for the thumb, i.e. dark mode
            // @ts-ignore
            backgroundColor: tailwindConfig.theme.colors.accent.dark,
            // @ts-ignore
            color: tailwindConfig.theme.colors.accent.darktext,
            height: "2rem",
            width: "2rem",
            top: "50%",
            marginTop: "-1rem",
            marginLeft: ".2rem",
            "&:hover": {
              // @ts-ignore
              backgroundColor: tailwindConfig.theme.colors.accent.darkhover,
            },
            "& + .MuiSwitch-track": {
              // @ts-ignore
              backgroundColor: tailwindConfig.theme.colors.accent.darktrack,
            },
          },
          colorPrimary: {
            "&.Mui-checked": {
              // Controls active (checked) settings for the thumb, i.e. light mode
              // @ts-ignore
              backgroundColor: tailwindConfig.theme.colors.accent.light,
              // @ts-ignore
              color: tailwindConfig.theme.colors.accent.lighttext,
              "&:hover": {
                // @ts-ignore
                backgroundColor: tailwindConfig.theme.colors.accent.lighthover,
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
          // resolvedTheme will be undefined on the first render, so use light theme (checked)
          checked={!mounted ? true : resolvedTheme === "light"}
          icon={<DarkModeIcon />}
          checkedIcon={<LightModeIcon />}
          onChange={handleChange}
          aria-label="Switch theme"
        />
      </ThemeProvider>
    </div>
  );
};

export const ThemeSwitch = ThemeSwitchComponent;
