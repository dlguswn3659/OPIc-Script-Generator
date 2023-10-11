import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import DocsButton from "./components/DocsButton";
import Loading from "../ScriptGeneratePage/components/Loading";
import {
  getStudent,
  addStudent,
  saveTranslated,
  getTranslated,
} from "../../utils/api/quizlet";
import ProfileListModal from "./components/ProfileListModal";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  background-color: ${palette.light_bg};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;
`;

const ListButton = styled.button`
  width: 30px;
  height: 30px;
  visibility: hidden;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const ContentBox = styled.div``;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InputBox = styled.input`
  min-width: 100px;
  width: 100%;
  height: 30px;
  margin: 5px;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-weight: 400;
`;

const TextArea = styled.textarea`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  color: ${palette.black};
  width: 100%;
  border-radius: 16px;
  border: 0px;
  margin: 10px 0px;
  padding: 20px 20px 40px 20px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  vertical-align: middle;
  text-align: left;
  resize: none;
  outline: none;
  height: 200px;
`;

const GenerateButton = styled.button`
  height: 48px;
  border: hidden;
  background-color: ${palette.darker_green};
  color: ${palette.white};
  border-radius: 10px;
  font-family: Noto Sans KR;
  font-size: 21px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  margin: 20px auto;
  max-width: 240px;
  padding: 0px 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextAreaTitle = styled.div`
  padding: 12px 0px 2px 16px;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  color: ${palette.darkest_green};
