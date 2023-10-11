import logo from "./logo.svg";
import "./App.css";
import { IntroPage, ScriptGeneratePage, AdminPage, QuizletPage, QuizletListPage } from "./pages";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { COLORS as palette } from "./utils/style/Color/colors";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import ReactGA4 from "react-ga4";
import { Footer } from "./components";

ReactGA4.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID);

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용

const history = createBrowserHistory();
history.listen((response) => {
  console.log(response.location.pathname);
  ReactGA.set({ page: response.location.pathname });
  ReactGA.pageview(response.location.pathname);
  ReactGA4.set({ page: response.location.pathname });
  ReactGA4.send("pageview");
});

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
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/quizlet" element={<QuizletPage />} />
              <Route path="/quizlet/record" element={<QuizletListPage />} />
            </Routes>
            <Footer />
          </WebAppContainer>
        </BodyInner>
      </BrowserRouter>
    </div>
  );
}

export default App;
