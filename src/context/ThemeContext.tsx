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
  `;

const BlueTheme = `
  --bg-main-color: #460de2;
`;

const PinkTheme = `
  --bg-main-color: #c50d59;
`;

const GreenTheme = `
  --bg-main-color: #05641d;
`;


const GeneralStyles = createGlobalStyle<IProps>`
  html {
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
