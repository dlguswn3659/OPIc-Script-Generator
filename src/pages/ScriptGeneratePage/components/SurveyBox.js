import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";
import OutputEssay from "./OutputEssay";
import Loading from "./Loading";
import DetailOptions from "./DetailOptions";

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
  font-weight: 400;
  line-height: 19px;
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
  margin-top: 100px;
  // position: absolute;
  // bottom: 0px;
`;

const LeftButton = styled.button`
  height: 30px;
  background: transparent;
  border: 0px;
  display: flex;
  margin: auto 0px;
  width: 80px;
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

const CenterButton = styled.button`
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  background-color: transparent;
  border: hidden;
  text-decoration-line: underline;
  color: ${palette.darkest_green};
`;

const SurveyBox = ({ questions, setSelectedMainQuestionIdx }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [listAnswerIdx, setListAnswerIdx] = useState(-1);
  const [descriptionAnswer, setDescriptionAnswer] = useState("");
  const [descriptionAnswerList, setDescriptionAnswerList] = useState([]);
  const [qnaMerge, setQnaMerge] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [detailOptions, setDetailOptions] = useState({});

  useEffect(() => {
    if (detailOptions?.length) {
      const fetchData = async () => {
        try {
          await SubmitOnClick(); // SubmitOnClick 함수 호출

          // Fetch 요청 및 데이터 처리 코드
        } catch (error) {
          console.error(error);
          setGptResult(error.message);
          setWaiting(false);
        }
      };

      fetchData();
    }
  }, [detailOptions]);

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

    try {
      const response = await fetch(
        `${process.env.REACT_APP_EC2_IP_ADDRESS}/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "Please translate these questions and responses to these questions to **English** . They are the following: \n\n" +
              mergeSentence +
              "\n\n\n(+ requirements : Your response script's form is '<START> {your **full** translate result including all questions and answers} <END>'. )",
          }),
        }
      );

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

      const response2 = await fetch(
        `${process.env.REACT_APP_EC2_IP_ADDRESS}/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Can you write a script for interviewee's OPIc Test? In a speech format, not in a dialogue format. He wants to get an IM score. Using the information obtained from this question and answer at below.\n\n\n\n${parsedText}\n\n (+ requirements : formulate a 200-300 word script in the form of an essay that aims to obtain IH level in an OPIC test. You are free to add your own creative information and make sure the resulting paragraph is concise, logically correct, grammatically correct, unique and mostly engaging to the reader. Your response OPIC test script's form must be '<START> {your OPIC test script} <END>'. )`,
          }),
        }
      );

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
                  <AnswerTextArea
                    placeholder={questions[currentQuestionIdx]?.placeholder}
                    onChange={(e) => {
                      setDescriptionAnswer(e.target.value);
                    }}
                    value={descriptionAnswer}
                  />
                  <QuestionSubSentence>
                    (자세히 설명해주세요, 해당 되지않은 질문은 “건너뛰기” 하시면
                    됩니다)
                  </QuestionSubSentence>
                </>
              ) : (
                <></>
              )}
              <BottomBar>
                <LeftButton
                  onClick={
                    currentQuestionIdx == 0
                      ? () => {
                          setSelectedMainQuestionIdx(-1);
                        }
                      : () => {
                          setCurrentQuestionIdx(currentQuestionIdx - 1);
                          setDescriptionAnswer(
                            descriptionAnswerList[currentQuestionIdx - 1]
                          );
                        }
                  }
                >
                  <ArrowIcon src={LeftArrow} />
                </LeftButton>
                <CenterButton
                  onClick={(e) => {
                    currentQuestionIdx == questions?.length - 1
                      ? SubmitOnClick(e)
                      : setCurrentQuestionIdx(currentQuestionIdx + 1);
                    setDescriptionAnswer(
                      descriptionAnswerList[currentQuestionIdx + 1]
                    );
                  }}
                >
                  건너뛰기
                </CenterButton>
                <LeftButton
                  onClick={(e) => {
                    currentQuestionIdx == questions?.length - 1
                      ? SubmitOnClick(e)
                      : setCurrentQuestionIdx(currentQuestionIdx + 1);
                    setDescriptionAnswer(
                      descriptionAnswerList[currentQuestionIdx + 1]
                    );
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
