"use client";
import Link from "next/link";
import { Button, ButtonGroup } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TestIcon from "@mui/icons-material/Build";
import { Pets } from "@mui/icons-material";

export default function Header({ theme, toggleTheme }) {
  const iconButtonStyle = {
    minWidth: "40px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px",
    lineHeight: "1",
    textAlign: "center",
    color: "var(--icon-color)", // アイコンの色をCSS変数で制御
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "var(--bg-color)", // 背景色をCSS変数で制御
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button variant="outlined" style={iconButtonStyle}>
          <MenuIcon />
        </Button>
        <Link href="/get_dog_image" prefetch={false}>
          <Button variant="outlined" style={iconButtonStyle}>
            <Pets />
          </Button>
        </Link>
        <Link href="/supabase_component" prefetch={false}>
          <Button variant="outlined" style={iconButtonStyle}>
            <TestIcon />
          </Button>
        </Link>
        <Link href="/management" prefetch={false}>
          <Button variant="outlined" style={iconButtonStyle}>
            <AccountCircleIcon />
          </Button>
        </Link>
        <Button
          variant="outlined"
          aria-label="toggle theme"
          onClick={toggleTheme}
          style={iconButtonStyle}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </ButtonGroup>
    </div>
  );
}
