import React, { useState } from "react";

const CategoryListShow = ({ data }) => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (categoryId) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [categoryId]: !prevShowDetails[categoryId],
    }));
  };

  return (
    <div style={{ textAlign: "left", fontSize: "10px" }}>
      {data.map((category) => (
        <div key={category.id}>
          <h2 onClick={() => toggleDetails(category.id)}>
            {category.title} - {category.titleEng}
          </h2>
          {showDetails[category.id] && (
            <div>
              <img src={category.img} alt={category.title} />
              <p>Main Question: {category.mainQuestions[0].mainQuestion}</p>
              <p>
                Main Question (Korean):{" "}
                {category.mainQuestions[0].mainQuestionKor}
              </p>
              <h4>Questions:</h4>
              {category.mainQuestions[0].questions.map((question, index) => (
                <div key={index}>
                  <p>Question: {question.question}</p>
                  <p>Type: {question.type}</p>
                  <p>Placeholder: {question.placeholder}</p>
                  {/* You can display the answerList or any other data if required */}
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "2px",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryListShow;
