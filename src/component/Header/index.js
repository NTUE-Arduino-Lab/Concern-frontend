/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useContext } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import logo from "../../assets/image/logo.png";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setCourseDataID, setClassroomDataID } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getTeacherData, getCourseWeeksData } from "../../store/actions";

const Header = () => {
  const teacherDataID = "60e2740e29b4000015939450";
  const courseDataID = "60e45e364f20c20015730a53";
  const classroomDataID = "60e45b1b4f20c20015730a52";

  const {
    state: {
      teacherData: { teacherName, courses },
      courseWeeksData: { courseWeeks, courseWeeksDataLoading },
    },
    dispatch,
  } = useContext(StoreContext);

  const {
    uiState: { courseDataIDState, classroomDataIDState },
    uiDispatch,
  } = useContext(UIStoreContext);

  useEffect(() => {
    setCourseDataID(uiDispatch, courseDataID);
    setClassroomDataID(uiDispatch, classroomDataID);
    getTeacherData(dispatch, { teacherDataID: teacherDataID });
    getCourseWeeksData(dispatch, { courseDataID: courseDataID });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (courseWeeks[0] !== undefined) {
      if (courseWeeksDataLoading === false) {
        setClassroomDataID(uiDispatch, courseWeeks[0].classroomDataID);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseWeeksDataLoading]);

  const courseSelectHandler = (course) => {
    setCourseDataID(uiDispatch, course);
    getCourseWeeksData(dispatch, { courseDataID: course });
  };

  // useEffect(() => {
  //   console.log("classroomDataIDState: " + classroomDataIDState);
  // }, [classroomDataIDState]);

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.leftSide_logo}>
          <img src={logo} />
        </div>
        <div className={styles.leftSide_title}>課堂監控後台</div>
        <select
          className={styles.leftSide_select}
          onChange={(e) => courseSelectHandler(e.target.value)}
        >
          {courses.map((course) => (
            <option
              value={course.courseDataID}
              key={course.courseDataID}
              selected={
                course.courseDataID === courseDataIDState ? "selected" : ""
              }
            >
              {course.courseName}
            </option>
          ))}
        </select>
        <button className={styles.leftSide_button}>新增課程</button>
      </div>
      <div className={styles.rightSide}>
        <div
          className={styles.rightSide_title}
        >{`你好，${teacherName} 老師`}</div>
      </div>
    </header>
  );
};

export default Header;
