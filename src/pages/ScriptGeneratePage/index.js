import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import CategoryList from "./CategoryList.json";
import { SelectMainQuestion } from "./components";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  background-color: ${palette.light_bg};
  min-height: 100vh;
`;

const PageTitle = styled.div`
  padding: 12px 16px;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  color: ${palette.darkest_green};
`;

const GategoryCardContainer = styled.div`
  width: 100%;
  align-items: center;
  padding: 3px 23px;
`;

const CategoryBox = styled.button`
  width: 100%;
  height: 138px;
  position: relative;
  border-radius: 16px;
  background-color: ${palette.white};
  color: ${palette.darkest_green};
  text-align: left;
  padding: 29px;
  border: 0px;
  position: relative;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  margin: 4px 0px;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 900;
  line-height: 29px;
  text-align: left;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    // border: 5px solid ${palette.darker_green};
    box-shadow: inset 0 0 0 5px ${palette.darker_green},
      0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
        #02362a40;
    background-color: ${palette.darker_green};
  }
`;

const Gradient = styled.div`
  position: absolute;
  border-radius: 16px;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px; /* 그라데이션의 높이 조정 */
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  z-index: 1;
`;

const BackgroundImageArea = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  width: 175px;
  height: 118px;
  top: 20px;
  position: absolute;
  right: 30px;
`;

const ScriptGeneratePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

  const Categories = CategoryList.categoryList;
  return (
    <Container>
      {selectedCategoryId > -1 ? (
        <SelectMainQuestion
          mainQuestionList={Categories[selectedCategoryId].mainQuestions}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      ) : (
        <>
          <PageTitle>주제 선택</PageTitle>
          <GategoryCardContainer>
            {Categories.map((category, idx) => (
              <CategoryBox
                onClick={() => {
                  setSelectedCategoryId(idx);
                }}
              >
                <BackgroundImageArea
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}${category.img}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {category.title}
                </div>
                {/* <Gradient /> */}
              </CategoryBox>
            ))}
          </GategoryCardContainer>
        </>
      )}
    </Container>
  );
};

export default ScriptGeneratePage;
