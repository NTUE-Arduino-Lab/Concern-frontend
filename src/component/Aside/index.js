/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Alert from "../Alert";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";
import { StoreContext } from "../../store/reducer";

const Aside = () => {
  const location = useLocation();
  const history = useHistory();
  const { uiState, uiDispatch } = useContext(UIStoreContext);

  const {
    state: { isRollCall },
  } = useContext(StoreContext);

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  const onClick = (linkPath) => {
    if (!isRollCall) {
      setAsideActiveItem(uiDispatch, linkPath);
      history.push(linkPath);
    } else {
      setAlertshow(true);
      setAlerttext("正在點名中，無法切換頁面");
    }
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
          <aside className={styles.aside}>
            <div
              onClick={() => onClick(path.home)}
              className={`${styles.aside_item} ${
                uiState.asideBar.activeItem === path.home
                  ? `${styles.aside_item__active}`
                  : ""
              }`}
            >
              專注度統計
            </div>
            <div
              onClick={() => onClick(path.studentsList)}
              className={`${styles.aside_item} ${
                uiState.asideBar.activeItem === path.studentsList
                  ? `${styles.aside_item__active}`
                  : ""
              }`}
            >
              學生名單
            </div>
            <div
              onClick={() => onClick(path.rollCallSystem)}
              className={`${styles.aside_item} ${
                uiState.asideBar.activeItem === path.rollCallSystem
                  ? `${styles.aside_item__active}`
                  : ""
              }`}
            >
              點名系統
            </div>
            <div
              onClick={() => onClick(path.fullAttendanceList)}
              className={`${styles.aside_item} ${
                uiState.asideBar.activeItem === path.fullAttendanceList
                  ? `${styles.aside_item__active}`
                  : ""
              }`}
            >
              完整點名名單
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Aside;
