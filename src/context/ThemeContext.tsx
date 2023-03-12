import { createContext, useState } from "react";
import { createGlobalStyle } from "styled-components";

interface IContext {
  theme: string;
  selectTheme: (theme: string) => void;
}

interface IProps {
  theme: string;
}

const NovanetaTheme = `
  --bg-main-color: #a45b17;
  --bg-gradient-color: #46280c;
  `;

const BlueTheme = `
  --bg-main-color: #460de2;
  --bg-gradient-color: #1c0f3f;
`;

const PinkTheme = `
  --bg-main-color: #c50d59;
  --bg-gradient-color: #530f29;
`;

const GreenTheme = `
  --bg-main-color: #05641d;
  --bg-gradient-color: #052005;
`;


const GeneralStyles = createGlobalStyle<IProps>`
  html {
    --bg-color: #1D1E20;
    --font-color: white;
    ${({ theme }) => {
      switch (theme) {
        case "novaneta":
          return NovanetaTheme;
        case "blue":
          return BlueTheme;
        case "pink":
          return PinkTheme;
        case "green":
          return GreenTheme;
        default :
          return NovanetaTheme;
      }
    }}
  }
`;

export const ThemeContext = createContext<IContext>({
  theme: "novaneta",
  selectTheme: (theme: string) => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "novaneta");
  const selectTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, selectTheme }}>
      <GeneralStyles theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
};
