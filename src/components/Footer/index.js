import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Logo from "../../assets/icons/logo.svg";

const Container = styled.div`
  width: 100%;
  background-color: ${palette.light_gray};
  color: ${palette.black};
  padding: 40px 60px;
  text-align: left;
`;

const LogoBox = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;

const CopyrightBox = styled.div`
  font-size: 10px;
  margin-bottom: 3px;
`;

const GoalBox = styled.div`
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 5px;
  line-height: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <LogoBox src={Logo} />
      <GoalBox>
        오픽 영어시험 (OPIc)을 준비하는 학생들을 위해
        <br />
        시험 답변을 인공지능으로(ChatGPT) 생성해주는 웹사이트
      </GoalBox>

      <CopyrightBox>대표자 : 정현수 | 대표전화 : 010-2713-7397</CopyrightBox>
      <CopyrightBox>
        copyright © 2023 OPICSCRIPT Inc. All Rights Reserved | Email :
        medav32@gmail.com
      </CopyrightBox>
    </Container>
  );
};

export default Footer;
