import axios from "axios";

import {
  TIME_STATUS_REQUEST,
  SET_CLASSROOM_TIME_STATUS,
  TIME_STATUS_FAIL,
  
  RANK_DATA_REQUEST,
  SET_RANK_DATA,
  RANK_DATA_FAIL,

  STUDENT_CONCERN_INFO_REQUEST,
  SET_STUDENT_CONCERN_INFO,
  STUDENT_CONCERN_INFO_FAIL,
  
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
