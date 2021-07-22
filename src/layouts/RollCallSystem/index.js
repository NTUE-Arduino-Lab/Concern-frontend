/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Checkbox from "@material-ui/core/Checkbox";
import Loading from "../../component/Loading";
import Alert from "../../component/Alert";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setClassroomDataID, setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import {
  getRollCallStatus,
  startRollCall,
  setPersonalLeave,
} from "../../store/actions";

const RollCallSystem = () => {
  //設定倒數時間
  const [time, setTime] = useState(60);

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  //左邊側邊欄設定目前頁面
  const {
    uiState: { classroomDataIDState },
    uiDispatch,
  } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.rollCallSystem);
  }, [uiDispatch]);

  //取得後台資料
  const {
    state: {
      courseWeeksData: { courseWeeks, courseWeeksDataLoading },
      classroomTimeStatus: { isClassing },
      rollCallSystemData: {
        shouldAttendCount,
        attentCount,
        personalLeaveCount,
        absenceCount,
        rollcallTime,
        classmatesInList,
        classmatesUnlisted,
        rollCallSystemDataLoading,
      },
    },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
    getRollCallStatus(dispatch, { classroomDataID: classroomDataIDState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomDataIDState]);

  const callStartRollCallApi = (duration) => {
    startRollCall({
      classroomDataID: classroomDataIDState,
      duration: duration,
    });
  };

  //按下開始點名的按鈕
  const submitHandler = (e) => {
    if (isClassing) {
      e.preventDefault();
      document.getElementById("submit").disabled = true;
      document.getElementById("text_time").disabled = true;
      document.getElementById("text_title").textContent = "學生端點名中，倒數";
      callStartRollCallApi(time);
      timeCountHandler();
    } else {
      e.preventDefault();
      setAlertshow(true);
      setAlerttext("目前課程尚未進行中，無法點名！");
    }
  };

  //倒數計時時間到
  var rollcall_interval;
  const timeOutHandler = () => {
    clearInterval(rollcall_interval);
    document.getElementById("text_time").value = "0";
    document.getElementById("text_title").textContent = "點名限定時間";
    document.getElementById("text_time").disabled = false;
    document.getElementById("submit").disabled = false;
    getRollCallStatus(dispatch, { classroomDataID: classroomDataIDState });
  };

  //倒數讀秒
  let timeCount = time - 1;
  const timeCountHandler = () => {
    rollcall_interval = setInterval(() => {
      document.getElementById("text_time").value = timeCount;
      timeCount--;
      if (timeCount < -1) {
        timeOutHandler();
      }
    }, 1000);
  };

  //判斷是否為編輯狀態
  const [editMode, seteditMode] = useState(false);

  const editModeChange = () => {
    if (editMode) {
      document.getElementById("editMode").textContent = "編輯學生名單";
    } else {
      document.getElementById("editMode").textContent = "完成編輯";
    }
    seteditMode(!editMode);
  };

  //學生請假設定
  const [editPersonalLeave, isEditPersonalLeave] = useState(false);
  const personalLeaveHandler = (event) => {
    setPersonalLeave({
      classroomDataID: classroomDataIDState,
      studentID: event.target.value,
      truefalse: event.target.checked,
    });
    isEditPersonalLeave(true);
  };

  useEffect(() => {
    if (editPersonalLeave && editMode === false) {
      getRollCallStatus(dispatch, { classroomDataID: classroomDataIDState });
      isEditPersonalLeave(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  //課堂出席判斷
  const attendanceHandler = (attendanceArray) => {
    if (attendanceArray.some((x) => x === 1)) {
      return {
        attendanceStyles: `${styles.td} ${styles.td_green}`,
        attendanceText: "出席",
      };
    } else if (attendanceArray.some((x) => x === -1)) {
      return { attendanceStyles: styles.td, attendanceText: "請假" };
    } else {
      return {
        attendanceStyles: `${styles.td} ${styles.td_red}`,
        attendanceText: "缺席",
      };
    }
  };

  //點名出席判斷
  const attendanceStateHandler = (attendanceState) => {
    if (attendanceState === 0) {
      return "X";
    } else if (attendanceState === 1) {
      return "V";
    } else {
      return "△";
    }
  };

  return (
    <Fragment>
      {courseWeeksDataLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : rollCallSystemDataLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : courseWeeks.length === 0 ? (
        <div className={styles.noData}>目前尚無資料</div>
      ) : (
        <>
          <Alert
            show={Alertshow}
            onHide={() => setAlertshow(false)}
            text={Alerttext}
          />
          <div className={styles.container}>
            <select
              className={styles.select}
              onChange={(e) => setClassroomDataID(uiDispatch, e.target.value)}
            >
              {courseWeeks.map((courseWeeks) => (
                <option
                  value={courseWeeks.classroomDataID}
                  key={courseWeeks.classroomDataID}
                  selected={
                    courseWeeks.classroomDataID === classroomDataIDState
                      ? "select"
                      : ""
                  }
                >
                  {courseWeeks.weekName}
                </option>
              ))}
            </select>
            {classmatesInList.length === 0 &&
            classmatesUnlisted.length === 0 ? (
              <div className={styles.rollCallNoData}>目前尚無資料</div>
            ) : (
              <>
                <div className={styles.sectionTop}>
                  <div className={styles.studentNumber}>
                    <div className={styles.title}>應到人數</div>
                    <div
                      className={styles.number}
                    >{`${shouldAttendCount}人`}</div>
                  </div>
                  <div className={styles.studentNumber}>
                    <div className={styles.title}>實到人數</div>
                    <div className={styles.number}>{`${attentCount}人`}</div>
                  </div>
                  <div className={styles.studentCondition}>
                    <div
                      className={styles.condition}
                    >{`請假學生 ${personalLeaveCount} 人`}</div>
                    <div
                      className={styles.condition}
                    >{`缺席學生 ${absenceCount} 人`}</div>
                  </div>
                  <div className={styles.settingRollCallTime}>
                    <form onSubmit={submitHandler}>
                      <div className={styles.setTimeSectionTop}>
                        <div id="text_title">點名限定時間</div>
                        <input
                          type="text"
                          onChange={(e) => setTime(e.target.value)}
                          className={styles.inputSection}
                          id="text_time"
                          value={time}
                        ></input>
                        秒
                        <button
                          className={styles.submitBtn}
                          type="submit"
                          id="submit"
                        >
                          開始點名
                        </button>
                      </div>
                      <div>系統提示：學生需在限定時間內按下點名按鈕</div>
                    </form>
                  </div>
                </div>
                <div className={styles.tipTitle}>
                  系統提示：僅計算已登入於學生系統的名單
                </div>
                <div className={styles.editBtnSection}>
                  <button
                    className={styles.editBtnSection_btn}
                    id="editMode"
                    onClick={editModeChange}
                  >
                    編輯點名狀態
                  </button>
                </div>
                <div className={styles.studentList}>
                  <div className={styles.thead}>
                    <div className={styles.th_content}>
                      <div className={`${styles.td} ${styles.td_checkbox}`}>
                        請假
                      </div>
                      <div className={styles.th}>出席狀況</div>
                      <div className={styles.th}>學生姓名</div>
                      <div className={styles.th}>學生學號</div>
                      {rollcallTime.map((time) => (
                        <div className={styles.th}>{time}</div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    {classmatesInList.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        {classmatesInList.map((studentInList) => (
                          <div
                            className={styles.td_content}
                            key={studentInList.studentID}
                          >
                            <div
                              className={`${styles.td} ${styles.td_checkbox}`}
                            >
                              <Checkbox
                                value={studentInList.studentID}
                                onChange={personalLeaveHandler}
                                disabled={editMode === false}
                                defaultChecked={studentInList.personalLeave}
                                color="#000"
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </div>
                            <div
                              className={
                                attendanceHandler(studentInList.attendance)
                                  .attendanceStyles
                              }
                            >
                              {
                                attendanceHandler(studentInList.attendance)
                                  .attendanceText
                              }
                            </div>
                            <div className={styles.td}>
                              {studentInList.studentName}
                            </div>
                            <div className={styles.td}>
                              {studentInList.studentID}
                            </div>
                            {studentInList.attendance.map((attendanceState) => (
                              <div
                                className={
                                  attendanceState === 0
                                    ? `${styles.td} ${styles.td_red}`
                                    : `${styles.td}`
                                }
                              >
                                {attendanceStateHandler(attendanceState)}
                              </div>
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                    {classmatesUnlisted.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        {classmatesUnlisted.map((studentUnList) => (
                          <div
                            className={styles.td_content}
                            key={studentUnList.studentID}
                          >
                            <div
                              className={`${styles.td} ${styles.td_checkbox}`}
                            ></div>
                            <div
                              className={`${styles.td} ${styles.td_unListState}`}
                            >
                              無登錄
                            </div>
                            <div className={styles.td}>
                              {studentUnList.studentName}
                            </div>
                            <div className={styles.td}>
                              {studentUnList.studentID}
                            </div>
                            {studentUnList.attendance.map((attendanceState) => (
                              <div
                                className={
                                  attendanceState === 0
                                    ? `${styles.td} ${styles.td_red}`
                                    : `${styles.td}`
                                }
                              >
                                {attendanceStateHandler(attendanceState)}
                              </div>
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default RollCallSystem;
