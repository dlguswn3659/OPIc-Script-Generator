import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CloseIcon from "../../../assets/icons/close.svg";
import "react-toastify/dist/ReactToastify.css";
import Rating from "react-rating";
import StarFull from "../../../assets/icons/star-full.png";
import StarEmpty from "../../../assets/icons/star-empty.png";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firestore from "../../../firebase";

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

const BigText = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  color: ${palette.darkest_green};
`;

const SmallText = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  color: ${palette.darkest_green};
  margin: 5px 0px;
`;

const StarImg = styled.img`
  width: 24px;
  margin: 5px;
`;

const FeedbackTextArea = styled.textarea`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.black};
  width: 100%;
  border-radius: 16px;
  border: 0px;
  margin: 10px 0px;
  padding: 20px 20px 40px 20px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${palette.placeholder};
  }
`;

const EmailHeader = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${palette.darkest_green};
  text-align: left;
`;

const SendButton = styled.button`
  height: 41px;
  width: 167px;
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
  margin-top: 5px;
`;

const BelowText = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${palette.darkest_green};
  margin: 10px;
`;

function Feedback({
  className,
  onClose,
  maskClosable,
  visible,
  setConfettiVisible,
}) {
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setRate(rate);
  }, [description, email]);

  const onMaskClick = (e) => {
    setConfettiVisible(false);
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const sendOnClick = async () => {
    try {
      // Feedback 컬렉션 참조
      const feedbackRef = collection(firestore, "feedback");

      // 현재 시간을 구합니다.
      const currentTime = new Date();

      // 자동 ID로 생성한 문서를 추가하고 데이터 넣기
      const newFeedbackRef = await addDoc(feedbackRef, {
        rate: rate,
        description: description,
        email: email,
        datetime: currentTime, // 현재 시간을 datetime 필드에 추가합니다.
      });

      console.log("Feedback 데이터가 성공적으로 추가되었습니다.");
      setConfettiVisible(true);

      alert("피드백이 성공적으로 전송되었습니다. 감사합니다!");
      onClose();
    } catch (error) {
      alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      console.error("Feedback 데이터 추가에 실패했습니다:", error);
      setConfettiVisible(false);
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
              <CloseButton
                onClick={() => {
                  setConfettiVisible(false);
                  onClose();
                }}
              />
            </ContainerHeader>
            <div style={{ position: "relative", width: "100%" }}>
              <BigText>OPICScript 어떠셨나요?</BigText>
              <SmallText>피드백 남겨주시면 큰 도움이 될겁니다!</SmallText>
              <Rating
                value={rate}
                initialRating={rate}
                key={rate}
                onChange={(newValue) => {
                  setRate(newValue);
                }}
                emptySymbol={<StarImg src={StarEmpty} className="icon" />}
                fullSymbol={<StarImg src={StarFull} className="icon" />}
              />
              <FeedbackTextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="피드백 적어주시면 감사하겠습니다."
              />
              <EmailHeader>이메일 주소(선택):</EmailHeader>
              <FeedbackTextArea
                placeholder="gary_kim@opicscript.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  paddingBottom: "20px",
                  display: "flex",
                  lineHeight: "normal",
                  height: "60px",
                }}
              />
              <SendButton onClick={sendOnClick}>보내기</SendButton>
              <BelowText>
                이메일을 공유해주시면 앱 업데이트 시 소식을 받아보실 수
                있습니다.
              </BelowText>
            </div>
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
  min-height: 450px;
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
