import React, { useEffect, useState } from "react";

const AddCategoryForm = () => {
  const [categoryList, setCategoryList] = useState([
    {
      title: "자기소개",
      titleEng: "Self Introduction",
      img: "/images/self-introduction.svg",
      id: 1,
      mainQuestions: [
        {
          mainQuestion:
            "Let's start the interview now. Tell me something about yourself.",
          mainQuestionKor: "인터뷰를 시작해볼까요? 자기 소개를 해주세요.",
          questions: [
            {
              question: "이름이 어떻게 되시나요?",
              type: "descriptive_form",
              answerList: [],
              placeholder: "홍길동",
            },
            {
              question: "나이가 어떻게 되시나요?",
              type: "descriptive_form",
              answerList: [],
              placeholder: "30살",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {}, [categoryList]);

  const handleAddMainQuestion = (categoryIndex) => {
    const newCategoryList = [...categoryList]; // 새로운 사본 생성
    newCategoryList[categoryIndex].mainQuestions.push({
      mainQuestion: "",
      mainQuestionKor: "",
      questions: [],
    });
    setCategoryList(newCategoryList);
  };

  const handleAddQuestion = (categoryIndex, mainQuestionIndex) => {
    const newCategoryList = [...categoryList];
    newCategoryList[categoryIndex].mainQuestions[
      mainQuestionIndex
    ].questions.push({
      question: "",
      type: "descriptive_form",
      answerList: [],
      placeholder: "",
    });
    setCategoryList(newCategoryList);
  };

  const handleCategoryChange = (categoryIndex, field, value) => {
    setCategoryList((prevCategoryList) => {
      const newCategoryList = [...prevCategoryList];
      newCategoryList[categoryIndex][field] = value;
      return newCategoryList;
    });
  };

  const handleMainQuestionChange = (
    categoryIndex,
    mainQuestionIndex,
    field,
    value,
  ) => {
    setCategoryList((prevCategoryList) => {
      const newCategoryList = [...prevCategoryList];
      newCategoryList[categoryIndex].mainQuestions[mainQuestionIndex][field] =
        value;
      return newCategoryList;
    });
  };

  const handleQuestionChange = (
    categoryIndex,
    mainQuestionIndex,
    questionIndex,
    field,
    value,
  ) => {
    setCategoryList((prevCategoryList) => {
      const newCategoryList = [...prevCategoryList];
      newCategoryList[categoryIndex].mainQuestions[mainQuestionIndex].questions[
        questionIndex
      ][field] = value;
      return newCategoryList;
    });
  };

  return (
    <div>
      {categoryList.map((category, categoryIndex) => (
        <div key={category.id}>
          <h2>
            {category.title} - {category.titleEng}
          </h2>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={category.title}
              onChange={(e) =>
                handleCategoryChange(categoryIndex, "title", e.target.value)
              }
            />
          </div>
          <div>
            <label>Title (English):</label>
            <input
              type="text"
              value={category.titleEng}
              onChange={(e) =>
                handleCategoryChange(categoryIndex, "titleEng", e.target.value)
              }
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={category.img}
              onChange={(e) =>
                handleCategoryChange(categoryIndex, "img", e.target.value)
              }
            />
          </div>
          {category.mainQuestions.map((mainQuestion, mainQuestionIndex) => (
            <div key={mainQuestionIndex}>
              <h3>Main Question {mainQuestionIndex + 1}</h3>
              <div>
                <label>Main Question:</label>
                <input
                  type="text"
                  value={mainQuestion.mainQuestion}
                  onChange={(e) =>
                    handleMainQuestionChange(
                      categoryIndex,
                      mainQuestionIndex,
                      "mainQuestion",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div>
                <label>Main Question (Korean):</label>
                <input
                  type="text"
                  value={mainQuestion.mainQuestionKor}
                  onChange={(e) =>
                    handleMainQuestionChange(
                      categoryIndex,
                      mainQuestionIndex,
                      "mainQuestionKor",
                      e.target.value,
                    )
                  }
                />
              </div>
              {mainQuestion.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <h4>Question {questionIndex + 1}</h4>
                  <div>
                    <label>Question:</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(
                          categoryIndex,
                          mainQuestionIndex,
                          questionIndex,
                          "question",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>Placeholder:</label>
                    <input
                      type="text"
                      value={question.placeholder}
                      onChange={(e) =>
                        handleQuestionChange(
                          categoryIndex,
                          mainQuestionIndex,
                          questionIndex,
                          "placeholder",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddQuestion(categoryIndex, mainQuestionIndex)
                }
              >
                Add Question
              </button>
            </div>
          ))}
          <button onClick={() => handleAddMainQuestion(categoryIndex)}>
            Add Main Question
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddCategoryForm;
