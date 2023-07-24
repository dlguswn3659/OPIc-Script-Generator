import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import Logo from "../../../assets/icons/logo.svg";
import OptionEssay from "./OptionEssay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import Help from "./Help";

const PageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;

const LogoContainer = styled.img`
  width: 106px;
  margin-top: 25px;
  align-items: left;
`;

const ResponseContainer = styled.div`
  width: 100%;
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
`;

const ContainerHeader = styled.div`
  width: 100%;
  position: absolute;
  top: 16px;
  display: flex;
  align-items: right;
  justify-content: right;
  right: 20px;
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

const Content1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
  margin-bottom: 5px;
  margin-top: 25px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.button`
  flex: 0 0 calc(33.33% - 10px);
  margin: 5px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  color: ${palette.darker_green};
  border: 1px solid ${palette.darker_green};
  background-color: ${palette.white};
  height: 28px;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const AnswerTextArea = styled.textarea`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.black};
  width: 100%;
  border-radius: 16px;
  border: 0px;
  margin: 10px 0px;
  padding: 20px 20px 40px 20px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  resize: none;
  outline: none;
`;

const CreateButton = styled.button`
  width: 167px;
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
  margin-top: 27px;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
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
  width: auto;
`;

const HelpButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${HelpIcon});
  border: hidden;
  // position absolute;
  // right: 0px;
