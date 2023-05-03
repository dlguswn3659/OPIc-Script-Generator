import logo from "./logo.svg";
import "./App.css";
import { IntroPage, ScriptGeneratePage } from "./pages";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { COLORS as palette } from "./utils/style/Color/colors";

const BodyInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${palette.background};
  // background-color: ${palette.white};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: 100vh;
  background-color: ${palette.white};
  // position: absolute;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BodyInner>
          <WebAppContainer>
            <Routes>
              <Route exact path="/" element={<IntroPage />} />
              <Route path="/generate" element={<ScriptGeneratePage />} />
            </Routes>
          </WebAppContainer>
        </BodyInner>
      </BrowserRouter>
    </div>
  );
}

export default App;
