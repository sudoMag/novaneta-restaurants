import { createContext, useState } from "react";
import { createGlobalStyle, css } from "styled-components";

interface IContext {
  theme: string;
  selectTheme: (theme: string) => void;
}

interface IProps {
  theme: string;
}

const NovanetaTheme = css`
  --bg-main-color: #d66903;
  --bg-gradient-color: #013932;
  --gradient-1: linear-gradient(
    90deg,
    rgba(164, 68, 23, 1) 0%,
    #d66903 100%
  );
`;

const BlueTheme = css`
  --bg-main-color: #460de2;
  --bg-gradient-color: #153f34;
  --gradient-1: linear-gradient(
    254deg,
    rgba(11, 64, 50, 1) 0%,
    rgba(70, 13, 226, 1) 100%
  );
`;

const PinkTheme = css`
  --bg-main-color: #c50d59;
  --bg-gradient-color: #5c2656;
  --gradient-1: linear-gradient(
    307deg,
    rgb(121 33 55) 0%,
    rgba(197, 13, 89, 1) 100%
  );
`;

const GreenTheme = css`
  --bg-main-color: #05641d;
  --bg-gradient-color: #2a323c;
  --gradient-1: linear-gradient(
    260deg,
    rgba(42, 50, 60, 1) 0%,
    rgba(5, 100, 29, 1) 100%
  );
`;

const GeneralStyles = createGlobalStyle<IProps>`
  html {
    --bg-color: #1D1E20;
    --font-color: white;
    --span-gradient: linear-gradient(90deg, rgba(153,42,100,1) 0%, rgba(104,5,104,1) 100%);
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
        default:
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
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "novaneta"
  );
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
