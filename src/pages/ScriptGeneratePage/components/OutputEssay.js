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

const OutputEssay = ({ response }) => {
  const [text, setText] = useState("");
  const [optionModalShow, setOptionModalShow] = useState(false);
  const [command, setCommand] = useState("");
  const OptionList = [
    { title: "더 짧게", command: "Can you make the above script shorter?" },
    { title: "더 길게", command: "Can you make the above script longer?" },
    { title: "더 쉽게", command: "Can you make the above script easier?" },
    {
      title: "더 어렵게",
      command:
        "Can you make the above script more challenging, at an advanced level?",
    },
    {
      title: "더 창의적이게",
      command:
        "Can you make the above script more creative? I don't mind adding supplementary explanations or expressions based on the information I gave you, or adding your imagination to some extent.",
    },
  ];

  useEffect(() => {}, [optionModalShow, text]);
  useEffect(() => {
    setText(response);
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
      {optionModalShow ? (
        <OptionEssay
          visible={setOptionModalShow}
          maskClosable={true}
          onClose={() => {
            setOptionModalShow(false);
          }}
          text={text}
          command={command}
          setOverwriting={setText}
        />
      ) : (
        <></>
      )}
      <PageHeader>
        <LogoContainer src={Logo} />
      </PageHeader>
      <ResponseContainer>
        <ContainerHeader>
          <CopyButton onClick={copyOnClick} />
        </ContainerHeader>
        {text}
      </ResponseContainer>
      <OptionBox>
        {OptionList.map((item, index) => (
          <OptionButton onClick={() => optionButtonOnClick(index)}>
            {item.title}
          </OptionButton>
        ))}
      </OptionBox>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default OutputEssay;
