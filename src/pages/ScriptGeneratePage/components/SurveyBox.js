import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";

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
  padding: 60px 0px 40px 0px;
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
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  background: transparent;
  border: 0px;
  margin-top: 100px;
`;

const SurveyBox = ({ questions }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [listAnswerIdx, setListAnswerIdx] = useState(-1);
  const [descriptionAnswer, setDescriptionAnswer] = useState("");

  return (
    <Container>
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
        >
          이전
        </LeftButton>
        <LeftButton
          onClick={() => {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
          }}
        >
          다음
        </LeftButton>
      </BottomBar>
    </Container>
  );
};

export default SurveyBox;
