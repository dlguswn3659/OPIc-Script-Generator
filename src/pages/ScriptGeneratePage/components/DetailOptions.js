import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import Logo from "../../../assets/icons/logo.svg";
import OptionEssay from "./OptionEssay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const DetailOptions = ({ setDetailOptions }) => {
  const [length, setLength] = useState(1);
  const [level, setLevel] = useState(5);
  const [speech, setSpeech] = useState(-1);
  const [style, setStyle] = useState("");

  const lengthList = [
    {
      name: "짧게",
      id: "short",
    },
    {
      name: "보통",
      id: "reg",
    },
    {
      name: "길게",
      id: "long",
    },
  ];

  const levelList = [
    {
      name: "NH",
      id: "NH",
    },
    {
      name: "NM",
      id: "NM",
    },
    {
      name: "IL",
      id: "IL",
    },
    {
      name: "IM",
      id: "IM",
    },
    {
      name: "IH",
      id: "IH",
    },
    {
      name: "AL",
      id: "AL",
    },
  ];

  const speechList = [
    {
      name: "캐쥬얼",
      id: "casual",
    },
    {
      name: "포멀",
      id: "formal",
    },
    {
      name: "담백하게",
      id: "plainly",
    },
  ];

  const createOnClick = () => {
    setDetailOptions({
      length: lengthList[length],
      level: levelList[level],
      speech: speechList[speech],
      style: style,
    });
  };

  return (
    <>
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
