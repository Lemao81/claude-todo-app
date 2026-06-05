import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
	mode: ColorMode;
	toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
	mode: "light",
	toggleColorMode: () => {},
});

export function useColorMode() {
	return useContext(ColorModeContext);
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<ColorMode>(
		() => (localStorage.getItem("colorMode") as ColorMode) ?? "light",
	);

	const toggleColorMode = () => {
		setMode((prev) => {
			const next = prev === "light" ? "dark" : "light";
			localStorage.setItem("colorMode", next);

			return next;
		});
	};

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	return (
		<ColorModeContext.Provider value={{ mode, toggleColorMode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
