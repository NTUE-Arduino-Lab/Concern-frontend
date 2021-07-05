import axios from "axios";

import {
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
} from "./actionTypes";

const SERVER_URL = "https://concern-backend-202106.herokuapp.com/api";

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
    const { data } = await axios.post(SERVER_URL + "/classroom/getStatisticsDiagram", {
      classroomDataID,
      timeSpacing,
    });
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
      const { data } = await axios.post(SERVER_URL + "/classroom/getPersonDiagramList", {
        classroomDataID,
        timeSpacing,
      });
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
