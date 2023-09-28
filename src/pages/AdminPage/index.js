import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AddCategoryForm from "./components/AddCategoryForm";
import CategoryListShow from "./components/CategoryListShow";
import CategoryList from "../ScriptGeneratePage/CategoryList.json";
import JsonViewer from "./components/JsonViewer";
import { getJson, saveJson } from "../../utils/api/admin";

const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
  min-height: 100vh;
  text-align: left;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 50px;
  margin: 30px auto;
`;

const CodeTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 50px;
`;

const CodeInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 20px;
`;

const LoginButton = styled.button`
  height: 40px;
  margin-left: 10px;
`;

const AdminPage = () => {
  const [codeCorrect, setCodeCorrect] = useState(false);
  const [code, setCode] = useState("");
  const [categoryList, setCategoryList] = useState(CategoryList);
  const [existingCategoryShow, setExistingCategoryShow] = useState(false);
  const [jsonData, setJsonData] = useState(
    JSON.stringify(CategoryList, null, 2),
  );

  useEffect(() => {
    (async () => {
      const getJsonResult = await getJson().then((res) => {
        console.log(res);
        if (res != "error") {
          setJsonData(JSON.stringify(res, null, 2));
        }
      });
    })();
  }, []);

  //   useEffect(()=>{

  //   }, [CategoryList])

  const handleFormSubmit = (categoryData) => {
    setCategoryList(categoryData);
  };

  const categoryOnClick = () => {
    try {
      setCategoryList(JSON.parse(jsonData));
      setExistingCategoryShow(!existingCategoryShow);
    } catch {
      alert("Json에 문법적인 오류가 있습니다. 확인 수정 후 다시 시도해주세요.");
    }
  };

  const submitOnClick = async () => {
    try {
      setCategoryList(JSON.parse(jsonData));
      // json 수정하는 api 호출

      const saveJsonResult = await saveJson(JSON.parse(jsonData))
        .then((res) => {
          console.log(res);
          if (res != "error") {
            alert("수정이 완료되었습니다.");
          } else {
            alert("에러가 발생했습니다.");
          }
        })
        .catch((err) => {
          alert("에러가 발생했습니다.");
        });
    } catch {
      alert("Json에 문법적인 오류가 있습니다. 확인 수정 후 다시 시도해주세요.");
    }
  };

  const loginOnClick = () => {
    console.log();
    if (code == process.env.REACT_APP_ADMIN_SECRET_KEY) {
      setCodeCorrect(true);
    } else {
      alert("틀린 코드입니다.");
    }
  };

  return (
    <Container>
      {codeCorrect ? (
        <>
          {/* Display existing categoryList */}
          <h1 onClick={() => categoryOnClick()}>
            {!existingCategoryShow ? <>></> : <>v</>} Preview
          </h1>
          {existingCategoryShow ? (
            <CategoryListShow data={categoryList} />
          ) : (
            <></>
          )}
          <JsonViewer jsonData={jsonData} setJsonData={setJsonData} />

          <SubmitButton onClick={submitOnClick}>수정 완료하기</SubmitButton>

          {/* Render the form to add new categories */}
          {/* <AddCategoryForm onSubmit={handleFormSubmit} /> */}
        </>
      ) : (
        <>
          <CodeTitle>관리자 코드</CodeTitle>
          <CodeInput value={code} onChange={(e) => setCode(e.target.value)} />
          <LoginButton onClick={loginOnClick}>로그인</LoginButton>
        </>
      )}
    </Container>
  );
};

export default AdminPage;
