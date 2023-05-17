import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Logo from "../../assets/icons/logo.svg";

const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

const CenterBox = styled.div`
  margin: 250px auto;
  display: grid;
  width: 50%;
  min-width: 208px;
`;

const LogoImage = styled.img`
  width: 208px;
  margin: auto;
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
  margin-top: 20px;
`;

const IntroPage = () => {
  const startOnClick = () => {
    window.location.href = "/generate";
  };
  return (
    <Container>
      <CenterBox>
        <LogoImage src={Logo} />
        <StartButton onClick={startOnClick}>시작하기</StartButton>
      </CenterBox>
    </Container>
  );
};

export default IntroPage;
