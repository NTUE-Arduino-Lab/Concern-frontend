/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

const Aside = () => {
  const { uiState, uiDispatch } = useContext(UIStoreContext);

  const onClick = (linkPath) => {
    setAsideActiveItem(uiDispatch, linkPath);
  };

  return (
    <aside className={styles.aside}>
      <Link to={path.home}>
        <div
          onClick={()=>onClick(path.home)}
          className={`${styles.aside_item} ${
            uiState.asideBar.activeItem === path.home
              ? `${styles.aside_item__active}`
              : ""
          }`}
        >
          專注度統計
        </div>
      </Link>
      <Link to={path.studentsList}>
        <div
          onClick={()=>onClick(path.studentsList)}
          className={`${styles.aside_item} ${
            uiState.asideBar.activeItem === path.studentsList
              ? `${styles.aside_item__active}`
              : ""
          }`}
        >
          學生名單
        </div>
      </Link>
      <Link to={path.rollCallSystem}>
        <div
          onClick={()=>onClick(path.rollCallSystem)}
          className={`${styles.aside_item} ${
            uiState.asideBar.activeItem === path.rollCallSystem
              ? `${styles.aside_item__active}`
              : ""
          }`}
        >
          點名系統
        </div>
      </Link>
      <Link to={path.fullAttendanceList}>
        <div
          onClick={()=>onClick(path.fullAttendanceList)}
          className={`${styles.aside_item} ${
            uiState.asideBar.activeItem === path.fullAttendanceList
              ? `${styles.aside_item__active}`
              : ""
          }`}
        >
          完整點名名單
        </div>
      </Link>
    </aside>
  );
};

export default Aside;
