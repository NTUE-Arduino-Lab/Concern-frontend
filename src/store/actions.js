import axios from "axios";
import constants from "../uiStore/actionTypes";

import {
  //重置頁面
  SET_PAGE_RESET,
  SET_COURSE_RESET,

  //header-老師名稱、所有課程
  TEACHER_DATA_REQUEST,
  SET_TEACHER_DATA,
  TEACHER_DATA_FAIL,

  //header-是否已新增課程
  ADD_COURSE_DATA_FINISH,
  ADD_COURSE_DATA_UNDONE,

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
  ROLLCALL_STATUS_REQUEST,
  SET_ROLLCALL_STATUS,
  ROLLCALL_STATUS_FAIL,
  ROLLCALL_START,
  ROLLCALL_FINISH,

  //學生名單頁-取得已登錄的學生名單
  CLASSMATES_DATA_REQUEST,
  SET_CLASSMATES_DATA,
  SET_CLASSMATES_FAILLIST,
  CLASSMATES_DATA_FAIL,

  //完整點名頁
  TOTALROLLCALL_DATA_REQUEST,
  SET_TOTALROLLCALL_WEEK_DATA,
  SET_TOTALROLLCALL_LIST_DATA,
  TOTALROLLCALL_DATA_FAIL,

  //登入頁面要資料狀態
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
} from "./actionTypes";

const SERVER_URL = "https://concern-backend-202106.herokuapp.com/api";

export const setReducerDataReset = (dispatch) => {
  dispatch({ type: SET_PAGE_RESET });
};

export const setReducerCourseDataReset = (dispatch) => {
  dispatch({ type: SET_COURSE_RESET });
};

export const getAllDataID = async (dispatch, uiDispatch, options) => {
  dispatch({ type: BEGIN_DATA_REQUEST });
  const { teacherName, teacherID } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/teacher/teacherRegisterLogin",
      {
        teacherName,
        teacherID,
      }
    );
    dispatch({
      type: SUCCESS_DATA_REQUEST,
    });
    uiDispatch({
      type: constants.SET_TEACHERDATAID,
      payload: data.teacherDataID,
    });
    localStorage.setItem("teacherDataID", data.teacherDataID);
    uiDispatch({
      type: constants.SET_COURSEDATAID,
      payload: data.lastCourseDataID,
    });
    localStorage.setItem("courseDataID", data.lastCourseDataID);
    uiDispatch({
      type: constants.SET_CLASSROOMDATAID,
      payload: data.lastClassroomDataID,
    });
    localStorage.setItem("classroomDataID", data.lastClassroomDataID);
  } catch (error) {
    dispatch({ type: FAIL_DATA_REQUEST, payload: error });
  }
};

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
    dispatch({
      type: ADD_COURSE_DATA_UNDONE,
    });
  } catch (error) {
    dispatch({ type: TEACHER_DATA_FAIL, payload: error });
  }
};

export const addCourse = async (dispatch, options) => {
  const { teacherDataID, courseName } = options;
  try {
    await axios.post(SERVER_URL + "/course/addCourse", {
      teacherDataID,
      courseName,
    });
    dispatch({
      type: ADD_COURSE_DATA_FINISH,
    });
  } catch (error) {
    console.log("新增課程失敗：" + error);
  }
};

export const getCourseWeeksData = async (dispatch, options) => {
  dispatch({ type: COURSEWEEKS_DATA_REQUEST });
  dispatch({ type: SET_PAGE_RESET });
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
  dispatch({ type: ROLLCALL_STATUS_REQUEST });
  dispatch({ type: ROLLCALL_FINISH });
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
  } catch (error) {
    dispatch({ type: ROLLCALL_STATUS_FAIL, payload: error });
  }
};

export const startRollCall = async (dispatch, options) => {
  const { classroomDataID, duration } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/classroom/startRollcall", {
      classroomDataID,
      duration,
    });
    dispatch({
      type: ROLLCALL_START,
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
    const { data } = await axios.post(
      SERVER_URL + "/course/getClassmatesList",
      {
        courseDataID,
      }
    );
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: "載入學生名單時發生問題" });
    console.log(error);
  }
};

export const editOneStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const {
    courseDataID,
    studentIndex,
    studentName,
    studentGoogleName,
    studentID,
  } = options;
  try {
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
    if (error.response.status === 403) {
      dispatch({ type: CLASSMATES_DATA_FAIL, payload: "此學號已存在" });
    }
    console.log(error);
  }
};

export const deleteOneStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID, studentID } = options;
  try {
    const { data } = await axios.delete(
      SERVER_URL + "/course/deleteOneStudent",
      {
        data: {
          courseDataID: courseDataID,
          studentID: studentID,
        },
      }
    );
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: "刪除學生時發生問題！" });
    console.log(error);
  }
};

export const addStudent = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID, studentName, studentGoogleName, studentID } = options;
  try {
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
    if (error.response.status === 403) {
      dispatch({ type: CLASSMATES_DATA_FAIL, payload: "此學號已在名單中" });
    } else {
      dispatch({ type: CLASSMATES_DATA_FAIL, payload: "新增學生失敗" });
    }
    console.log(error);
  }
};

export const addMultipleStudents = async (dispatch, options) => {
  dispatch({ type: CLASSMATES_DATA_REQUEST });
  const { courseDataID, studentsDataArray } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/course/addMultipleStudents",
      {
        courseDataID,
        studentsDataArray,
      }
    );
    dispatch({
      type: SET_CLASSMATES_DATA,
      payload: data.updatedClassmates,
    });
    dispatch({
      type: SET_CLASSMATES_FAILLIST,
      payload: data.addFailList,
    });
  } catch (error) {
    dispatch({ type: CLASSMATES_DATA_FAIL, payload: "匯入學生名單時發生問題" });
    console.log(error);
  }
};

export const getTotalRollcallStatus = async (dispatch, options) => {
  dispatch({ type: TOTALROLLCALL_DATA_REQUEST });
  const { courseDataID } = options;
  try {
    const { data } = await axios.post(
      SERVER_URL + "/course/getTotalRollcallStatus",
      {
        courseDataID,
      }
    );
    dispatch({
      type: SET_TOTALROLLCALL_WEEK_DATA,
      payload: data.weekName,
    });
    dispatch({
      type: SET_TOTALROLLCALL_LIST_DATA,
      payload: data.classmatesList,
    });
  } catch (error) {
    dispatch({
      type: TOTALROLLCALL_DATA_FAIL,
      payload: "匯入完整點名名單時發生問題",
    });
    console.log(error);
  }
};

export const setPersonalLeave = async (options) => {
  const { classroomDataID, studentID, truefalse } = options;
  try {
    console.log(options);
    const { data } = await axios.put(
      SERVER_URL + "/classroom/setPersonalLeave",
      {
        classroomDataID,
        studentID,
        truefalse,
      }
    );
    console.log("請假設定完成" + data);
  } catch (error) {
    console.log(error);
  }
};
