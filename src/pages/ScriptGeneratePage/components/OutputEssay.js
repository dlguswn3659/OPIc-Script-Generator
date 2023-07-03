import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import Logo from "../../../assets/icons/logo.svg";
import OptionEssay from "./OptionEssay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SurveyListBox from "./SurveyListBox";
import HelpIcon from "../../../assets/icons/help.svg";
import ListIcon from "../../../assets/icons/list.svg";
import LeftArrow from "../../../assets/icons/left-arrow.svg";

const PageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.img`
  width: 106px;
  align-items: left;
`;

const ResponseContainer = styled.div`
  width: 100%;
  height: 451px;
  border-radius: 16px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  background-color: ${palette.white};
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: justified;
  color: ${palette.Black};
  padding: 50px 20px;
  text-align: left;
  position: relative;
  margin-top: 40px;
  overflow-y: auto;
`;

const ContainerHeader = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  top: 16px;
  display: flex;
  align-items: right;
  justify-content: space-between;
  // right: 20px;
`;

const CopyButton = styled.button`
  width: 24px;
  height: 24px;
  border: hidden;
  background-color: transparent;
  background-image: url(${CopyIcon});
`;

const OptionBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 26px;
  padding-bottom: 100px;
  margin-bottom: 30px;
`;

const OptionButton = styled.button`
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
`;

const TextInfoBox = styled.div`
  display: flex;
  justify-content: right;
`;

const TextInfoTitle = styled.div`
  height: 32px;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
`;

const TextInfoValue = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
`;

const InfoDivide = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${palette.darkest_green};
  margin: 8px;
`;

const IconButton = styled.button`
  width: 24px;
  height: 24px;
  border: hidden;
  margin-right: 3px;
  background-color: transparent;
`;

const IconButtonBox = styled.div`
  display: flex;
  margin: auto 0px;
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`;

const LeftButton = styled.button`
  height: 30px;
  background: transparent;
  border: 0px;
  display: flex;
  margin: auto 0px;
  width: 45px;
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const LanguageSwitchBox = styled.div`
  width: 66px;
  height: 20px;
  display: flex;
  border: 0.7px solid ${palette.darker_green};
`;

const LanSwitchButton = styled.button`
  width: 33px;
  height: 100%;
  background-color: ${palette.darker_green};
  color: ${palette.white};
  text-align: center;
  font-size: 8px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 400;
  border: hidden;
`;

const OutputEssay = ({
  response,
  responseKor,
  questions,
  answers,
  setGptResult,
  setGptResultKor,
}) => {
  const [text, setText] = useState("");
  const [textKor, setTextKor] = useState("");
  const [surveyListBoxShow, setSurveyListBoxShow] = useState(false);
  const [optionModalShow, setOptionModalShow] = useState(false);
  const [command, setCommand] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [langStatus, setLangStatus] = useState(0); // 0:eng, 1:kor;
  const languageList = [{ title: "ENG" }, { title: "한" }];
  const OptionList = [
    {
      title: "더 짧게",
      command: "+rewrite but with 15 less words in total word count.",
    },
    {
      title: "더 길게",
      command:
        "+rewrite but with 15 more words in total word count. +Feel free to add details that are not in the previous text. +Do not make the vocabulary or grammar any harder.",
    },
    {
      title: "더 쉽게",
      command:
        "+rewrite easier +Do not make longer or shorter. +Do not add new details. ",
    },
    {
      title: "더 어렵게",
      command:
        "+rewrite just a tiny bit harder in terms of sentence structure. +Do not make longer. +Do not add new details. +write in adult casual ton",
    },
    // {
    //   title: "더 창의적이게",
    //   command:
    //     "Can you make the above script more creative? I don't mind adding supplementary explanations or expressions based on the information I gave you, or adding your imagination to some extent.",
    // },
  ];

  useEffect(() => {
    var str = text.trim();

    const words = str.split(/\s+/);
    setWordCount(words.length);
  }, [optionModalShow, text]);
  useEffect(() => {
    setText(response);
    setTextKor(responseKor);
  }, [response]);

  const optionButtonOnClick = (idx) => {
    setOptionModalShow(true);
    setCommand(OptionList[idx].command);
  };

  const copyOnClick = () => {
    navigator.clipboard.writeText(text);
    toast.success("복사완료!");
  };

  return (
    <>
      {surveyListBoxShow ? (
        <SurveyListBox
          questions={questions}
          answers={answers}
          setSurveyListBoxShow={setSurveyListBoxShow}
        />
      ) : (
        <>
          {optionModalShow ? (
            <OptionEssay
              visible={setOptionModalShow}
              maskClosable={true}
              onClose={() => {
                setOptionModalShow(false);
              }}
              text={text}
              textKor={textKor}
              command={command}
              setOverwriting={setText}
              setTextKor={setTextKor}
            />
          ) : (
            <></>
          )}
          <PageHeader>
            <HeaderLeft>
              <LeftButton onClick={() => setGptResult("")}>
                <ArrowIcon src={LeftArrow} />
              </LeftButton>
              <LogoContainer
                src={Logo}
                onClick={() => (window.location.href = "/")}
              />
            </HeaderLeft>
            <IconButtonBox>
              {/* <IconButton style={{ backgroundImage: `url(${HelpIcon})` }} /> */}
              <IconButton
                onClick={() => setSurveyListBoxShow(true)}
                style={{ backgroundImage: `url(${ListIcon})` }}
              />
            </IconButtonBox>
          </PageHeader>
          <ResponseContainer>
            <ContainerHeader>
              <LanguageSwitchBox>
                {languageList.map((val, idx) => (
                  <>
                    {idx == langStatus ? (
                      <LanSwitchButton>{val.title}</LanSwitchButton>
                    ) : (
                      <LanSwitchButton
                        style={{
                          backgroundColor: palette.white,
                          color: palette.darker_green,
                        }}
                        onClick={() => setLangStatus(idx)}
                      >
                        {val.title}
                      </LanSwitchButton>
                    )}
                  </>
                ))}
              </LanguageSwitchBox>
              <CopyButton onClick={copyOnClick} />
            </ContainerHeader>
            <>{langStatus == 0 ? <>{text}</> : <>{textKor}</>}</>
          </ResponseContainer>
          <TextInfoBox>
            <TextInfoTitle>Word : </TextInfoTitle>
            <TextInfoValue>{wordCount}</TextInfoValue>
            <InfoDivide />
            <TextInfoTitle>예상 수준 : </TextInfoTitle>
            <TextInfoValue>NH</TextInfoValue>
          </TextInfoBox>
          <OptionBox>
            {OptionList.map((item, index) => (
              <OptionButton onClick={() => optionButtonOnClick(index)}>
                {item.title}
              </OptionButton>
            ))}
          </OptionBox>
          <ToastContainer position="top-center" autoClose={1000} />
        </>
      )}
    </>
  );
};

export default OutputEssay;
