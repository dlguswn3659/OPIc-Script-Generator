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

export const addStudent = async (
  name,
  docsLink,
  quizletCount,
  email,
  phoneNum,
) => {
  let returnValue;

  await axios
    .post(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/api/Student/addStudent`,
      `{"name":"${name}","docsLink":"${docsLink}","quizletCount":"${quizletCount}","email":"${email}","phoneNum":"${phoneNum}"}`,
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

export const getStudent = async () => {
  let returnValue;

  await axios
    .get(`${process.env.REACT_APP_EC2_IP_ADDRESS}/api/Student/getStudent`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res?.data);
      returnValue = res?.data?.students; // list
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};

export const saveTranslated = async (
  name,
  phoneNum,
  translated,
  qTranslated,
) => {
  let returnValue;
  const data = {
    name: name,
    phoneNum: phoneNum,
    translated: translated,
    qTranslated: qTranslated,
  };

  await axios
    .post(
      `${process.env.REACT_APP_EC2_IP_ADDRESS}/api/Student/saveTranslated`,
      JSON.stringify(data),
      // `{"name":"${name}","translated":"${translated.toString()}","qTranslated":"${qTranslated.toString()}","phoneNum":"${phoneNum}"}`,
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

export const getTranslated = async (name, phoneNum) => {
  let returnValue;

  const param = {
    name: name,
    phoneNum: phoneNum
  }

  await axios
    .get(`${process.env.REACT_APP_EC2_IP_ADDRESS}/api/Student/getTranslated`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: param,
    })
    .then((res) => {
      console.log(res?.data);
      returnValue = res?.data?.translated; // list
    })
    .catch((err) => {
      console.log(err);
      returnValue = "error";
    });

  return returnValue;
};
