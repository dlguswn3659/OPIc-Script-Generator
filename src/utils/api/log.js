import axios from "axios";

export const saveFeedback = async (feedbackInfo) => {
  let returnValue;

  await axios
    .post(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/feedback`,
      JSON.stringify(feedbackInfo),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      console.log(res);
      returnValue = res;
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};

export const saveLog = async (logObject) => {
  let returnValue;

  await axios
    .post(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/api/answer/save_answer`,
      JSON.stringify(logObject),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      console.log(res);
      returnValue = res;
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};

const userLog = {
  title: "",
  id: "",
  mainQuestion: "",
  interviewKor: "",
  interviewEng: "",
  optionList: ["", "", ""],
  additionalOption: "",
  tryNum: 0,
  errNum: 0,
  errLog: "",
  reqDate: ""
}