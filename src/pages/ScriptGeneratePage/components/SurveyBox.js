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
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`;

const SurveyBox = ({ questions }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [listAnswerIdx, setListAnswerIdx] = useState(-1);
  const [descriptionAnswer, setDescriptionAnswer] = useState("");
  const [descriptionAnswerList, setDescriptionAnswerList] = useState([]);
  const [qnaMerge, setQnaMerge] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (questions?.length > 0) {
      let questionNum = questions?.length;
      let arr;
      (arr = []).length = questionNum;
      arr.fill("");
      setDescriptionAnswerList(arr);
    }
  }, [questions]);

  useEffect(() => {
    if (currentQuestionIdx > -1) {
      descriptionAnswerList[currentQuestionIdx] = descriptionAnswer;
    }
  }, [descriptionAnswer]);

  const SubmitOnClick = async (e) => {
    setGptResult("");
    setWaiting(true);
    e.preventDefault();

    let mergeSentence = "";
    questions?.map((item, idx) => {
      mergeSentence =
        mergeSentence +
        (idx + 1).toString() +
        ". " +
        item.question +
        " : " +
        descriptionAnswerList[idx] +
        "\n";
    });
    setQnaMerge(mergeSentence);
    console.log(mergeSentence);

    // test
    mergeSentence = `1. 거주 형태가 어떻게 되시나요? : 혼자 홍대에서 자취하고 있어요.
    2. 누구랑 거주하고 계시나요? : 혼자 살아요.
    3. 어디 지역에 사세요? : 마포구 홍대요.
    4. 그 지역은 뭐로 유명한가요? : 놀기 좋고 술집이 많아요.
    5. 이 지역에 얼마나 오래 사셨어요? : 이사온 지 3개월 됐어요.
    6. 이 집에서는 얼마나 자주 사셨나요? : 3개월이요.
    7. 이사를 많이 하셨어요? : 자주 한 편이에요.
    8. 집의 크기가 어떻게 되시나요? : 작은 원룸입니다.
    9. 집 구조가 어떻게 되나요? : 원룸인데 있을 건 다 있어서 편해요.
    10. 집의 분위기가 어떤가요? : 동네는 시끄러운데 우리 집은 조용해요.
    11. 집에 있는 주요 가구들을 간단하게 설명해주세요. : 냉장고, 세탁기 등은 기본 옵션이고 음악 연주하는 걸 좋아해서 기타나 피아노 같은 악기도 있어요.
    12. 집이 좋은 이유를 써주세요. : 주변에 뭐가 많고 교통이 편리해요.
    13. 집이 싫은 이유를 써주세요. : 집이 좁고 환기가 잘 안 돼요.
    14. 집의 특이사항이 있다면 써주세요. : 신설이에요.
    15. 집의 한줄평을 써주세요. : 좁지만 있을 건 다 있고 가성비가 좋아요.`
    setQnaMerge(mergeSentence)


    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Please translate these questions and responses to these questions to **English** . They are the following: \n\n" + mergeSentence + "\n\n\n(+ requirements : Your response script's form is '<START> {your **full** translate result including all questions and answers} <END>'. )"}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data.response);
      const text = data.response;
      const regex = /<START>(.*?)<END>/s;
      const parsedText = text.match(regex)[1];
      console.log(parsedText);

      const response2 = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `The answers to these questions are the details to my student David's house. Based on these details, can you write a script for David's OPIc Test? In a speech format, not in a dialogue format. He wants to get an IM score. The question to answer in the script is below.\n\n\n\n${parsedText}\n\n (+ requirements : Your response OPIC test script's form is '<START> {your OPIC test script} <END>'. )`}),
      });

      const data2 = await response2.json();
      if (response2.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response2.status}`)
        );
      }

      console.log(data2.response);
      const text2 = data2.response;
      const regex2 = /<START>(.*?)<END>/s;
      const parsedText2 = text2.match(regex2)[1];
      console.log(parsedText2);

      setGptResult(parsedText2);
      setWaiting(false);
      // setQuestion("");
    } catch (error) {
      console.error(error);
      // alert(error.message);
      setGptResult(error.message);
      setWaiting(false);
    }
  };

  return (
    <Container>
      {waiting && gptResult == "" ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {gptResult ? (
            <OutputEssay response={gptResult} />
          ) : (
            <>
              <NumStatus>
                {currentQuestionIdx + 1} of {questions?.length}
              </NumStatus>
              <QuestionSentence>
                {questions[currentQuestionIdx]?.question}
              </QuestionSentence>
              {questions[currentQuestionIdx]?.type == "descriptive_form" ? (
                <>
                  <QuestionSubSentence>
                    (자세히 설명해주세요)
                  </QuestionSubSentence>
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
                  style={
                    currentQuestionIdx == 0 ? { visibility: "hidden" } : {}
                  }
                >
                  <ArrowIcon src={LeftArrow} />
                </LeftButton>
                <LeftButton
                  onClick={(e) => {
                    currentQuestionIdx == questions?.length - 1
                      ? SubmitOnClick(e)
                      : setCurrentQuestionIdx(currentQuestionIdx + 1);
                    setDescriptionAnswer("");
                  }}
                >
                  <ButtonText>
                    {currentQuestionIdx == questions?.length - 1
                      ? "완료"
                      : "다음"}
                  </ButtonText>
                  <ArrowIcon src={RightArrow} />
                </LeftButton>
              </BottomBar>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SurveyBox;
