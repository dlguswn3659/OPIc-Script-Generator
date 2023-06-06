import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Logo from "../../../assets/icons/logo.svg";
import Tutorial1 from "../../../assets/images/tutorial1.png";
import Tutorial2 from "../../../assets/images/tutorial2.png";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 20px;
  background-color: ${palette.light_bg};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoImage = styled.img`
  width: 208px;
  margin-bottom: 20px;
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
  margin: 20px auto;
  width: 200px;
`;

const Header1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
  margin-bottom: 7px;
`;

const Content1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 15px;
`;

const Content2 = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 20px;
`;
const ExampleImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 2px dashed ${palette.background};
  border-radius: 18px;
  margin-bottom: 20px;
`;

const ExampleImage = styled.img`
  width: 80%;
  margin: 10px;
`;

const Tutorial3 = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.Black};
  margin: 10px;
`;

const Tutorial = () => {
  const startOnClick = () => {
    window.location.href = "/generate";
  };
  return (
    <Container>
      <ContentBox>
        <LogoImage src={Logo} />
        <Header1>안녕하세요 Opicscript 입니다.</Header1>
        <Content1>
          Opicscript는 간단한 설문을 통해 개인에게 커스터마이징 된 OPIC 대본을
          작성해 줍니다.
        </Content1>
        <Content2>
          1. 답변은 간단하게 작성해도 괜찮지만, IH 레벨 이상의 대본에서는
          성실하게 작성하는걸 추천해 드립니다.{" "}
        </Content2>
        <ExampleImageContainer>
          <ExampleImage src={Tutorial1} />
        </ExampleImageContainer>
        <Content2>
          2. 본인에게 해당이 안되는 질문은 건너뛰셔도 됩니다.{" "}
        </Content2>
        <ExampleImageContainer>
          <ExampleImage src={Tutorial2} />
        </ExampleImageContainer>
        <Content2>
          3. 답했을때 정확한 위치 또 이름 다움표로 표시해주세요.{" "}
        </Content2>
        <ExampleImageContainer>
          <Tutorial3>"남산타워" "New Jeans" "홍대"</Tutorial3>
        </ExampleImageContainer>
        <Content1 style={{ textAlign: "center" }}>
          Chat-GPT 기술을 통해 대본이 생성되면 다양한 버튼들을 통해 내 영어
          실력과 목표 성적에 맞는 대본을 완성하세요!
        </Content1>
        <StartButton onClick={startOnClick}>시작하기</StartButton>
      </ContentBox>
    </Container>
  );
};

export default Tutorial;
