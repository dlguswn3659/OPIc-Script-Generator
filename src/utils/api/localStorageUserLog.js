import { saveLog } from "./log";
import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리에서 v4 함수를 가져옴

const USER_LOG_KEY = process.env.REACT_APP_USER_LOG_KEY;

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
  reqDate: "",
};

// 1. userLog를 초기화하는 메소드
function initializeUserLog() {
  const existingUserLog = localStorage.getItem(USER_LOG_KEY);
  console.log("try init");
  console.log(existingUserLog);

  if (!existingUserLog) {
    localStorage.setItem(USER_LOG_KEY, JSON.stringify(userLog));
    updateMultipleUserLogValues({
      id: uuidv4(), // 랜덤 ID 생성
    });
    console.log("init done!!");
  } else {
    // 이전에 사용한 로그가 있어도 홈으로 돌아가거나 하면 저장데이터 날려야지
    const currentId = JSON.parse(localStorage.getItem(USER_LOG_KEY)).id;
    const currentTryNum = JSON.parse(localStorage.getItem(USER_LOG_KEY)).tryNum;
    if (currentTryNum != 0) {
      // tryNum은 gpt api 호출하는 순간 1씩 늘어남.
      localStorage.setItem(USER_LOG_KEY, JSON.stringify(userLog));
      updateMultipleUserLogValues({
        id: currentId,
      });
    }
  }
}

// 2. 여러 쌍의 데이터를 받아서 각각에 대해 업데이트하는 함수
const updateMultipleUserLogValues = async (keyValuePairs) => {
  const existingUserLog = localStorage.getItem(USER_LOG_KEY);

  if (existingUserLog) {
    const parsedUserLog = JSON.parse(existingUserLog);

    for (const [key, value] of Object.entries(keyValuePairs)) {
      parsedUserLog[key] = value;
    }
    console.log(parsedUserLog);
    localStorage.setItem(USER_LOG_KEY, JSON.stringify(parsedUserLog));

    const saveLogResult = await saveLog(parsedUserLog).then((res) => {
      console.log(res);
    });
  }
};

// 모듈로 사용 가능하도록 내보내기
export { initializeUserLog, updateMultipleUserLogValues };
