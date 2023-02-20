import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFoundErrorPage from "./pages/404";
import Login from "./pages/Login";
import { UserContextProvider } from "./context/UserContext";
import Panel from "./pages/panel/Panel";

const GeneralStyles = createGlobalStyle`
  .main-font: {
    font-family: 'Secular One', sans-serif;
  }

  ${(props) => {
    if (props.theme === "light") {
      return `
        html {
          --font-color: #2e2e2e;
          --font-color-2: gray;
          --font-color-ngtv: #b3b3b3;
          --bg-color-1: white;
          --bg-color-2: #ffffff;
          --bg-color-3: #e0e0e0;
          --bg-color-4: #e2e2e2;
          --bg-color-5: #edeff3;
          --bg-color-6: #d0d0d0;
        }
        `;
    }
  }}

  @media only screen and (max-width: 800px) {
    .mobile-change {
      &.orientation {
        flex-direction: column;

        &.reverse {
          flex-direction: column-reverse;
        }
      }

      &.row {
        flex-direction: row;
      }

      &.center-content {
        justify-content: center;
      }

      &.center-items {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &.all-screen-width {
        width: 100%;
        margin: auto;
      }

      &.mediun-width {
        width: 80%;
      }

      &.navbar-space-padding {
        padding-top: 60px;
      }

      &.align {
        &.left {
          margin: auto 0 auto 10px;
          left: 10px;
        }

        &.right {
          margin: auto 10px auto 0;
          right: 10px;
        }
      }

      &.fontsize {
        &.small {
          font-size: 1.8em;
        }
        &.medium {
          font-size: 2em;
        }
        &.gigant {
          font-size: 3em;
        }
      }

      &.show-item {
        display: block;
      }

      &.hide-item {
        display: none;
      }
    }
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  max-width: 100%;
  background-color: #1D1E20;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => {
  const theme = "light";
  return (
    <MainContainer id="App">
      <GeneralStyles theme={theme} />
      <Router>
        <UserContextProvider>
          <Routes>
            {/* <Route index path="/" element={<Home />} /> */}
            <Route path="/" element={<Navigate to="/cash/select" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login register={true} />} />
            <Route index path="/*" element={<Panel />} />
            <Route path="/*" element={<NotFoundErrorPage />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </MainContainer>
  );
};

export default App;
