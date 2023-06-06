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

const DetailOptions = ({ setDetailOptions }) => {
  const [length, setLength] = useState("reg");
  const [level, setLevel] = useState("IM");
  const [speech, setSpeech] = useState("Casual");
  const [style, setStyle] = useState("");

  const createOnClick = () => {
    setDetailOptions({
      length: length,
      level: level,
      speech: speech,
      style: style,
    });
  };

  return (
    <>
      <ResponseContainer>
        <ContainerHeader></ContainerHeader>
        <div>길이</div>
      </ResponseContainer>
    </>
  );
};

export default DetailOptions;
