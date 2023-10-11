import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  background-color: ${palette.light_bg};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;
`;

const RecordCard = () => {
  return <Container></Container>;
};

export default RecordCard;
