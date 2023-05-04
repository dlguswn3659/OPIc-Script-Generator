import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Logo from "../../../assets/icons/logo.svg";

const LogoBox = styled.img`
    width: 106px;
    margin-top: 290px;
`

const Loading = () => {
    return <>
    <LogoBox src={Logo}/>
    </>
}

export default Loading;