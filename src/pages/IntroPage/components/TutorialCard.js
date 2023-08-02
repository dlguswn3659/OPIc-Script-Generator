import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Logo from "../../../assets/icons/logo.svg";
import Tutorial1 from "../../../assets/images/tutorial1.png";
import Tutorial2 from "../../../assets/images/tutorial2.png";
import Tuto2 from "../../../assets/images/tuto2.png";
import Tuto3 from "../../../assets/images/tuto3.png";
import Tuto5 from "../../../assets/images/tuto5.png";
import Tuto6 from "../../../assets/images/tuto6.png";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 20px;
  background-color: ${palette.light_bg};
  position: relative;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
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
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 20px;
  padding: 0px 10px;
`;

const ImageBox = styled.div`
  width: 100%;
  // height: 352px;
  margin-top: 70px;
  margin-bottom: 50px;
`;

const ImageInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExampleImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 2px dashed ${palette.background};
  border-radius: 18px;
  margin: 15px 0px;
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
  position: absolute;
  padding: 20px;
  left: 0;
  bottom: 0;
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

const FirstText = styled.div`
  font-family: Noto Sans KR;
  font-size: 32px;
  font-weight: 400;
  line-height: 46px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 59px;
  height: 230px;
`;

const TutorialCard = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      img: null,
      content1: (
        <>
          <FirstText>
            <div style={{ fontWeight: "700" }}>
              안녕하세요! <br />
              Opicscript는
            </div>
            Chat GPT를 통해 여러분들의 오픽 답변을 작성하는 툴입니다.
          </FirstText>
        </>
      ),
    },
    {
      img: [<ExampleImage src={Tuto2} />],
      content1: "먼저 본인이 관심있는 OPIc 설문 주제를 선택합니다.",
    },
    {
      img: [<ExampleImage src={Tuto3} />],
      content1: "다음, 기출 질문들 중 대본을 생성하고 싶은 질문을 선택합니다.",
    },
    {
      img: [
        <ExampleImage src={Tutorial1} />,
        // <ExampleImage src={Tutorial2} />,
        // <Tutorial3>"남산타워" "New Jeans" "홍대"</Tutorial3>,
      ],
      content1: (
        <>
          맞춤식 OPIc 답변 제작을 위해 5~8개 정도의 질문에 대해 한국어로
          대답합니다.
          <br />
          <br />
          답변이 구체적일수록 더 구체적인 대본이 생성되고 나에게 해당 안되는
          질문은 "건너뛰기"를 눌러주세요.
        </>
      ),
    },
    {
      img: [<ExampleImage src={Tuto5} />],
      content1: (
        <>
          "마지막으로 글 길이, 목표 성적, 그리고 내가 추구하는 말투를
          설정하시면"
        </>
      ),
    },
    {
      img: [<ExampleImage src={Tuto6} />],
      content1: <>원하는 대본이 완성!</>,
    },
  ];

  const startOnClick = () => {
    window.location.href = "/generate";
  };

  return (
    <Container>
      <ContentBox>
        {steps[step].img ? (
          <ImageBox>
            {steps[step].img.map((item, idx) => (
              <ImageInner>
                <ExampleImageContainer>{item}</ExampleImageContainer>
              </ImageInner>
            ))}
          </ImageBox>
        ) : (
          <></>
        )}
        <Content2>{steps[step].content1}</Content2>
      </ContentBox>
      <BottomBar>
        <LeftButton
          style={step < 1 ? { visibility: "collapse" } : {}}
          onClick={() => setStep(step - 1)}
        >
          <ArrowIcon src={LeftArrow} />
        </LeftButton>
        <CenterText>
          {step + 1} of {steps.length}
        </CenterText>
        <LeftButton
          onClick={() => {
            step == steps?.length - 1 ? startOnClick() : setStep(step + 1);
          }}
        >
          <ButtonText>{step == steps?.length - 1 ? "시작" : "다음"}</ButtonText>
          <ArrowIcon src={RightArrow} />
        </LeftButton>
      </BottomBar>
    </Container>
  );
};

export default TutorialCard;
