import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import LeftArrow from "../../assets/icons/left-arrow.svg";
import {
  getStudent,
  addStudent,
  saveTranslated,
  getTranslated,
} from "../../utils/api/quizlet";
import CopyIcon from "../../assets/icons/copy.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  background-color: ${palette.light_bg};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: Noto Sans KR;
`;

const ListButton = styled.button`
  width: 30px;
  height: 30px;
  visibility: hidden;
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0px;
`;

const LeftButton = styled.button`
  height: 30px;
  background: transparent;
  border: 0px;
  display: flex;
  margin: auto 0px;
  width: 45px;
`;

const CardBox = styled.div`
  margin: 20px;
  margin-bottom: 40px;
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: Noto Sans KR;
  text-align: left;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ScriptBox = styled.div`
  width: 50%;
  text-align: left;
  background-color: ${palette.white};
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  filter: drop-shadow(
    1.1406749486923218px 1.1406749486923218px 9.125399589538574px
      rgba(2, 54, 42, 0.25)
  );
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentHeaderText = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-family: Noto Sans KR;
  text-align: left;
`;

const CopyButton = styled.button`
  width: 24px;
  height: 24px;
  border: hidden;
  background-color: transparent;
  background-image: url(${CopyIcon});
`;

const QuizletListPage = ({ name, phoneNum, setStatus }) => {
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    (async () => {
      if (name && phoneNum) {
        const getTranslatedResult = await getTranslated(name, phoneNum).then(
          (res) => {
            // setRecordList(res);
            setRecordList([
              {
                name: "이윤경",
                phoneNum: "01012345678",
                translated: "test 번역본",
                qTranslated: "quizlet 번역본",
              },
              {
                name: "김호태",
                phoneNum: "01012345678",
                translated: "test 번역본2",
                qTranslated: "quizlet 번역본2",
              },
            ]);
          },
        );
      }
    })();
  }, []);

  const copyOnClick = (text) => {
    console.log("hello");
    console.log(text);
    navigator.clipboard.writeText(text);
    // toast.success("복사완료!");
    alert("복사 완료!");
  };

  return (
    <Container>
      <Header>
        <LeftButton
          onClick={() => {
            // window.history.back();
            setStatus(false);
          }}
        >
          <ArrowIcon src={LeftArrow} />
        </LeftButton>
        <HeaderTitle>Record</HeaderTitle>
        <ListButton />
      </Header>
      {recordList.length > 0 ? (
        <>
          {recordList?.map((record, idx) => (
            <CardBox>
              <CardHeader>{record.name}님 퀴즐렛</CardHeader>
              <ContentBox>
                <ScriptBox>
                  <ContentHeader>
                    <ContentHeaderText>수업 번역본</ContentHeaderText>
                    <CopyButton
                      onClick={() => copyOnClick(record.translated)}
                    />
                  </ContentHeader>
                  {record.translated}
                </ScriptBox>
                <ScriptBox>
                  <ContentHeader>
                    <ContentHeaderText>퀴즐렛 </ContentHeaderText>
                    <CopyButton
                      onClick={() => copyOnClick(record.qTranslated)}
                    />
                  </ContentHeader>
                  {record.qTranslated}
                </ScriptBox>
              </ContentBox>
            </CardBox>
          ))}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default QuizletListPage;
