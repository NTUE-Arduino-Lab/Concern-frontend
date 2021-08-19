/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/image/logo2.png";
import path from "../../utils/path";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

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
  getAllDataID,
  setReducerDataReset,
  setReducerCourseDataReset,
} from "../../store/actions";

const Login = () => {
  const history = useHistory();

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  const [teacherName, setTeacherName] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [teacherIDCheck, setTeacherIDCheck] = useState("");
  const [logining, isLogining] = useState(false);

  const {
    state: {
      requestdata: { loading, error },
    },
    dispatch,
  } = useContext(StoreContext);

  const {
    uiState: { teacherDataIDState },
    uiDispatch,
  } = useContext(UIStoreContext);

  //進到頁面初始化
  useEffect(() => {
    setReducerDataReset(dispatch);
    setReducerCourseDataReset(dispatch);
    setTeacherDataID(uiDispatch, "");
    setCourseDataID(uiDispatch, "");
    setClassroomDataID(uiDispatch, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //登入按鈕控制
  const submitHandler = (e) => {
    e.preventDefault();
    setReducerDataReset(dispatch);
    if (teacherName === "") {
      setAlertshow(true);
      setAlerttext("請輸入教師名稱");
    } else if (teacherID === "" || teacherIDCheck === "") {
      setAlertshow(true);
      setAlerttext("請輸入教師ID");
    } else {
      if (teacherIDCheck !== teacherID) {
        setAlertshow(true);
        setAlerttext("ID輸入不正確");
      } else {
        isLogining(true);
        getAllDataID(dispatch, uiDispatch, {
          teacherName: teacherName,
          teacherID: teacherID,
        });
      }
    }
  };

  //確定已取得ID資料，即可進到專注統計頁
  useEffect(() => {
    if (logining === true && loading === false && teacherDataIDState !== "") {
      history.push(path.home);
    } else if (logining === true && loading === false && error !== "") {
      isLogining(false);
      setAlertshow(true);
      setAlerttext("登入發生錯誤");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, teacherDataIDState]);

  return (
    <Fragment>
      <Alert
        show={Alertshow}
        onHide={() => setAlertshow(false)}
        text={Alerttext}
      />
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img src={logo} className={styles.logoSection_pic}></img>
        </div>
        <div className={styles.formSection}>
          <div className={styles.title}>登入管理後台網站</div>
          {loading ? (
            <div className={styles.loading}>
              <Loading />
            </div>
          ) : (
            <form onSubmit={submitHandler} className={styles.form}>
              <input
                id="teacherNameInput"
                type="text"
                placeholder="輸入教師名稱"
                onChange={(e) => setTeacherName(e.target.value)}
                className={styles.form_input}
              ></input>
              <input
                id="teacherIDInput"
                type="text"
                placeholder="輸入自訂ID"
                onChange={(e) => setTeacherID(e.target.value)}
                className={styles.form_input}
              ></input>
              <input
                id="teacherIDInput"
                type="text"
                placeholder="再次輸入自訂ID"
                onChange={(e) => setTeacherIDCheck(e.target.value)}
                className={styles.form_input}
              ></input>
              <button type="submit" className={styles.submitBtn}>
                登入
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
