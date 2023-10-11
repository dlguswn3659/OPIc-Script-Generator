import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CloseIcon from "../../../assets/icons/close.svg";
import PropTypes from "prop-types";
import { getStudent } from "../../../utils/api/quizlet";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 20px;
  background-color: ${palette.light_bg};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
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
  margin: 20px auto;
  width: 200px;
`;

const Header1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 30px;
  font-weight: 900;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
  margin-bottom: 7px;
`;

const Content1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 900;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 15px;
  color: ${palette.darkest_green};
`;

const CloseButton = styled.button`
  width: 8px;
  height: 8px;
  border: hidden;
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: transparent;
  background: url(${CloseIcon}) no-repeat center center/cover;
`;

const GategoryCardContainer = styled.div`
  width: 100%;
  align-items: center;
  padding: 3px 0px;
`;

const CategoryBox = styled.button`
  width: 100%;
  height: 78px;
  position: relative;
  border-radius: 16px;
  background-color: ${palette.white};
  color: ${palette.darkest_green};
  text-align: left;
  padding: 29px;
  border: 0px;
  position: relative;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  margin: 4px 0px;
  text-align: left;
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--darkest-green, #02362a);
  font-family: Noto Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 29.184px;
  &:hover {
    // border: 5px solid ${palette.darker_green};
    box-shadow: inset 0 0 0 5px ${palette.darker_green},
      0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
        #02362a40;
    background-color: ${palette.darker_green};
  }
`;

const ProfileListModal = ({
  className,
  onClose,
  maskClosable,
  visible,
  setCurrentStudent,
}) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const getStudentResult = await getStudent().then((res) => {
        setStudents(res);
      });
    })();
  }, []);

  const startOnClick = () => {
    window.location.href = "/generate";
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const switchProfileOnClick = (studentInfo) => {
    setCurrentStudent(
      studentInfo?.name,
      studentInfo?.docsLink,
      studentInfo?.quizletCount,
      studentInfo?.email,
      studentInfo?.phoneNum,
    );
    onClose();
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
          <Container>
            <CloseButton onClick={onClose} />
            <ContentBox>
              <Header1>HI TEACHER,</Header1>
              <Content1>Who are you teaching today?</Content1>
              <GategoryCardContainer>
                {students?.map((student, idx) => (
                  <CategoryBox
                    onClick={() => {
                      switchProfileOnClick(student);
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {student.name}
                    </div>
                  </CategoryBox>
                ))}
              </GategoryCardContainer>
            </ContentBox>
          </Container>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
};

ProfileListModal.propTypes = {
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
  min-height: 750px;
  max-width: 600px;
  // max-height: 300px;
  // transform: translateX(0%);
  margin: 0 auto;
  border: none;
  border-radius: 20px 20px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
  left: 50%;
  transform: translate(-50%, 0%);
  //bottom: 0;
  min-height: 100vh;
  top: 50px;
`;

export default ProfileListModal;
