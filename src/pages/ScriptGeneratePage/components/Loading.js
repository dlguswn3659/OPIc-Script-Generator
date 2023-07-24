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

const LoadingComment = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 700;
`;

const WarningComment = styled.div`
  margin-top: 40px;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
`;

const Loading = () => {
  return (
    <>
      <LogoBox src={Logo} />
      <LottieContainer>
        <Lottie animationData={animation} loop={true} play />
      </LottieContainer>
      <LoadingComment>
        Chat GPT 서버 상황에 따라 1~3분 정도 걸릴 수 있습니다.
      </LoadingComment>
      <WarningComment>
        +) 베타서비스이기 때문에 에러가 종종 발생할 수 있습니다!
        <br />
        에러 안내가 뜨거나 원하지 않는 결과가 나왔다면
        <br />
        위의 뒤로가기 버튼을 누른 뒤 다시 생성하기 버튼을 눌러주세요 :)
      </WarningComment>
    </>
  );
};

export default Loading;
