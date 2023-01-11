import { darkTheme, lightTheme } from "@/styles/themes";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTheme } from "next-themes";

const ThemeSwitchComponent = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = (
    _event: React.MouseEvent<HTMLElement>,
    newTheme: string
  ) => {
    setTheme(newTheme);
  };

  const theme = resolvedTheme === "light" ? lightTheme : darkTheme;

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={resolvedTheme}
        exclusive
        onChange={toggleTheme}
        aria-label="toggle theme"
        className=""
      >
        <ToggleButton value="light">Light</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export const ThemeSwitch = ThemeSwitchComponent;
