import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CloseIcon from "../../../assets/icons/close.svg";
import "react-toastify/dist/ReactToastify.css";

const InnerContainer = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  width: 8px;
  height: 8px;
  border: hidden;
  background-color: transparent;
  background: url(${CloseIcon}) no-repeat center center/cover;
`;

function Feedback({ className, onClose, maskClosable, visible }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
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
            <ContainerHeader
              style={{ justifyContent: "right", marginBottom: "20px" }}
            >
              <CloseButton onClick={onClose} />
            </ContainerHeader>
            <div style={{ position: "relative", width: "!00%" }}></div>
          </InnerContainer>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

Feedback.propTypes = {
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
  height: 450px;
  max-width: 600px;
  padding: 16px;
  margin: 0 auto;
  border: none;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default Feedback;
