import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import LeftArrow from "../../../assets/icons/left-arrow.svg";
import RightArrow from "../../../assets/icons/right-arrow.svg";
import OutputEssay from "./OutputEssay";
import Loading from "./Loading";
import DetailOptions from "./DetailOptions";
import HelpIcon from "../../../assets/icons/help.svg";
import Help from "./Help";

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
  margin: auto 0px;
`;

const QuestionSentence = styled.div`
  width: 100%;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 22px;
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
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
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

const HeaderBox = styled.div`
  width: 100%;
  height: 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const HelpButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${HelpIcon});
  border: hidden;
  position absolute;
  right: 0px;
`;

const CreateButton = styled.button`
  width: 167px;
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
  margin: 30px auto;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
`;

const SurveyListBox = ({ questions, answers, setSurveyListBoxShow }) => {
  const [descriptionAnswerList, setDescriptionAnswerList] = useState([]);
  const [qnaMerge, setQnaMerge] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [detailOptions, setDetailOptions] = useState({});
  const [helpOn, setHelpOn] = useState(false);
  const [detailOptionsOn, setDetailOptionsOn] = useState(false);

  useEffect(() => {
    if (detailOptions?.length) {
      console.log("hihi");
      console.log(detailOptions);
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
      setDescriptionAnswerList(answers);
    }
  }, [questions]);

  const SubmitOnClick = async (e) => {
    setGptResult("");
    setWaiting(true);
    // e.preventDefault();

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

    var detailOptionStr = (
      detailOptions?.length?.prompt +
      "\n" +
      detailOptions?.level?.prompt +
      "\n" +
      detailOptions?.speech?.prompt +
      "\n" +
      detailOptions?.style +
      "\n"
    ).toString();
    console.log(detailOptionStr);

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
            prompt:
              `Can you write a script for interviewee's OPIc Test? In a speech format, not in a dialogue format. He wants to get an IM score. Using the information obtained from this question and answer at below.\n\n\n\n${parsedText}\n\n (+ requirements : formulate a 200-300 word script in the form of an essay that aims to obtain IH level in an OPIC test. You are free to add your own creative information and make sure the resulting paragraph is concise, logically correct, grammatically correct, unique and mostly engaging to the reader. Your response OPIC test script's form must be '<START> {your OPIC test script} <END>'. )` +
              "\n\n" +
              detailOptionStr,
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
      setGptResult(error.message ? error.message : error);
      setWaiting(false);
    }
  };

  return (
    <Container>
      {helpOn ? (
        <Help
          visible={setHelpOn}
          maskClosable={true}
          onClose={() => {
            setHelpOn(false);
          }}
        />
      ) : (
        <></>
      )}
      {waiting && gptResult == "" ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {gptResult ? (
            <OutputEssay
              response={gptResult}
              questions={questions}
              answers={descriptionAnswerList}
            />
          ) : (
            <>
              {detailOptionsOn ? (
                <DetailOptions setDetailOptions={setDetailOptions} />
              ) : (
                <>
                  <HeaderBox>
                    <LeftButton onClick={() => setSurveyListBoxShow(false)}>
                      <ArrowIcon src={LeftArrow} />
                    </LeftButton>
                    <HelpButton onClick={() => setHelpOn(true)} />
                  </HeaderBox>
                  {questions?.map((ques, idx) => (
                    <>
                      <QuestionSentence>
                        {idx + 1}. {ques?.question}
                      </QuestionSentence>
                      {ques?.type == "descriptive_form" ? (
                        <>
                          <AnswerTextArea
                            onChange={(e) => {
                              setDescriptionAnswerList((prevList) => {
                                const updatedList = [...prevList];
                                updatedList[idx] = e.target.value;
                                return updatedList;
                              });
                            }}
                            value={descriptionAnswerList[idx]}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                  <CreateButton onClick={() => setDetailOptionsOn(true)}>
                    생성하기
                  </CreateButton>
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SurveyListBox;
