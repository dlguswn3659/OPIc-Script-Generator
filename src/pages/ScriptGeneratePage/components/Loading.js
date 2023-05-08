import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Logo from "../../../assets/icons/logo.svg";
import animation from "../../../assets/lottie/loading-gray.json";
import Lottie from "react-lottie-player";

const LogoBox = styled.img`
  width: 106px;
  margin-top: 290px;
`;
const LottieContainer = styled.div`
  width: 40px;
  margin: 0px auto;
  padding-top: 19px;
  margin-bottom: 2px;
`;

const Loading = () => {
  return (
    <>
      <LogoBox src={Logo} />
      <LottieContainer>
        <Lottie animationData={animation} loop={true} play />
      </LottieContainer>
    </>
  );
};

export default Loading;
