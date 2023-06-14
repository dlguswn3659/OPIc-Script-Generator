import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Logo from "../../../assets/icons/logo.svg";
import Tutorial1 from "../../../assets/images/tutorial1.png";
import Tutorial2 from "../../../assets/images/tutorial2.png";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";

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
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
    width: 100%;
    height: 352px;
  margin-top: 70px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ExampleImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 2px dashed ${palette.background};
  border-radius: 18px;
  margin: auto 0px;
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

const BottomBar = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const LeftButton = styled.button`
  height: 30px;
  background: transparent;
  border: 0px;
  display: flex;
  margin: auto 0px;
  width: 80px;
`;

const ButtonText = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  margin: auto 5px;
  color: ${palette.darkest_green};
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`;

const CenterText = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  background-color: transparent;
  border: hidden;
  color: ${palette.darkest_green};
  margin: auto 0px;
`;

const TutorialCard = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            img: <ExampleImage src={Tutorial1} />,
            content1: "답변은 간단하게 작성해도 괜찮지만, IH 레벨 이상의 대본에서는 성실하게 작성하는걸 추천해 드립니다."
        },
        {
            img: <ExampleImage src={Tutorial2} />,
            content1: "본인에게 해당이 안되는 질문은 건너뛰셔도 됩니다"
        },
        {
            img: <Tutorial3>"남산타워" "New Jeans" "홍대"</Tutorial3>,
            content1: "답했을때 정확한 위치 또 이름 다움표로 표시해주세요"
        }
    ]

  const startOnClick = () => {
    window.location.href = "/generate";
  };

  return (
    <Container>
      <ContentBox>
        <ImageBox>
            <ExampleImageContainer>
                {steps[step].img}
            </ExampleImageContainer>
        </ImageBox>
        <Content2>
            {steps[step].content1}
        </Content2>
      </ContentBox>
      <BottomBar>
        <LeftButton
            style={step < 1 ? {visibility: "collapse"} : {}}
            onClick={()=>setStep(step-1)}
        >
            <ArrowIcon src={LeftArrow} />
        </LeftButton>
        <CenterText>
            {step+1} of {steps.length}
        </CenterText>
        <LeftButton
            onClick={() => {step == steps?.length - 1 ? startOnClick() : setStep(step+1)}}
        >
            <ButtonText>
            {step == steps?.length - 1
                ? "시작"
                : "다음"}
            </ButtonText>
            <ArrowIcon src={RightArrow} />
        </LeftButton>
        </BottomBar>
    </Container>
  );
};

export default TutorialCard;
