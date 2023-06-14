import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import CopyIcon from "../../../assets/icons/copy.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InnerContainer = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const ResponseContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  // box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
  //   #02362a40;
  background-color: ${palette.white};
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: justified;
  color: ${palette.Black};
  padding: 0px 20px;
  text-align: left;
  position: relative;
  margin-top: 0px;
  overflow-y: auto;
  z-index: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CopyButton = styled.button`
  width: 24px;
  height: 24px;
  border: hidden;
  background-color: transparent;
  background-image: url(${CopyIcon});
`;

const CloseButton = styled.button`
  width: 8px;
  height: 8px;
  border: hidden;
  background-color: transparent;
  background: url(${CloseIcon}) no-repeat center center/cover;
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
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
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
`;

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
  margin-bottom: 30px;
`;

const Gradient = styled.div`
  position: relative;
  z-index: 2; 
  margin-top: -50px;
  height: 50px; /* 그라데이션의 높이 조정 */
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

const Content1 = styled.div`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.darkest_green};
`

const DivideLine = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${palette.darkest_green};
    margin-top: 20px;
`

const ScrollBox = styled.div`
    min-height: 80px;
    padding-bottom: 20px;
    max-height: 245px;
    width: 100%;
    overflow-y: auto;
    position: relative;
`

function OptionEssay({
  className,
  onClose,
  maskClosable,
  visible,
  text,
  command,
  setOverwriting,
}) {
  const [oldResponse, setOldResponse] = useState("");
  const [newResponse, setNewResponse] = useState(`
  I usually plan my visit to the movie theater a few days in advance. I prefer to book tickets online so that I can get the best seats and avoid long queues. Before the movie starts, I like to explore the theater and buy snacks. I usually get popcorn, candy, and a soda. During the movie, I like to focus on the content and take notes of my thoughts and reactions. I also like to observe the audience and their reactions to the movie. After the movie, I like to talk about it with the people I came with and review the content. We usually discuss the plot, characters, and cinematography. We also talk about the music, special effects, and other elements of the movie. I usually like to stay in the theater for a few minutes after the movie ends to reflect on what I just watched. 
  
  Once I'm out of the theater, I usually go to a nearby cafe or restaurant to discuss the movie further. We usually talk about the movie some more and share our opinions. We also compare our reactions to the movie with those of the other people in the theater. We also talk about the actors, the director, and the production team. We also discuss the themes and messages of the movie and how it made us feel. 
  
  After the discussion, I usually like to take a walk and reflect on the movie. I think about the characters, the plot, and the cinematography. I also think about the themes and messages of the movie and how it made me feel. I usually end the movie-watching experience by going home and writing down my thoughts and reactions in a journal. `);
  const [waiting, setWaiting] = useState(false);
  const [addedCommand, setAddedCommand] = useState("");

  const OptionList = [
    { title: "더 짧게", command: "Can you make the above script shorter?" },
    { title: "더 길게", command: "Can you make the above script longer?" },
    { title: "더 쉽게", command: "Can you make the above script easier?" },
    {
      title: "더 어렵게",
      command:
        "Can you make the above script more challenging, at an advanced level?",
    },
    {
      title: "더 창의적이게",
      command:
        "Can you make the above script more creative? I don't mind adding supplementary explanations or expressions based on the information I gave you, or adding your imagination to some extent.",
    },
  ];

  useEffect(() => {}, [oldResponse]);

  useEffect(() => {
    setOldResponse(text);
  }, [text]);

  useEffect(() => {
    setAddedCommand(command);
  }, [command]);

  // useEffect(() => {
  //   (async () => {
  //     if (addedCommand != "") {
  //       setWaiting(true);
  //       const response = await fetch(
  //         `${process.env.REACT_APP_EC2_IP_ADDRESS}/ask`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             prompt: `${oldResponse}\n\n\n${addedCommand}\n\n(+ requirements : Your response script's form is '<START> {your OPIc test script} <END>'. )`,
  //           }),
  //         }
  //       );

  //       const data = await response.json();
  //       if (response.status !== 200) {
  //         throw (
  //           data.error ||
  //           new Error(`request failed with status ${response.status}`)
  //         );
  //       }

  //       console.log(data.response);
  //       const text = data.response;
  //       const regex = /<START>(.*?)<END>/s;
  //       const parsedText = text.match(regex)[1];
  //       console.log(parsedText);
  //       setNewResponse(parsedText);

  //       setAddedCommand("");
  //       setWaiting(false);
  //     }
  //   })();
  // }, [addedCommand]);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const cancelOnClick = () => {
    onClose();
  };

  const optionButtonOnClick = (idx) => {
    setWaiting(true);
    setAddedCommand(OptionList[idx].command);
  };

  const overwriteOnClick = () => {
    setOverwriting(newResponse);
    setOldResponse(newResponse);
    setNewResponse("");
  };

  const deleteOnClick = () => {
    setNewResponse("");
    setOldResponse("");
  };

  const copyOnClick = () => {
    navigator.clipboard.writeText(oldResponse);
    toast.success("복사완료!");
  };

  const copyEditOnClick = () => {
    navigator.clipboard.writeText(newResponse);
    toast.success("복사완료!");
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
            <>
              {waiting ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <ContainerHeader style={{justifyContent:"right", marginBottom:"20px"}}>
                    <CloseButton onClick={onClose} />
                  </ContainerHeader>
                  <div style={{ position: "relative", width: "!00%" }}>
                    <ResponseContainer>
                      <ContainerHeader>
                        <Content1>원본</Content1>
                        <CopyButton onClick={copyOnClick} />
                      </ContainerHeader>
                      <ScrollBox>
                      {oldResponse}
                      </ScrollBox>
                      <Gradient />
                      <DivideLine />
                      <br />
                      <ContainerHeader>
                      <Content1>수정본</Content1>
                      <CopyButton onClick={copyEditOnClick} />
                      </ContainerHeader>
                      <ScrollBox>
                      {newResponse}
                      </ScrollBox>
                      <Gradient />
                    </ResponseContainer>
                    
                  </div>
                  <OptionBox>
                    {OptionList.map((item, index) => (
                      <OptionButton onClick={() => optionButtonOnClick(index)}>
                        {item.title}
                      </OptionButton>
                    ))}
                  </OptionBox>
                  <FullButton onClick={overwriteOnClick}>덮어 쓰기</FullButton>
                  <DeleteButton onClick={deleteOnClick}>삭제</DeleteButton>
                </>
              )}
            </>
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
  min-height: 750px;
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
  //bottom: 0;
  min-height: 100vh;
  top: 50px;
`;

export default OptionEssay;
