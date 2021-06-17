import constants from './actionTypes';

export const setAsideActiveItem = (uiDispatch, activeItem) => {
    uiDispatch({
      type: constants.SET_ASIDEBAR_ACTIVEITEM,
      payload: activeItem,
    });
  };