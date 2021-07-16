/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import path from "../../utils/path";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setClassroomDataID, setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getRollCallStatus, startRollCall } from "../../store/actions";

const RollCallSystem = () => {
  const [time, setTime] = useState(60);

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
      courseWeeksData: { courseWeeks },
      rollCallSystemData: {
        shouldAttendCount,
        attentCount,
        personalLeaveCount,
        absenceCount,
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
    e.preventDefault();
    document.getElementById("submit").disabled = true;
    document.getElementById("text_time").disabled = true;
    document.getElementById("text_title").textContent = "學生端點名中，倒數";
    callStartRollCallApi(time);
    timeCountHandler();
  };

  //倒數計時時間到
  var rollcall_interval;
  const timeOutHandler = () => {
    clearInterval(rollcall_interval);
    document.getElementById("text_time").value = "0";
    document.getElementById("text_title").textContent = "點名限定時間";
    document.getElementById("text_time").disabled = false;
    document.getElementById("submit").disabled = false;
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

  return (
    <Fragment>
      <div className={styles.container}>
        <select
          className={styles.select}
          onChange={(e) => setClassroomDataID(uiDispatch, e.target.value)}
        >
          {courseWeeks.map((courseWeeks) => (
            <option
              value={courseWeeks.classroomDataID}
              key={courseWeeks.classroomDataID}
            >
              {courseWeeks.weekName}
            </option>
          ))}
        </select>
        <div className={styles.sectionTop}>
          <div className={styles.studentNumber}>
            <div className={styles.title}>應到人數</div>
            <div className={styles.number}>{`${shouldAttendCount}人`}</div>
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
                <button className={styles.submitBtn} type="submit" id="submit">
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
          <button className={styles.editBtnSection_btn}>編輯點名狀態</button>
        </div>
        <div className={styles.studentList}>
          <div className={styles.thead}>
            <div className={styles.th_content}>
              <div className={styles.th}>請假</div>
              <div className={styles.th}>出席狀況</div>
              <div className={styles.th}>學生姓名</div>
              <div className={styles.th}>學生學號</div>
              <div className={styles.th}>9:10</div>
              <div className={styles.th}>10:10</div>
            </div>
          </div>
          <div className={styles.tbody}>
            <div className={styles.td_content}>
              <div className={styles.td}></div>
              <div className={styles.td}>出席</div>
              <div className={styles.td}>陳小花</div>
              <div className={styles.td}>110934001</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}></div>
              <div className={styles.td}>出席</div>
              <div className={styles.td}>陳大花</div>
              <div className={styles.td}>110934002</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}></div>
              <div className={styles.td}>出席</div>
              <div className={styles.td}>郭小花</div>
              <div className={styles.td}>110934003</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}></div>
              <div className={styles.td}>出席</div>
              <div className={styles.td}>郭大花</div>
              <div className={styles.td}>110934004</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RollCallSystem;
