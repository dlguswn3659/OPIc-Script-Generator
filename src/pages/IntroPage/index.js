import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Logo from "../../assets/icons/logo.svg";
import { Tutorial } from "./components";
import Tutorial1 from "../../assets/images/tutorial1.png";
import Tutorial2 from "../../assets/images/tutorial2.png";

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
  margin-top: 160px;
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
  border: hidden;
  text-decoration-line: underline;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.darkest_green};
  margin-top: 3px;
`;

const IntroPage = () => {
  const [tutorialStatus, setTutorialStatus] = useState(false);

  const startOnClick = () => {
    window.location.href = "/generate";
  };

  const tutorialOnClick = () => {
    setTutorialStatus(true);
  };
  return (
    <>
      {tutorialStatus ? (
        <Tutorial />
      ) : (
        <Container>
          <CenterBox>
            <LogoImage src={Logo} />
            <Content1>
              Opicscript는 간단한 설문을 통해 개인에게 커스터마이징 된 OPIC
              대본을 작성해 줍니다.
            </Content1>
            <Content1>
              Chat-GPT 기술을 통해 대본이 생성되면 다양한 버튼들을 통해 내 영어
              실력과 목표 성적에 맞는 대본을 완성하세요!
            </Content1>
            <StartButton onClick={startOnClick}>시작</StartButton>
            <TutorialButton onClick={tutorialOnClick}>TUTORIAL</TutorialButton>
          </CenterBox>
        </Container>
      )}
    </>
  );
};

export default IntroPage;
