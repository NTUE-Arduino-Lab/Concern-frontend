/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useContext } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import logo from "../../assets/image/logo.png";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setCourseDataID } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getTeacherData } from "../../store/actions";

const Header = () => {
  const teacherDataID = "60d4914b4a910b00158018ca";

  const {
    state: {
      teacherData: { teacherName, courses },
    },
    dispatch,
  } = useContext(StoreContext);

  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    getTeacherData(dispatch, { teacherDataID: teacherDataID });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //一開始將課程courseDataID設定為老師所有課程中的第一個課程
  useEffect(() => {
    if (courses[0] !== undefined) {
      setCourseDataID(uiDispatch, courses[0].courseDataID);
    }
  }, [courses, uiDispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.leftSide_logo}>
          <img src={logo} />
        </div>
        <div className={styles.leftSide_title}>課堂監控後台</div>
        <select
          className={styles.leftSide_select}
          onChange={(e) => setCourseDataID(uiDispatch, e.target.value)}
        >
          {courses.map((course) => (
            <option value={course.courseDataID} key={course.courseDataID}>
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
