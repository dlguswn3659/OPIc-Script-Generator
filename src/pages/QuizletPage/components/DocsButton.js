import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";

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
  max-width: 240px;
  padding: 0px 30px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
`;

const DocsButton = ({ docsId, setDocsParsing, profileSaveOnClick }) => {
  const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_DOCS_API;
  const DISCOVERY_DOC =
    "https://docs.googleapis.com/$discovery/rest?version=v1";
  const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  useEffect(() => {
    handleClientLoad();
  }, []);

  useEffect(() => {
    console.log(docsId);
    if (docsId) {
      printDocTitle();
    }
  }, [docsId]);

  const handleClientLoad = () => {
    gapi.load("client", initializeGapiClient);
    gapi.load("auth2", initializeAuth2);
  };

  const initializeGapiClient = () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  };

  const initializeAuth2 = () => {
    gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES,
    });
  };

  const updateSigninStatus = (signedIn) => {
    setIsSignedIn(signedIn);
    if (signedIn) {
      printDocTitle();
    }
  };

  const handleAuthClick = () => {
    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn();
    } else {
      gapi.auth2.getAuthInstance().signOut();
    }
  };

  function shouldRemoveItem(item) {
    // "\n"만 들어있는 항목, 공백과 같은 값만 있는 항목, 띄어쓰기 2개 이하의 짧은 문자열을 제거
    return (
      item === "\n" ||
      /^\s*$/.test(item) ||
      item.trim().split(/\s+/).length <= 2
    );
  }

  const printDocTitle = () => {
    console.log(docsId);
    gapi.client.docs.documents
      .get({
        documentId: docsId, // Replace with your document ID
      })
      .then((response) => {
        console.log(response.result);
        console.log("hello2");
        var contentArray = response.result.body.content
          .filter((item) => item?.paragraph?.elements?.length > 0)
          .map((item) => item.paragraph.elements[0].textRun.content);

        console.log("hello");
        console.log(contentArray);
        const title = response.result.title;
        setDocTitle(`${title}`);

        // "<start>"가 포함된 배열 항목을 찾기
        var startIndex = contentArray.findIndex((item) =>
          item.includes("<start>"),
        );

        // "<end>"가 포함된 배열 항목을 찾기
        var endIndex = contentArray.findIndex((item) => item.includes("<end>"));

        // "<start>"와 "<end>"가 모두 포함된 항목들 사이의 항목들 가져오기
        if (startIndex !== -1 && endIndex !== -1) {
          var itemsBetween = contentArray.slice(startIndex + 1, endIndex);
          // itemsBetween 배열에서 조건에 맞지 않는 항목을 제거한 새로운 배열 생성
          //   var filteredItems = itemsBetween.filter(
          //     (item) => !shouldRemoveItem(item),
          //   );

          //   // 결과 출력
          //   console.log(filteredItems);
          // 항목들을 하나의 문자열로 합치기
          var resultString = itemsBetween.join(" ");

          console.log(resultString);
          setDocsParsing(resultString);
        } else {
          console.log(
            "'<start>'와 '<end>'가 모두 포함된 항목을 찾을 수 없습니다.",
          );
        }
      })
      .catch((error) => {
        console.log(error);
        // console.error("Error fetching document title:", error);
      });
  };

  return (
    <>
      <Container>
        {isSignedIn ? (
          <div>
            <GenerateButton onClick={handleAuthClick}>Sign Out</GenerateButton>
          </div>
        ) : (
          <div>
            <GenerateButton onClick={handleAuthClick}>Sign In</GenerateButton>
          </div>
        )}
        <GenerateButton onClick={profileSaveOnClick}>
          프로필 저장
        </GenerateButton>
      </Container>
      <p style={{ textAlign: "left", paddingLeft: "20px" }}>
        Document Title: {docTitle}
      </p>
    </>
  );
};

export default DocsButton;
