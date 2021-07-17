/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import logo from "../../assets/image/logo.png";
import Alert from "../../component/Alert";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setCourseDataID, setClassroomDataID } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import {
  getTeacherData,
  addCourse,
  getCourseWeeksData,
} from "../../store/actions";

const Header = () => {
  const teacherDataID = "60e2740e29b4000015939450";
  const courseDataID = "60e45e364f20c20015730a53";
  const classroomDataID = "60e45b1b4f20c20015730a52";
  // 測試用的
  // const teacherDataID = "60d4914b4a910b00158018ca";
  // const courseDataID = "60de73cfe4480444509e1b2e";
  // const classroomDataID="60dd2a3d9b567c224c85482c";

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  //新增課程相關
  const [addingCourse, isAddingCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");

  const {
    state: {
      teacherData: { teacherName, courses },
      isFinishAddCourse,
      courseWeeksData: {
        courseWeeks,
        courseWeeksDataLoading,
      },
    },
    dispatch,
  } = useContext(StoreContext);

  const {
    uiState: { courseDataIDState },
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
    else{
      if (courseWeeksDataLoading === false) {
        setClassroomDataID(uiDispatch, "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseWeeksDataLoading]);

  useEffect(() => {
    if (isFinishAddCourse) {
      getTeacherData(dispatch, { teacherDataID: teacherDataID });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinishAddCourse]);

  //切換老師課程
  const courseSelectHandler = (course) => {
    setCourseDataID(uiDispatch, course);
    getCourseWeeksData(dispatch, { courseDataID: course });
  };

  //點選新增課程按鈕
  const addCourseHandler = () => {
    isAddingCourse(true);
  };

  //新增課程確定按鈕
  const addCourseSubmitHandler = () => {
    if (newCourseName !== "") {
      addCourse(dispatch, {
        teacherDataID: teacherDataID,
        courseName: newCourseName,
      });
      document.getElementById("addCourseInput").value = "";
      isAddingCourse(false);
      setNewCourseName("");
    } else {
      setAlertshow(true);
      setAlerttext("請輸入新增之課程名稱！");
    }
  };

  //新增課程取消按鈕
  const addCourseCancelHandler = () => {
    isAddingCourse(false);
  };

  return (
    <>
      <Alert
        show={Alertshow}
        onHide={() => setAlertshow(false)}
        text={Alerttext}
      />
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
          <button
            className={
              addingCourse
                ? `${styles.leftSide_button} ${styles.leftSide_button__none}`
                : `${styles.leftSide_button}`
            }
            onClick={addCourseHandler}
          >
            新增課程
          </button>
          <form
            className={
              addingCourse
                ? `${styles.leftSide_form}`
                : `${styles.leftSide_form} ${styles.leftSide_form__none}`
            }
          >
            <input
              id="addCourseInput"
              type="text"
              placeholder="請輸入課程名稱"
              onChange={(e) => setNewCourseName(e.target.value)}
              className={styles.leftSide_textInput}
            ></input>
            <div
              onClick={addCourseSubmitHandler}
              className={`${styles.leftSide_formBtn} ${styles.leftSide_submitBtn}`}
            >
              確定
            </div>
            <div
              onClick={addCourseCancelHandler}
              className={`${styles.leftSide_formBtn} ${styles.leftSide_cancelBtn}`}
            >
              取消
            </div>
          </form>
        </div>
        <div className={styles.rightSide}>
          <div
            className={styles.rightSide_title}
          >{`你好，${teacherName} 老師`}</div>
        </div>
      </header>
    </>
  );
};

export default Header;
