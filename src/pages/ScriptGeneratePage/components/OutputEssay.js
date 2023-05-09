import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import Logo from "../../../assets/icons/logo.svg";
import OptionEssay from "./OptionEssay";

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
  margin-bottom: 100px;
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
  const [optionModalShow, setOptionModalShow] = useState(false);
  const OptionList = [
    { title: "더 짧게", command: "" },
    { title: "더 길게", command: "" },
    { title: "더 쉽게", command: "" },
    { title: "더 어렵게", command: "" },
  ];

  useEffect(() => {}, [optionModalShow]);

  const optionButtonOnClick = () => {
    setOptionModalShow(true);
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
          text={response}
        />
      ) : (
        <></>
      )}
      <PageHeader>
        <LogoContainer src={Logo} />
      </PageHeader>
      <ResponseContainer>
        <ContainerHeader>
          <CopyButton />
        </ContainerHeader>
        {response}
      </ResponseContainer>
      <OptionBox>
        {OptionList.map((item, index) => (
          <OptionButton onClick={optionButtonOnClick}>
            {item.title}
          </OptionButton>
        ))}
      </OptionBox>
    </>
  );
};

export default OutputEssay;
