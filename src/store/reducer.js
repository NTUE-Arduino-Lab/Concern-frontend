import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import {
  SET_ROLLCALLSTATUS,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
} from "./actionTypes";

export const StoreContext = createContext();

const initialState = {
  //點名系統
  shouldAttendCount: 0,
  attentCount: 0,
  personalLeaveCount: 0,
  absenceCount: 0,
  //要資料狀態
  requestdata: {
    loading: false,
    error: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ROLLCALLSTATUS:
      return {
        ...state,
        shouldAttendCount: action.payload.shouldAttendCount,
        attentCount: action.payload.attentCount,
        personalLeaveCount: action.payload.personalLeaveCount,
        absenceCount: action.payload.absenceCount,
      };
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
