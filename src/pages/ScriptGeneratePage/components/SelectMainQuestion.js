import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import SurveyBox from "./SurveyBox";

const PageTitle = styled.div`
  padding: 12px 16px;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  color: ${palette.darkest_green};
`;

const MainQuestionCardContainer = styled.div`
  width: 100%;
  align-items: center;
  padding: 3px 23px;
`;

const MainQuestionBox = styled.button`
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
  &:hover {
    background-color: ${palette.darker_green};
    color: ${palette.white};
  }
`;

const SelectMainQuestion = ({ mainQuestionList }) => {
  const [selectedMainQuestionIdx, setSelectedMainQuestionIdx] = useState(-1);

  return (
    <>
      {selectedMainQuestionIdx > -1 ? (
        <SurveyBox
          questions={mainQuestionList[selectedMainQuestionIdx].questions}
        />
      ) : (
        <>
          <PageTitle>질문 선택</PageTitle>
          <MainQuestionCardContainer>
            {mainQuestionList?.map((item, idx) => (
              <MainQuestionBox
                onClick={() => {
                  setSelectedMainQuestionIdx(idx);
                }}
              >
                {item.mainQuestion}
              </MainQuestionBox>
            ))}
          </MainQuestionCardContainer>
        </>
      )}
    </>
  );
};

export default SelectMainQuestion;
