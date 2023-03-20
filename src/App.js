import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundErrorPage from "./pages/404";
import Login from "./pages/Login";
import { UserContextProvider } from "./context/UserContext";
import Panel from "./pages/panel/Panel";
import Loading from "./pages/Loading";
import { ThemeContextProvider } from "./context/ThemeContext";
import Devices from "./pages/Devices";
import { DeviceContextProvider } from "./context/DeviceContext";

const GeneralStyles = createGlobalStyle`
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .main-font: {
    font-family: 'Secular One', sans-serif;
  }

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
  background-color: #1d1e20;
  background: linear-gradient(
    190deg,
    var(--bg-gradient-color) -30%,
    rgba(29, 30, 32, 1) 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => {
  return (
    <MainContainer id="App">
      <GeneralStyles />
      <ThemeContextProvider>
        <Router>
          <UserContextProvider>
            <DeviceContextProvider>
              <Routes>
                <Route index path="/" element={<Loading />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login register={true} />} />
                <Route path="/profiles" element={<Devices profiles={true} />} />
                <Route
                  path="/new-profile"
                  element={<Devices profiles={false} />}
                />
                <Route path="/panel/*" element={<Panel />} />
                <Route path="/*" element={<NotFoundErrorPage />} />
              </Routes>
            </DeviceContextProvider>
          </UserContextProvider>
        </Router>
      </ThemeContextProvider>
    </MainContainer>
  );
};

export default App;
