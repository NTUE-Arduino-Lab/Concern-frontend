/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
import Aside from "../../component/Aside";
import path from "../../utils/path"
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

const FullAttendanceList = () => {
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.fullAttendanceList);
  },[uiDispatch]);
  
  return (
    <Fragment>
      <Header />
      <Aside />
      <div className={styles.container}></div>
    </Fragment>
  );
};

export default FullAttendanceList;