`;

const DetailOptions = ({
  setDetailOptions,
  setCurrentQuestionIdx,
  questionLength,
  setDetailOptionsOn,
  savedResult,
  savedResultKor,
  setSavedResult,
  setSaveShow,
  setSavedResultKor,
}) => {
  const [length, setLength] = useState(1);
  const [level, setLevel] = useState(2);
  const [speech, setSpeech] = useState(0);
  const [style, setStyle] = useState("");
  const [helpOn, setHelpOn] = useState(false);

  useEffect(() => {}, [savedResult]);

  const lengthList = [
    {
      name: "짧게",
      id: "short",
      prompt: `+Requirements: Write the response above to be within 40-80 words. Use the word "I". Do not change the vocabulary level.`,
    },
    {
      name: "보통",
      id: "reg",
      prompt: `+Requirements: Write the response above to be within 100-150 words. Use the word "I". You are free to add your own creative information if needed. Do not change the vocabulary level.`,
    },
    {
      name: "길게",
      id: "long",
      prompt: `+Requirements: Write the response above to be within 200-300 words. Use the word "I". You are free to add your own creative information if needed. Do not change the vocabulary level.`,
    },
  ];

  const levelList = [
    {
      name: "NH",
      id: "NH",
      prompt: `+Write this script with the following literary restrictions:
      Vocabulary: stick to a vocabulary pool of a foreigner who barely knows how to speak english.
      Fluency:  Can only respond in short sentences.
      Comprehension: Sometimes doesn't understand the question too clearly. About 70% comprehension.
      Word count: Limit the script again to 50 words.`,
    },
    {
      name: "IL",
      id: "IL",
      prompt: `+Write this script with the following literary restrictions:
      Vocabulary: stick to a vocabulary pool of a 2nd grader
      Fluency: A foreign adult student who has been learning english for about 2 years.
      Comprehension: Understand and respond to straightforward questions, statements, and short conversations on familiar topics.
      Word count: Limit the script again to 100 words.`,
    },
    {
      name: "IM",
      id: "IM",
      prompt: `+Write this script with the following literary restrictions:
      Vocabulary: stick to a vocabulary pool of a 4th grader.
      Fluency: A foreign adult student who has been learning english for about 3 years.
      Comprehension: Understand and respond to straightforward questions, statements, and short conversations on familiar topics.
      Word count: Limit the script again to 150 words.`,
    },
    {
      name: "IH",
      id: "IH",
      prompt: `+Write this script with the following literary restrictions:
      Vocabulary: stick to a vocabulary pool of a 6th grader.
      Fluency: A foreign adult student who has been learning english for about 5 years.
      Comprehension: Understand and respond to questions well in most cases.
      Word count: Limit the script again to 250 words.`,
    },
    {
      name: "AL",
      id: "AL",
      prompt: `+Write this script with the following literary restrictions:
      Vocabulary: stick to a vocabulary pool of an adult conversation.
      Fluency: quite fluent
      Comprehension: Understand and respond to questions well.
      Word count: Limit the script again to 250 words.`,
    },
  ];

  const speechList = [
    {
      name: "OPIc 캐쥬얼",
      id: "casual",
      prompt: `+Write casually but adult casual.`,
    },
    {
      name: "포멀",
      id: "formal",
      prompt: `+Write formally like you are talking in an interview.`,
    },
    {
      name: "담백하게",
      id: "plainly",
      prompt: `+Write in easy simple clean sentences.`,
    },
    {
      name: "콩글리쉬",
      id: "konlish",
      prompt: `+Write like a Korean with broken English.`,
    },
    {
      name: "유치원생",
      id: "preschooler",
      prompt: `+Write like a preschooler`,
    },
    {
      name: "MZ힙스터",
      id: "MZhipster",
      prompt: `+Write like a MZ hipster.`,
    },
    {
      name: "MZ캐주얼",
      id: "MZhipster",
      prompt: `+Write casually.`,
    },
  ];

  const createOnClick = () => {
    setDetailOptions({
      length: lengthList[length],
      level: levelList[level],
      speech: speechList[speech],
      style:
        speech == 0
          ? "write like a/an '" + style + "'"
          : "write like a/an '" + style + "', but limit to 200 words.",
    });
  };

  const prevOnClick = () => {
    if (setDetailOptionsOn) {
      setDetailOptionsOn(false);
    } else {
      setCurrentQuestionIdx(questionLength - 1);
    }
  };

  const nextOnClick = () => {
    setSaveShow(true);
  };

  return (
    <>
      {helpOn ? (
        <Help
          visible={setHelpOn}
          maskClosable={true}
          onClose={() => {
            setHelpOn(false);
          }}
        />
      ) : (
        <></>
      )}
      <HeaderBox>
        <LeftButton onClick={prevOnClick}>
          <ArrowIcon src={LeftArrow} />
        </LeftButton>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "0px",
            alignItems: "right",
          }}
        >
          <HelpButton onClick={() => setHelpOn(true)} />
          {savedResult?.length > 0 ? (
            <LeftButton onClick={nextOnClick}>
              <ArrowIcon src={RightArrow} />
            </LeftButton>
          ) : (
            <></>
          )}
        </div>
      </HeaderBox>
      <ResponseContainer>
        <ContainerHeader></ContainerHeader>
        <Content1>길이</Content1>
        <Container>
          {lengthList.map((item, idx) => (
            <>
              {length == idx ? (
                <Column
                  style={{
                    backgroundColor: palette.darker_green,
                    color: palette.white,
                  }}
                >
                  {item.name}
                </Column>
              ) : (
                <Column onClick={() => setLength(idx)}>{item.name}</Column>
              )}
            </>
          ))}
        </Container>
        <Content1>레벨</Content1>
        <Container>
          {levelList.map((item, idx) => (
            <>
              {level == idx ? (
                <Column
                  style={{
                    backgroundColor: palette.darker_green,
                    color: palette.white,
                  }}
                >
                  {item.name}
                </Column>
              ) : (
                <Column onClick={() => setLevel(idx)}>{item.name}</Column>
              )}
            </>
          ))}
        </Container>
        <Content1>말투</Content1>
        <Container>
          {speechList.map((item, idx) => (
            <>
              {speech == idx ? (
                <Column
                  style={{
                    backgroundColor: palette.darker_green,
                    color: palette.white,
                  }}
                >
                  {item.name}
                </Column>
              ) : (
                <Column onClick={() => setSpeech(idx)}>{item.name}</Column>
              )}
            </>
          ))}
        </Container>
        <Content1>스타일</Content1>
        <AnswerTextArea />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CreateButton onClick={createOnClick}>생성하기</CreateButton>
        </div>
      </ResponseContainer>
    </>
  );
};

export default DetailOptions;
