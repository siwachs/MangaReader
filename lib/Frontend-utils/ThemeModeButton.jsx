import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import { WbSunny, Brightness4 } from "@mui/icons-material";

const ThemeModeButton = ({ buttonSize, inherit, size }) => {
  const [mounted, setMounted] = useState(false);

  const { theme, systemTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return currentTheme === "dark" ? (
    <button onClick={() => setTheme("light")}>
      <WbSunny
        sx={{ color: "#f59e0b" }}
        fontSize={buttonSize ? "large" : inherit ? "inherit" : undefined}
        className={`${size ? size : ""}`}
      />
    </button>
  ) : (
    <button onClick={() => setTheme("dark")}>
      <Brightness4
        sx={{ color: "#111827" }}
        fontSize={buttonSize ? "large" : inherit ? "inherit" : undefined}
        className={`${size ? size : ""}`}
      />
    </button>
  );
};

export default ThemeModeButton;
