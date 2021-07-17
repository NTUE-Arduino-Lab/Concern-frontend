import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import {
  //重置頁面
  SET_PAGE_RESET,

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

  //學生名單頁-取得已登錄的學生名單
  CLASSMATES_DATA_REQUEST,
  SET_CLASSMATES_DATA,
  SET_CLASSMATES_FAILLIST,
  CLASSMATES_DATA_FAIL,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
} from "./actionTypes";

export const StoreContext = createContext();

const initialState = {
  //header老師名稱、所有課程
  teacherData: {
    teacherName: "",
    courses: [],
    teacherDataLoading: false,
    error: null,
  },

  //header-是否已新增課程
  isFinishAddCourse: false,

  //課程週次資料
  courseWeeksData: {
    courseWeeks: [],
    isGetCourseWeeks: false,
    courseWeeksDataLoading: false,
    error: null,
  },

  //專注度統計上課時段
  classroomTimeStatus: {
    isClassing: false,
    isResting: false,
    startTime: "",
    endTime: "",
    restTime: [],
    timeStatusLoading: false,
    error: null,
  },

  //專注度統計排行榜
  rankData: {
    concernPercentageRank: [],
    bestLastedRank: [],
    rankDataLoading: false,
    error: null,
  },

  //專注統計-全班專注平均資訊
  classroomConcernInfo: {
    classroomConcernData: [],
    classroomConcernInfoLoading: false,
    error: null,
  },

  //專注度統計學生專注資訊
  studentConcernInfo: {
    studentConcernData: [],
    studentConcernInfoLoading: false,
    error: null,
  },

  //點名系統
  rollCallSystemData: {
    shouldAttendCount: 0,
    attentCount: 0,
    personalLeaveCount: 0,
    absenceCount: 0,
    rollcallTime: [],
    classmatesInList: [],
    classmatesUnlisted: [],
    rollCallSystemDataLoading: false,
    error: null,
  },

  //要資料狀態
  requestdata: {
    loading: false,
    error: null,
  },

  //學生名單
  classmatesListData: {
    classmatesList: [],
    addFailList: [],
    classmatesListDataLoading: false,
    error: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    //頁面重置
    case SET_PAGE_RESET:
      return {
        ...state,
        classroomTimeStatus: {
          ...state.classroomTimeStatus,
          isClassing: false,
          isResting: false,
          startTime: "",
          endTime: "",
          restTime: [],
        },
        rankData: {
          ...state.rankData,
          concernPercentageRank: [],
          bestLastedRank: [],
        },
        classroomConcernInfo: {
          ...state.classroomConcernInfo,
          classroomConcernData: [],
        },
        studentConcernInfo:{
          ...state.studentConcernInfo,
          studentConcernData: [],
        },
      };
    //header-老師名稱、所有課程
    case TEACHER_DATA_REQUEST:
      return {
        ...state,
        teacherData: {
          ...state.teacherData,
          teacherDataLoading: true,
        },
      };
    case SET_TEACHER_DATA:
      return {
        ...state,
        teacherData: {
          ...state.teacherData,
          teacherName: action.payload.teacher.teacherName,
          courses: action.payload.teacher.courses,
          teacherDataLoading: false,
        },
      };
    case TEACHER_DATA_FAIL:
      return {
        ...state,
        teacherData: {
          ...state.teacherData,
          error: action.payload,
          teacherDataLoading: false,
        },
      };
    //header-是否已新增課程
    case ADD_COURSE_DATA_FINISH:
      return {
        ...state,
        isFinishAddCourse: true,
      };
    case ADD_COURSE_DATA_UNDONE:
      return {
        ...state,
        isFinishAddCourse: false,
      };
    //課程週次資料
    case COURSEWEEKS_DATA_REQUEST:
      return {
        ...state,
        courseWeeksData: {
          ...state.courseWeeksData,
          courseWeeksDataLoading: true,
        },
      };
    case SET_COURSEWEEKS_DATA:
      return {
        ...state,
        courseWeeksData: {
          ...state.courseWeeksData,
          courseWeeks: action.payload.course.courseWeeks,
          courseWeeksDataLoading: false,
        },
      };
    case COURSEWEEKS_DATA_FAIL:
      return {
        ...state,
        courseWeeksData: {
          ...state.courseWeeksData,
          error: action.payload,
          courseWeeksDataLoading: false,
        },
      };
    //專注統計頁-上課時段紀錄
    case TIME_STATUS_REQUEST:
      return {
        ...state,
        classroomTimeStatus: {
          ...state.classroomTimeStatus,
          timeStatusLoading: true,
        },
      };
    case SET_CLASSROOM_TIME_STATUS:
      return {
        ...state,
        classroomTimeStatus: {
          ...state.classroomTimeStatus,
          isClassing: action.payload.isClassing,
          isResting: action.payload.isResting,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          restTime: action.payload.restTime,
          timeStatusLoading: false,
        },
      };
    case TIME_STATUS_FAIL:
      return {
        ...state,
        classroomTimeStatus: {
          ...state.classroomTimeStatus,
          error: action.payload,
          timeStatusLoading: false,
        },
      };
    //專注統計頁-排行榜
    case RANK_DATA_REQUEST:
      return {
        ...state,
        rankData: {
          ...state.rankData,
          rankDataLoading: true,
        },
      };
    case SET_RANK_DATA:
      return {
        ...state,
        rankData: {
          ...state.rankData,
          concernPercentageRank: action.payload.concernPercentageRank,
          bestLastedRank: action.payload.bestLastedRank,
          rankDataLoading: false,
        },
      };
    case RANK_DATA_FAIL:
      return {
        ...state,
        rankData: {
          ...state.rankData,
          error: action.payload,
          rankDataLoading: false,
        },
      };
    //專注統計頁-全班專注平均資料
    case CLASSROOM_CONCERN_INFO_REQUEST:
      return {
        ...state,
        classroomConcernInfo: {
          ...state.classroomConcernInfo,
          classroomConcernInfoLoading: true,
        },
      };
    case SET_CLASSROOM_CONCERN_INFO:
      return {
        ...state,
        classroomConcernInfo: {
          ...state.classroomConcernInfo,
          classroomConcernData: action.payload,
          classroomConcernInfoLoading: false,
        },
      };
    case CLASSROOM_CONCERN_INFO_FAIL:
      return {
        ...state,
        classroomConcernInfo: {
          ...state.classroomConcernInfo,
          classroomConcernInfoLoading: false,
          error: action.payload,
        },
      };
    //專注統計頁-學生資料
    case STUDENT_CONCERN_INFO_REQUEST:
      return {
        ...state,
        studentConcernInfo: {
          ...state.studentConcernInfo,
          studentConcernInfoLoading: true,
        },
      };
    case SET_STUDENT_CONCERN_INFO:
      return {
        ...state,
        studentConcernInfo: {
          ...state.studentConcernInfo,
          studentConcernData: action.payload,
          studentConcernInfoLoading: false,
        },
      };
    case STUDENT_CONCERN_INFO_FAIL:
      return {
        ...state,
        studentConcernInfo: {
          ...state.studentConcernInfo,
          studentConcernInfoLoading: false,
          error: action.payload,
        },
      };
    //點名系統
    case ROLLCALL_STATUS_REQUEST:
      return {
        ...state,
        rollCallSystemData: {
          ...state.rollCallSystemData,
          shouldAttendCount: 0,
          attentCount: 0,
          personalLeaveCount: 0,
          absenceCount: 0,
          rollcallTime: [],
          classmatesInList: [],
          classmatesUnlisted: [],
          rollCallSystemDataLoading: true,
        },
      };
    case SET_ROLLCALL_STATUS:
      return {
        ...state,
        rollCallSystemData: {
          ...state.rollCallSystemData,
          shouldAttendCount: action.payload.shouldAttendCount,
          attentCount: action.payload.attentCount,
          personalLeaveCount: action.payload.personalLeaveCount,
          absenceCount: action.payload.absenceCount,
          rollcallTime: action.payload.rollcallTime,
          classmatesInList: action.payload.classmatesInList,
          classmatesUnlisted: action.payload.classmatesUnlisted,
          rollCallSystemDataLoading: false,
        },
      };
    case ROLLCALL_STATUS_FAIL:
      return {
        ...state,
        rollCallSystemData: {
          ...state.rollCallSystemData,
          rollCallSystemDataLoading: false,
          error: action.payload,
        },
      };
    //學生名單
    case CLASSMATES_DATA_REQUEST:
      return {
        ...state,
        classmatesListData: {
          ...state.classmatesListData,
          addFailList: [],
          error: "",
          classmatesListDataLoading: true,
        },
      };
    case SET_CLASSMATES_DATA:
      return {
        ...state,
        classmatesListData: {
          ...state.classmatesListData,
          classmatesList: action.payload,
          classmatesListDataLoading: false,
        },
      };
    case SET_CLASSMATES_FAILLIST:
      return {
        ...state,
        classmatesListData: {
          ...state.classmatesListData,
          addFailList: action.payload,
        },
      };
    case CLASSMATES_DATA_FAIL:
      return {
        ...state,
        classmatesListData: {
          ...state.classmatesListData,
          error: action.payload,
          classmatesListDataLoading: false,
        },
      };
    //一般設定
    case BEGIN_DATA_REQUEST:
      return {
        ...state,
        requestdata: { ...state.requestdata, loading: true },
      };
    case SUCCESS_DATA_REQUEST:
      return {
        ...state,
        requestdata: { ...state.requestdata, loading: false },
      };
    case FAIL_DATA_REQUEST:
      return {
        ...state,
        requestdata: {
          ...state.requestdata,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object,
};
