/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as QueryString from "query-string";
import "../../select.scss";
import styles from "./styles.module.scss";

import logo from "../../assets/image/logo.png";
import path from "../../utils/path";
import Alert from "../../component/Alert";

// react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import {
  setTeacherDataID,
  setCourseDataID,
  setClassroomDataID,
} from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import {
  getTeacherData,
  addCourse,
  getCourseWeeksData,
} from "../../store/actions";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { teacherDataID, courseDataID, classroomDataID } = QueryString.parse(
    location.search
  );

  // const teacherDataID = "60e2740e29b4000015939450";
  // const courseDataID = "60e45e364f20c20015730a53";
  // const classroomDataID = "60e45b1b4f20c20015730a52";

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  //確認刪除畫面的開關
  const [show, setShow] = useState(false);

  //新增課程相關
  const [addingCourse, isAddingCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");

  //是否切換課程
  const [changeCourse, isChangeCourse] = useState(false);

  const [getTeacherCourse, isGetTeacherCourse] = useState(false);

  const {
    state: {
      teacherData: { teacherName, courses, teacherDataLoading },
      isFinishAddCourse,
      courseWeeksData: { courseWeeks, courseWeeksDataLoading },
    },
    dispatch,
  } = useContext(StoreContext);

  const {
    uiState: { teacherDataIDState, courseDataIDState },
    uiDispatch,
  } = useContext(UIStoreContext);

  useEffect(() => {
    if (teacherDataID !== undefined) {
      setTeacherDataID(uiDispatch, teacherDataID);
      getTeacherData(dispatch, { teacherDataID: teacherDataID });
    } else {
      setTeacherDataID(uiDispatch, localStorage.getItem("teacherDataID"));
      getTeacherData(dispatch, {
        teacherDataID: localStorage.getItem("teacherDataID"),
      });
    }
    if (courseDataID !== undefined) {
      setCourseDataID(uiDispatch, courseDataID);
      getCourseWeeksData(dispatch, { courseDataID: courseDataID });
    } else {
      setCourseDataID(uiDispatch, localStorage.getItem("courseDataID"));
      getCourseWeeksData(dispatch, {
        courseDataID: localStorage.getItem("courseDataID"),
      });
    }
    if (classroomDataID !== undefined) {
      setClassroomDataID(uiDispatch, classroomDataID);
    } else {
      setClassroomDataID(uiDispatch, localStorage.getItem("classroomDataID"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //如果切換課程，classroom就會是最近的週次
    if (changeCourse) {
      if (courseWeeks[0] !== undefined) {
        if (courseWeeksDataLoading === false) {
          setClassroomDataID(uiDispatch, courseWeeks[0].classroomDataID);
          isChangeCourse(false);
          history.push(location.pathname);
        }
      } else {
        if (courseWeeksDataLoading === false) {
          //如果課程都沒有資料的話，將classroomDataID設為空的
          setClassroomDataID(uiDispatch, "");
          isChangeCourse(false);
          history.push(location.pathname);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseWeeksDataLoading]);

  useEffect(() => {
    if (isFinishAddCourse) {
      isGetTeacherCourse(true);
      getTeacherData(dispatch, { teacherDataID: teacherDataIDState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinishAddCourse]);

  //如果原先老師都沒有課程，一旦新增課程，就設定CourseID為新增的課程
  useEffect(() => {
    if (getTeacherCourse && !teacherDataLoading) {
      if (courses.length === 1) {
        setCourseDataID(uiDispatch, courses[0].courseDataID);
        isGetTeacherCourse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherDataLoading]);

  //切換老師課程
  const courseSelectHandler = (course) => {
    isChangeCourse(true);
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
        teacherDataID: teacherDataIDState,
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
    document.getElementById("addCourseInput").value = "";
    isAddingCourse(false);
  };

  //按下登出，再次確認
  const logOutHandler = () => {
    setShow(true);
  };

  //確定登出
  const logOutComfirm = () => {
    setShow(false);
    history.push(path.login);
  };

  return (
    <>
      {location.pathname === path.login ? (
        <></>
      ) : (
        <>
          <Alert
            show={Alertshow}
            onHide={() => setAlertshow(false)}
            text={Alerttext}
          />
          <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Body>
              <h4>是否確定要登出？</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShow(false)}
              >
                取消
              </Button>
              <Button variant="danger" size="sm" onClick={logOutComfirm}>
                登出
              </Button>
            </Modal.Footer>
          </Modal>
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
                      course.courseDataID === courseDataIDState
                        ? "selected"
                        : ""
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
              <button onClick={logOutHandler} className={styles.logOutBtn}>
                登出
              </button>
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
