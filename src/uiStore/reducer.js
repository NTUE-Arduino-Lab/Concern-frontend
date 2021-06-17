import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import constants from "./actionTypes";

export const UIStoreContext = createContext();

const initialState = {
  asideBar: {
    activeItem: "/",
  },
};

const reducer = (uiState, action) => {
  switch (action.type) {
    case constants.SET_ASIDEBAR_ACTIVEITEM:
      return {
        ...uiState,
        asideBar: {
          activeItem: action.payload,
        },
      };
    default:
      return uiState;
  }
};

export function UIStoreProvider(props) {
  const [uiState, uiDispatch] = useReducer(reducer, initialState);
  const value = { uiState, uiDispatch };

  return (
    <UIStoreContext.Provider value={value}>
      {props.children}
    </UIStoreContext.Provider>
  );
}

UIStoreProvider.propTypes = {
  children: PropTypes.object,
};
