import constants from './actionTypes';

export const setTeacherDataID = (uiDispatch, teacherDataID) => {
  uiDispatch({
    type: constants.SET_TEACHERDATAID,
    payload: teacherDataID,
  });
  localStorage.setItem('teacherDataID', teacherDataID);
};

export const setCourseDataID = (uiDispatch, courseDataID) => {
  uiDispatch({
    type: constants.SET_COURSEDATAID,
    payload: courseDataID,
  });
  localStorage.setItem('courseDataID', courseDataID);
};

export const setClassroomDataID = (uiDispatch, classroomDataID) => {
  uiDispatch({
    type: constants.SET_CLASSROOMDATAID,
    payload: classroomDataID,
  });
  localStorage.setItem('classroomDataID', classroomDataID);
};

export const setAsideActiveItem = (uiDispatch, activeItem) => {
    uiDispatch({
      type: constants.SET_ASIDEBAR_ACTIVEITEM,
      payload: activeItem,
    });
  };
