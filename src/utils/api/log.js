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
