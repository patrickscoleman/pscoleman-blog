import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const themeSwitchComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = (
    _event: React.MouseEvent<HTMLElement>,
    newTheme: string | null
  ) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={theme}
        exclusive
        onChange={toggleTheme}
        aria-label="toggle theme"
      >
        <ToggleButton value="light">Light</ToggleButton>
        <ToggleButton value="system">System</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export const ThemeSwitch = themeSwitchComponent;
