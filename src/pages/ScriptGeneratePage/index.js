import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import CategoryList from "./CategoryList.json";
import { SelectMainQuestion } from "./components";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  background-color: ${palette.light_bg};
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
  border-radius: 16px;
  background-color: ${palette.white};
  color: ${palette.darkest_green};
  text-align: left;
  padding: 29px;
  border: 0px;
  box-shadow: 0.9120142459869385px 0.9120142459869385px 7.296113967895508px 0px
    #02362a40;
  margin: 4px 0px;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 400;
  line-height: 29px;
  text-align: left;
  background: linear-gradient(
    90deg,
    #ffffff 9.68%,
    rgba(255, 255, 255, 0) 60.99%
  );
  filter: brightness(1.2) contrast(0.8) saturate(1.1);
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-color: ${palette.darker_green};
    color: ${palette.white};
  }
`;

const ScriptGeneratePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

  const Categories = CategoryList.categoryList;
  return (
    <Container>
      {selectedCategoryId > -1 ? (
        <SelectMainQuestion
          mainQuestionList={Categories[selectedCategoryId].mainQuestions}
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
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}${category.img}`,
                }}
              >
                {category.title}
              </CategoryBox>
            ))}
          </GategoryCardContainer>
        </>
      )}
    </Container>
  );
};

export default ScriptGeneratePage;
