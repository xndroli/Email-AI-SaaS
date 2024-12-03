import { useTheme } from "next-themes";
import React from "react";
import { useRegisterActions} from "kbar"

const useThemeSwitching = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const themeAction = [{
        id: "toggleTheme",
        name: "Toggle Theme",
        shortcut: ['t', 't'],
        section: "Theme",
        perform: toggleTheme,
    }, {
        id: "setLightTheme",
        name: "Set Light Theme",
        section: "Theme",
        perform: () => setTheme("light"),
    }, {
        id: "setDarkTheme",
        name: "Set Dark Theme",
        section: "Theme",
        perform: () => setTheme("dark"),
    }]

    useRegisterActions(themeAction, [theme])
};

export default useThemeSwitching;