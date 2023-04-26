import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";

const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

const TitleBox = styled.div`
  font-size: 24px;
  font-weight: 800;
  text-align: left;
  margin-top: 50px;
`;

const FullTitle = styled.div`
  font-size: 40px;
  font-weight: 800;
  text-align: left;
  margin-top: 50px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
`;

const CategoryButton = styled.button`
  border-radius: 30px;
  border: 2px solid ${palette.gray};
  background-color: ${palette.white};
  font-size: 14px;
  font-weight: 600;
  color: ${palette.black};
  margin: 5px;
  padding: 6px 15px;

  &:hover {
    background-color: ${palette.blue_1};
    color: ${palette.white};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  border: 2px solid ${palette.gray};
  background-color: ${palette.white};
  font-size: 20px;
  font-weight: 600;
  color: ${palette.black};
  margin: 5px;
  padding: 6px 15px;
`;

const ScriptTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding: 20px;
`;

const OPIcScript = styled.div`
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  text-align: left;
`;

const IntroPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState();
  const [waiting, setWaiting] = useState(false);
  const CategoryList = [
    "👨‍👩‍👧‍👦 가족",
    "🍳 요리",
    "🧳 국내여행",
    "✈️ 해외여행",
    "🎥 영화",
    "🤹‍♀️ 공연",
    "🏠 집에서 보내는 휴가",
    "🛍 쇼핑",
    "📺 TV 시청",
    "📖 독서",
    "🏟 스포츠 관람",
    "🏞 공원",
    "🏝 해변",
    "☕️ 카페",
    "🚶 걷기",
    "🏃‍♀️ 조깅",
    "💪 헬스",
    "🎧 음악",
    "🎤 노래",
    "🎸 악기",
  ];

  useEffect(() => {}, [answer]);
  useEffect(() => {}, [waiting]);

  const handleSubmit = async (e) => {
    setAnswer("");
    setWaiting(true);
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: question }),
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
      setAnswer(parsedText);
      setWaiting(false);
      // setQuestion("");
    } catch (error) {
      console.error(error);
      // alert(error.message);
      setAnswer(error.message);
      setWaiting(false);
    }
  };
  return (
    <Container>
      <FullTitle>OPIc Script Generator</FullTitle>
      <TitleBox>카테고리</TitleBox>
      <CategoryContainer>
        {CategoryList.map((category) => (
          <CategoryButton>{category}</CategoryButton>
        ))}
      </CategoryContainer>
      <TitleBox>한국어 대본</TitleBox>
      <ScriptTextArea
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <ButtonContainer>
        <SubmitButton onClick={(e) => handleSubmit(e)}>
          대본 추출하기
        </SubmitButton>
      </ButtonContainer>

      <TitleBox>OPIc 대본</TitleBox>
      {waiting ? <>대본을 만드는 중입니다...</> : <></>}
      <OPIcScript>{answer}</OPIcScript>
    </Container>
  );
};

export default IntroPage;
