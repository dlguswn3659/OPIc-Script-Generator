import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";
import OutputEssay from "./OutputEssay";
import Loading from "./Loading";

const Container = styled.div`
  width: 100%;
  padding: 0px 23px;
  min-height: 100vh;
`;

const NumStatus = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.darkest_green};
`;

const QuestionSentence = styled.div`
  width: 100%;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  margin-top: 150px;
  color: ${palette.darkest_green};
`;

const QuestionSubSentence = styled.div`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.darkest_green};
`;

const AnswerTextArea = styled.textarea`
  font-family: Noto Sans KR;
  font-size: 18px;
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
`;

const BottomBar = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  // position: absolute;
  // bottom: 0px;
`;

const LeftButton = styled.button`
  height: 30px;
  background: transparent;
  border: 0px;
  margin-top: 100px;
  display: flex;
`;

const ButtonText = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  margin: auto 5px;
  color: ${palette.darkest_green};
`

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`

const SurveyBox = ({ questions }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [listAnswerIdx, setListAnswerIdx] = useState(-1);
  const [descriptionAnswer, setDescriptionAnswer] = useState("");
  const [descriptionAnswerList, setDescriptionAnswerList] = useState([]);
  const [qnaMerge, setQnaMerge] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(()=>{
    if(questions?.length > 0){
      let questionNum = questions?.length;
      let arr;
      (arr = []).length = questionNum;
      arr.fill("");
      setDescriptionAnswerList(arr);
    }
  }, [questions])

  useEffect(()=>{
    if(currentQuestionIdx > -1){
      descriptionAnswerList[currentQuestionIdx] = descriptionAnswer;
    }
  }, [descriptionAnswer])

  const SubmitOnClick = async (e) => {
    setGptResult("");
    setWaiting(true);
    e.preventDefault();
    
    let mergeSentence = ""
    questions?.map((item, idx)=>{
      mergeSentence = mergeSentence + (idx+1).toString() + ". " + item.question + " : " + descriptionAnswerList[idx] + "\n"
    })
    setQnaMerge(mergeSentence)
    console.log(mergeSentence)
  }

  const handleSubmit = async (e) => {
    setGptResult("");
    setWaiting(true);
    e.preventDefault();

    // try {
    //   const response = await fetch("http://localhost:5000/ask", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt: "Please translate these questions and responses to these questions to English. They are the following: \n\n" + qnaMerge }),
    //   });

    //   const data = await response.json();
    //   if (response.status !== 200) {
    //     throw (
    //       data.error ||
    //       new Error(`request failed with status ${response.status}`)
    //     );
    //   }

    //   console.log(data.response);
    //   const text = data.response;
    //   const regex = /<START>(.*?)<END>/s;
    //   const parsedText = text.match(regex)[1];
    //   console.log(parsedText);
    //   setGptResult(parsedText);
    //   setWaiting(false);
    //   // setQuestion("");
    // } catch (error) {
    //   console.error(error);
    //   // alert(error.message);
    //   setGptResult(error.message);
    //   setWaiting(false);
    // }
  };

  return (
    <Container>{waiting && gptResult == "" ? <>
    <Loading />
    </>:<>
    {
      gptResult ? <OutputEssay /> :<>
      <NumStatus>
        {currentQuestionIdx + 1} of {questions?.length}
      </NumStatus>
      <QuestionSentence>
        {questions[currentQuestionIdx]?.question}
      </QuestionSentence>
      {questions[currentQuestionIdx]?.type == "descriptive_form" ? (
        <>
          <QuestionSubSentence>(자세히 설명해주세요)</QuestionSubSentence>
          <AnswerTextArea
            placeholder={questions[currentQuestionIdx]?.placeholder}
            onChange={(e) => {
              setDescriptionAnswer(e.target.value);
            }}
            value={descriptionAnswer}
          />
        </>
      ) : (
        <></>
      )}
      <BottomBar>
        <LeftButton
          onClick={() => {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
          }}
          style={currentQuestionIdx==0?{visibility: "hidden"}:{}}
        >
          <ArrowIcon src={LeftArrow}/>
        </LeftButton>
        <LeftButton
          onClick={(e) => {
            currentQuestionIdx == questions?.length - 1 ? SubmitOnClick(e):
            setCurrentQuestionIdx(currentQuestionIdx + 1);
            setDescriptionAnswer("");
          }}
        >
          <ButtonText>
          {currentQuestionIdx == questions?.length - 1 ? "완료" : "다음"}
          </ButtonText>
          <ArrowIcon src={RightArrow}/>
        </LeftButton>
      </BottomBar></>}</>
}
    </Container>
  );
};

export default SurveyBox;
