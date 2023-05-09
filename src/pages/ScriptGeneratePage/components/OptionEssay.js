import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import Loading from "./Loading";

const InnerContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const ResponseContainer = styled.div`
  width: 100%;
  height: 400px;
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
  margin-bottom: 20px;
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

const FullButton = styled.button`
  width: 100%;
  height: 56px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px #02362A40;
  border: hidden;
  background-color: ${palette.white};
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.t_red};
  border-radius: 16px;
`

const DeleteButton = styled.button`
  width: 160px;
  height: 30px;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  color: #01191380;
  background-color: transparent;
  border: hidden;
  margin-top: 5px;
  text-decoration: underline solid #01191380;
`




function OptionEssay({
  className,
  onClose,
  maskClosable,
  visible,
  text,
  buttonText,
}) {
  const [response, setResponse] = useState("");
  const [waiting, setWaiting] = useState(false);

  const OptionList = [
    { title: "더 짧게", command: "" },
    { title: "더 길게", command: "" },
    { title: "더 쉽게", command: "" },
    { title: "더 어렵게", command: "" },
  ];

  useEffect(()=>{
    setResponse(text);
  }, [text])

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const cancelOnClick = () => {
    onClose();
  };

  const optionButtonOnClick = () => {
    setWaiting(true)
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable && onMaskClick}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <InnerContainer>
            <>{waiting?<>
            <Loading />
            </>:<>
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
            <FullButton>덮어 쓰기</FullButton>
            <DeleteButton>삭제</DeleteButton>
            </>}</>
            
          </InnerContainer>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

OptionEssay.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  width: 100%;
  height: 750px;
  max-width: 600px;
  // max-height: 300px;
  padding: 16px;
  // transform: translateX(0%);
  margin: 0 auto;
  border: none;
  border-radius: 20px 20px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 0;
`;

export default OptionEssay;
