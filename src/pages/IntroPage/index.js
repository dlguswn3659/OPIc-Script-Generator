import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Logo from "../../assets/icons/logo.svg";
import { Tutorial, TutorialCard } from "./components";
import Tutorial1 from "../../assets/images/tutorial1.png";
import Tutorial2 from "../../assets/images/tutorial2.png";
import { initializeUserLog } from "../../utils/api/localStorageUserLog";

const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

const CenterBox = styled.div`
  margin: 250px auto;
  display: grid;
  width: 50%;
  min-width: 310px;
`;

const LogoImage = styled.img`
  width: 208px;
  margin: auto;
  margin-bottom: 16px;
`;

const StartButton = styled.button`
  height: 41px;
  width: 167px;
  border: hidden;
  background-color: ${palette.darker_green};
  color: ${palette.white};
  border-radius: 16px;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  margin: 0px auto;
  margin-top: 14.5px;
`;

const Content1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 9px;
`;

const TutorialButton = styled.button`
  background-color: transparent;
  border: 1px solid ${palette.darker_green};
  border-radius: 12px;
  width: 111px;
  height: 34.5px;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: ${palette.darker_green};
  margin: 0px auto;
  margin-top: 223px;
  box-shadow: 1.1248176097869873px 1.1248176097869873px 8.998540878295898px 0px
    #02362a40;
`;

const VersionText = styled.div`
  font-family: Noto Sans KR;
  font-size: 8px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 0px;
  color: ${palette.darkest_green};
`;

const IntroPage = () => {
  const [tutorialStatus, setTutorialStatus] = useState(false);

  useEffect(() => {
    initializeUserLog();
  }, []);
  
  const startOnClick = () => {
    window.location.href = "/generate";
  };

  const tutorialOnClick = () => {
    setTutorialStatus(true);
  };
  return (
    <>
      {tutorialStatus ? (
        <TutorialCard />
      ) : (
        <Container>
          <CenterBox>
            <LogoImage src={Logo} />
            <Content1>Chat GPT로 작성하는 내 오픽대본</Content1>
            <TutorialButton onClick={tutorialOnClick}>tutorial</TutorialButton>
            <StartButton onClick={startOnClick}>시작</StartButton>
            <VersionText>v0.1</VersionText>
          </CenterBox>
        </Container>
      )}
    </>
  );
};

export default IntroPage;
