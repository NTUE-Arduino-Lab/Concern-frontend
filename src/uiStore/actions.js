import constants from './actionTypes';

export const setCourseDataID = (uiDispatch, courseDataID) => {
  uiDispatch({
    type: constants.SET_COURSEDATAID,
    payload: courseDataID,
  });
};

export const setClassroomDataID = (uiDispatch, classroomDataID) => {
  uiDispatch({
    type: constants.SET_CLASSROOMDATAID,
    payload: classroomDataID,
  });
};

export const setAsideActiveItem = (uiDispatch, activeItem) => {
    uiDispatch({
      type: constants.SET_ASIDEBAR_ACTIVEITEM,
      payload: activeItem,
    });
  };
