import axios from "axios";

export const saveJson = async (newJson) => {
  let returnValue;

  await axios
    .post(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/jsonSave`,
      JSON.stringify(newJson),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};

export const getJson = async () => {
  let returnValue;

  await axios
    .get(`${process.env.REACT_APP_EC2_IP_ADDRESS}/getJson`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res?.data);
      returnValue = res?.data;
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};