`;

const QuizletPage = () => {
  const [studentName, setStudentName] = useState("홍길동");
  const [docsLink, setDocsLink] = useState("");
  const [quizletNum, setQuizletNum] = useState(20);
  const [quizletSetNum, setQuizletSetNum] = useState(1);
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [docsId, setDocsId] = useState("");
  const [docsParsing, setDocsParsing] = useState("");
  const [docsTranslate, setDocsTranslate] = useState("");
  const [quizletFormat, setQuizletFormat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveValid, setSaveValid] = useState(false);
  const [generateValid, setGenerateValid] = useState(false);
  const [recordValid, setRecordValid] = useState(false);
  const [profileListOn, setProfileListOn] = useState(false);

  useEffect(() => {
    var match = /\/d\/([^/]+)/.exec(docsLink);

    if (match) {
      var documentId = match[1];
      console.log("문서 ID:", documentId);
      setDocsId(documentId);
    } else {
      console.log("문서 ID를 찾을 수 없습니다.");
    }
  }, [docsLink]);

  useEffect(() => {}, [docsId]);

  useEffect(() => {
    if (docsLink?.length > 0 && quizletNum > 0) {
      setGenerateValid(true);
      if (
        studentName?.length > 0 &&
        email?.length > 0 &&
        phoneNum?.length > 0
      ) {
        setSaveValid(true);
        if (docsTranslate?.length > 0 && quizletFormat?.length > 0) {
          setRecordValid(true);
        } else {
          setRecordValid(false);
        }
      } else {
        setSaveValid(false);
      }
    } else {
      setGenerateValid(false);
    }
  }, [
    studentName,
    docsLink,
    quizletNum,
    email,
    phoneNum,
    docsTranslate,
    quizletFormat,
  ]);

  function compareByLength(a, b) {
    return b.length - a.length;
  }

  function combineSentences(englishText, koreanText) {
    const englishSentences = englishText
      .split("\n")
      .map((sentence) => sentence.trim());
    const koreanSentences = koreanText
      .split("\n")
      .map((sentence) => sentence.trim());

    let combinedText = "";
    const maxLength = Math.max(englishSentences.length, koreanSentences.length);

    const asteriskIndices = [];
    const otherIndices = [];

    for (let i = 0; i < englishSentences.length; i++) {
      const sentence = englishSentences[i];

      if (sentence.includes("*")) {
        // "*"를 포함하는 문자열의 인덱스 저장
        asteriskIndices.push(i);
      } else {
        // 다른 문자열의 인덱스 저장
        otherIndices.push(i);
      }
    }

    // otherIndices 배열을 길이 순으로 정렬
    otherIndices.sort((a, b) =>
      compareByLength(englishSentences[a], englishSentences[b]),
    );
    for (let i = 0; i < asteriskIndices.length; i++) {
      const englishSentence = englishSentences[asteriskIndices[i]]?.trim();
      const koreanSentence = koreanSentences[asteriskIndices[i]]?.trim();

      if (englishSentence && koreanSentence) {
        combinedText += `${englishSentence}\t${koreanSentence}\n`;
      }
    }
    if (asteriskIndices.length < quizletNum) {
      // 더 해야되면
      for (let i = 0; i < quizletNum - asteriskIndices.length; i++) {
        const englishSentence = englishSentences[otherIndices[i]]?.trim();
        const koreanSentence = koreanSentences[otherIndices[i]]?.trim();

        if (englishSentence && koreanSentence) {
          combinedText += `${englishSentence}\t${koreanSentence}\n`;
        }
      }
    }

    // for (let i = 0; i < maxLength; i++) {
    //   const englishSentence = englishSentences[i]?.trim();
    //   const koreanSentence = koreanSentences[i]?.trim();

    //   if (englishSentence && koreanSentence) {
    //     combinedText += `${englishSentence}\t${koreanSentence}\n`;
    //   }
    // }

    return combinedText;
  }

  const generateOnClick = async () => {
    setIsLoading(true);
    var translateData =
      "<English>\nDid you say [that you wanted to eat 돼지갈비] to your husband?\nMy husband is going to look for a 돼지갈비 place right now.\nMy mom told me [that life is like a box of chocolate], you never know [what you are going to get].\nDid you pass? > No I failed.\nThat's [the reason why I failed the bus exam].\nI passed the test a few times during practice, but I failed during the real test because I was nervous and I had bad handling.\nIt's already September 4th!\nFor the first time in a long time (in a while)- 오랜만에.\nWe went to [a restaurant that I like] called 마포곱창타운.\nI know [where 마포곱창타운 is]- 나는 [마포곱창타운이 있는 곳]을 알아.\nIt costs like 20,000 won per person. It's kind of expensive.\nBut it's really good. It's cost efficient. It's worth it.\nI used to work at a 곱창 restaurant so I know [how good 곱창 tastes].\nI know [how people live].\nI don't know [how to play games].\nI don't know [how people study English].\nGive it to me, I'm worth it.\nIt was expensive but it was worth it.\nIt's too expensive. It's not worth it.\nA waste of money / A waste of time.\n\n<Korean>\n[당신이 돼지갈비를 먹고 싶다고] 남편에게 말했니?\n지금 남편은 돼지갈비집을 찾으러 갈 거야.\n엄마가 [인생은 초콜릿 상자와 같다고] 말했어, 무엇이 나올지 모르니까.\n합격했어? -> 아니, 난 불합격했어.\n그래 [그때 불합격했던 이유]야.\n연습 때 몇 번 시험에 합격했는데, 실제 시험 때 너무 긴장돼서 잘 다루지 못해서 불합격했어.\n벌써 9월 4일이야!\n오랜만에.\n[내가 좋아하는 식당]인 마포곱창타운에 갔어.\n[마포곱창타운이 어디에 있는지] 알아.\n한 사람당 약 2만 원정도 들어. 좀 비싸.\n하지만 진짜 맛있어. 가성비 좋아. 가치가 있어.\n예전에 곱창집에서 일해봤는데, [곱창이 얼마나 맛있는지] 알아.\n[사람들이 어떻게 살지] 알아.\n[게임하는 방법]을 몰라.\n[사람들이 영어를 어떻게 공부하는지] 몰라.\n그냥 내게 줘, 내가 가치 있으니까.\n비싼데 가치가 있어.\n너무 비싸. 가치가 없어.\n돈낭비야 / 시간낭비야.";
    // setDocsTranslate(translateData);
    const response = await fetch(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/ask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temNum: 0,
          prompt: `Please translate the following English into casual adult Korean. \n+First, make sure there are no numbering of text.\n+Second, put English text on the top and the Korean translation on the bottom.\n+Third, Start the English translation with '<English>' and start the Korean translation with '<Korean>'\n+Fourth, make sure to translate all of the english text at once.\n Fifth, include the ‘*’ symbols. \nText: ${docsParsing}`,
        }),
      },
    );

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`request failed with status ${response.status}`)
      );
    }
    try {
      console.log(data.response);
      setDocsTranslate(data.response);
      translateData = data.response;
    } catch {
      alert("error!");
    }
    var sections = translateData.split("\n");

    var isEnglishSection = false;
    var text = "";
    var textKor = "";

    // 각 섹션을 반복하면서 <English>와 <Korean> 영역을 나누기
    for (var section of sections) {
      if (section.startsWith("<English>")) {
        isEnglishSection = true;
      } else if (section.startsWith("<Korean>")) {
        isEnglishSection = false;
      } else {
        if (isEnglishSection) {
          text += section + "\n";
        } else {
          textKor += section + "\n";
        }
      }
    }

    console.log("<English> 영역:");
    console.log(text);
    console.log("<Korean> 영역:");
    console.log(textKor);

    const combinedTextResult = combineSentences(text, textKor);
    console.log(combinedTextResult);
    setQuizletFormat(combinedTextResult);
    setIsLoading(false);
  };

  const profileSaveOnClick = async () => {
    if (saveValid) {
      const addStudentResult = await addStudent(
        studentName,
        docsLink,
        quizletNum,
        email,
        phoneNum,
      ).then((res) => {
        console.log(res);
        alert("학생이 성공적으로 추가되었습니다.");
      });
    } else {
      alert("프로필 내용을 전부 올바르게 채워주세요");
    }
  };

  const setCurrentStudent = (name, docsLink, quizletCount, email, phoneNum) => {
    setStudentName(name);
    setDocsLink(docsLink);
    setQuizletNum(quizletCount);
    setEmail(email);
    setPhoneNum(phoneNum);
  };

  const recordOnClick = async () => {
    if (recordValid) {
      const saveTranslatedResult = await saveTranslated(
        studentName,
        phoneNum,
        docsTranslate,
        quizletFormat,
      ).then((res) => {
        if (res == "error") {
          alert("예기치 못한 오류가 발생하였습니다.");
        } else {
          alert("저장이 완료되었습니다.");
        }
      });
    } else {
      alert(
        "저장할 quizlet이 없거나 채워지지 않는 프로필 정보가 있습니다. 다시 확인해 주세요.",
      );
    }
  };

  const getRecordOnClick = () => {
    window.location.href = "/quizlet/record";
  };

  return (
    <>
      {profileListOn ? (
        <ProfileListModal
          visible={setProfileListOn}
          maskClosable={true}
          onClose={() => {
            setProfileListOn(false);
          }}
          setCurrentStudent={setCurrentStudent}
        />
      ) : (
        <></>
      )}
      <Container>
        <Header>
          <ListButton />
          <HeaderTitle>Fluent Quizlet Generator</HeaderTitle>
          <ListButton />
        </Header>
        <ContentBox>
          <DocsButton
            docsId={docsId}
            setDocsParsing={setDocsParsing}
            profileSaveOnClick={profileSaveOnClick}
          />
          <InfoBox>
            <InputBox
              onChange={(e) => setStudentName(e.target.value)}
              value={studentName}
              placeholder="학생 이름"
            />
            <InputBox
              onChange={(e) => setDocsLink(e.target.value)}
              value={docsLink}
              placeholder="문서 링크"
            />
            <InputBox
              onChange={(e) => setQuizletNum(e.target.value)}
              value={quizletNum}
              placeholder="퀴즐렛 개수"
            />
            {/* <InputBox
            onChange={(e) => setQuizletSetNum(e.target.value)}
            value={quizletSetNum}
            placeholder="퀴즐렛 세트 개수"
          /> */}
          </InfoBox>
          <InfoBox>
            <InputBox
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="이메일"
            />
            <InputBox
              onChange={(e) => setPhoneNum(e.target.value)}
              value={phoneNum}
              placeholder="전화번호"
            />
          </InfoBox>
          <TextAreaTitle>✏️ 수업 필기 내용</TextAreaTitle>
          <TextArea
            onChange={(e) => setDocsParsing(e.target.value)}
            value={docsParsing}
          />
          {docsParsing.length > 0 ? (
            <GenerateButton onClick={generateOnClick}>
              Generate Quizlet
            </GenerateButton>
          ) : (
            <GenerateButton
              style={{ backgroundColor: palette.grey_5, color: palette.white }}
            >
              Generate Quizlet
            </GenerateButton>
          )}
          {!isLoading ? (
            <>
              <TextAreaTitle>🔁 전체 수업 번역본</TextAreaTitle>
              <TextArea
                onChange={(e) => setDocsTranslate(e.target.value)}
                value={docsTranslate}
              />
              <TextAreaTitle>🇶 퀴즐렛 표현</TextAreaTitle>
              <TextArea
                onChange={(e) => setQuizletFormat(e.target.value)}
                value={quizletFormat}
              />
            </>
          ) : (
            <div style={{ marginTop: "-250px", marginBottom: "40px" }}>
              <Loading />
            </div>
          )}

          <ButtonContainer>
            <GenerateButton onClick={recordOnClick}>기록</GenerateButton>
            <GenerateButton onClick={getRecordOnClick}>
              저장한 수업들
            </GenerateButton>
            <GenerateButton
              onClick={() => {
                setProfileListOn(true);
              }}
            >
              프로필 변경
            </GenerateButton>
          </ButtonContainer>
        </ContentBox>
      </Container>
    </>
  );
};

export default QuizletPage;
