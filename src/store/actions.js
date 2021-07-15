import axios from "axios";

import {
  //header-老師名稱、所有課程
  TEACHER_DATA_REQUEST,
  SET_TEACHER_DATA,
  TEACHER_DATA_FAIL,

  //課程週次資料
  COURSEWEEKS_DATA_REQUEST,
  SET_COURSEWEEKS_DATA,
  COURSEWEEKS_DATA_FAIL,

  //專注統計頁-上課時段紀錄
  TIME_STATUS_REQUEST,
  SET_CLASSROOM_TIME_STATUS,
  TIME_STATUS_FAIL,

  //專注統計頁-排行榜
  RANK_DATA_REQUEST,
  SET_RANK_DATA,
  RANK_DATA_FAIL,

  //專注統計頁-全班專注平均資料
  CLASSROOM_CONCERN_INFO_REQUEST,
  SET_CLASSROOM_CONCERN_INFO,
  CLASSROOM_CONCERN_INFO_FAIL,

  //專注統計頁-學生資料
  STUDENT_CONCERN_INFO_REQUEST,
  SET_STUDENT_CONCERN_INFO,
  STUDENT_CONCERN_INFO_FAIL,

  //點名系統頁-課堂人數統計
  SET_ROLLCALL_STATUS,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,

  //學生名單頁-取得已登錄的學生名單
  CLASSMATES_DATA_REQUEST,
  SET_CLASSMATES_DATA,
  SET_CLASSMATES_FAILLIST,
  CLASSMATES_DATA_FAIL,
} from "./actionTypes";

const SERVER_URL = "https://concern-backend-202106.herokuapp.com/api";

export const getTeacherData = async (dispatch, options) => {
  dispatch({ type: TEACHER_DATA_REQUEST });
  const { teacherDataID } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/teacher/getTeacherData", {
      teacherDataID,
    });
    dispatch({
      type: SET_TEACHER_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TEACHER_DATA_FAIL, payload: error });
  }
};

export const getCourseWeeksData = async (dispatch, options) => {
  dispatch({ type: COURSEWEEKS_DATA_REQUEST });
  const { courseDataID } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/course/getCourseData", {
      courseDataID,
    });
    dispatch({
      type: SET_COURSEWEEKS_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: COURSEWEEKS_DATA_FAIL, payload: error });
  }
};

export const getClassroomTimeStatus = async (dispatch, options) => {
  dispatch({ type: TIME_STATUS_REQUEST });
  const { classroomDataID } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/classroom/getClassroomTimeStatus",
      {
        classroomDataID,
      }
    );
    dispatch({
      type: SET_CLASSROOM_TIME_STATUS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TIME_STATUS_FAIL, payload: error });
  }
};

export const getRankData = async (dispatch, options) => {
  dispatch({ type: RANK_DATA_REQUEST });
  const { classroomDataID, rankCount } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/classroom/getRankData", {
      classroomDataID,
      rankCount,
    });
    dispatch({
      type: SET_RANK_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: RANK_DATA_FAIL, payload: error });
  }
};

export const getClassroomConcernInfo = async (dispatch, options) => {
  dispatch({ type: CLASSROOM_CONCERN_INFO_REQUEST });
  const { classroomDataID, timeSpacing } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/classroom/getStatisticsDiagram",
      {
        classroomDataID,
        timeSpacing,
      }
    );
    dispatch({
      type: SET_CLASSROOM_CONCERN_INFO,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSROOM_CONCERN_INFO_FAIL, payload: error });
  }
};

export const getStudentConcernInfo = async (dispatch, options) => {
  dispatch({ type: STUDENT_CONCERN_INFO_REQUEST });
  const { classroomDataID, timeSpacing } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/classroom/getPersonDiagramList",
      {
        classroomDataID,
        timeSpacing,
      }
    );
    dispatch({
      type: SET_STUDENT_CONCERN_INFO,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: STUDENT_CONCERN_INFO_FAIL, payload: error });
  }
};

export const getRollCallStatus = async (dispatch, options) => {
  dispatch({ type: BEGIN_DATA_REQUEST });
  const { classroomDataID } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/classroom/getRollcallStatus",
      {
        classroomDataID,
      }
    );
    dispatch({
      type: SET_ROLLCALL_STATUS,
      payload: data,
    });
    dispatch({ type: SUCCESS_DATA_REQUEST });
  } catch (error) {
    dispatch({ type: FAIL_DATA_REQUEST, payload: error });
  }
};

export const startRollCall = async (options) => {
  const { classroomDataID, duration } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/classroom/startRollcall", {
      classroomDataID,
      duration,
    });
    console.log("點名成功" + data);
  } catch (error) {
    console.log("點名發生錯誤：" + error);
  }
};

export const getClassmatesList = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/course/getClassmatesList", {
      courseDataID,
    });
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: error });
  }
};

export const editOneStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID,studentIndex,studentName,studentGoogleName,studentID } = options;
  try {
    console.log(options);
    const { data } = await axios.put(SERVER_URL + "/course/editOneStudent", {
      courseDataID,
      studentIndex,
      studentName,
      studentGoogleName,
      studentID,
    });
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    if (error.response.status===403) {
      dispatch({ type: CLASSMATES_DATA_FAIL, payload: "此學號已存在" });
      console.log("此學號已存在");
    }
  }
};

export const deleteOneStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID,studentID } = options;
  try {
    console.log(options);
    const { data } = await axios.delete(SERVER_URL + "/course/deleteOneStudent", {
      data :{
        courseDataID:courseDataID,
        studentID:studentID
      }
    });
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: error });
    console.log(error);
  }
};

export const addStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID,studentName,studentGoogleName,studentID } = options;
  try {
    console.log(options);
    const { data } = await axios.post(SERVER_URL + "/course/addStudent", {
      courseDataID,
      studentName,
      studentGoogleName,
      studentID,
    });
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: error });
    console.log("error");
  }
};

export const addMultipleStudents = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID,studentsDataArray } = options;
  try {
    console.log(options);
    const { data } = await axios.post(SERVER_URL + "/course/addMultipleStudents", {
      courseDataID,
      studentsDataArray,
    });
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data.updatedClassmates,
    });
    dispatch({
      type: SET_CLASSMATES_FAILLIST,
      payload: data.addFailList,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: error });
    console.log(error);
  }
};