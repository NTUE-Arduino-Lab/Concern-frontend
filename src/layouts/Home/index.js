/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
import Aside from "../../component/Aside";
import ClassChart from "../../component/ClassChart";
import StudentChart from "../../component/StudentChart";
import path from "../../utils/path";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getClassroomTimeStatus, getRankData } from "../../store/actions";

const Home = () => {
  const classroomDataID = "60dd2a3d9b567c224c85482c";

  const {
    state: {
      classroomTimeStatus: { isClassing, startTime, restTime, endTime },
      rankData: { concernPercentageRank, bestLastedRank },
    },
    dispatch,
  } = useContext(StoreContext);

  //從後台撈上課時間資料
  useEffect(() => {
    getClassroomTimeStatus(dispatch, { classroomDataID: classroomDataID });
    getRankData(dispatch, { classroomDataID: classroomDataID, rankCount: 3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //設定名次不同的漸層色
  const rankBg = (rankNumber) => {
    if (rankNumber === 1) {
      return "";
    } else if (rankNumber === 2) {
      return styles.personTop_second;
    } else {
      return styles.personTop_third;
    }
  };

  //換算持續專注時間
  const bestLastedTime = (bestLasted) => {
    var timeArray = bestLasted.split(":");
    var mins = timeArray[0] * 60 + timeArray[1] * 1;
    return Math.floor(mins); 
  }

  //設定左邊側邊欄目前的頁面
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.home);
  }, [uiDispatch]);

  //設定全班資訊目前選擇的項目
  const [activeNavItem, setActiveNavItem] = useState("info");

  useEffect(() => {}, [activeNavItem]);

  return (
    <Fragment>
      <Header />
      <Aside />
      <div className={styles.container}>
        <select className={styles.select}>
          <option>2021/05/20（四）</option>
        </select>
        <div className={styles.sectionTop}>
          <div className={styles.timeRecord}>
            <div className={styles.title}>本次上課時段紀錄</div>
            <div className={styles.timeRecord_section}>
              <div className={styles.timeSection}>
                <div className={styles.time}>開始時間：</div>
                <div className={styles.time}>{startTime}</div>
              </div>
              {restTime.map((restTimeRecord) => (
                <div
                  className={styles.timeSection}
                  key={restTime.restStartTime}
                >
                  <div className={styles.time}>休息時間：</div>
                  <div
                    className={styles.time}
                  >{`${restTimeRecord.restStartTime} - ${restTimeRecord.restEndTime}`}</div>
                </div>
              ))}
              <div className={styles.timeSection}>
                <div className={styles.time}>結束時間：</div>
                {isClassing ? (
                  <div className={`${styles.time} ${styles.redTime}`}>
                    上課中...
                  </div>
                ) : (
                  <div className={styles.time}>{endTime}</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.rank}>
            <div className={styles.title}>班級專注排行榜</div>
            <div className={styles.rank_section}>
              <div className={styles.percentRank}>
                <div>專注百分比排行</div>
                <div className={styles.rank_content}>
                  {concernPercentageRank.map((rank) => (
                    <div className={styles.content_person} key={rank.rank}>
                      <div
                        className={`${styles.personTop} ${rankBg(rank.rank)}`}
                      >
                        <div className={styles.name}>{rank.studentName}</div>
                        <div className={styles.number}>{rank.studentID}</div>
                      </div>
                      <div className={styles.personBottom}>
                        <div className={styles.value}>
                          {rank.concernPercentage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.percentRank}>
                <div>持續專注時間排行</div>
                <div className={styles.rank_content}>
                  {bestLastedRank.map((rank) => (
                    <div className={styles.content_person} key={rank.rank}>
                      <div
                        className={`${styles.personTop} ${rankBg(rank.rank)}`}
                      >
                        <div className={styles.name}>{rank.studentName}</div>
                        <div className={styles.number}>{rank.studentID}</div>
                      </div>
                      <div className={styles.personBottom}>
                        <div className={styles.value}>{`${bestLastedTime(rank.bestLasted)}mins`}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.classInfo}>
          <div className={styles.title}>全班資訊</div>
          <div className={styles.classInfo_content}>
            <ul className={styles.nav}>
              <li
                onClick={() => setActiveNavItem("info")}
                className={`${styles.navItem} ${
                  activeNavItem === "info" ? `${styles.navItem_active}` : ""
                }`}
              >
                專注資訊
              </li>
              <li
                onClick={() => setActiveNavItem("chart")}
                className={`${styles.navItem} ${
                  activeNavItem === "chart" ? `${styles.navItem_active}` : ""
                }`}
              >
                統計圖表
              </li>
            </ul>
            <div
              className={`${styles.navContent} ${
                activeNavItem === "info" ? "" : `${styles.navContent_none}`
              }`}
            >
              <div className={styles.infoContent}>
                <div className={styles.table}>
                  <div className={styles.thead}>
                    <div className={styles.th_content}>
                      <div className={styles.th}>學生姓名</div>
                      <div className={styles.th}>Google Meet名稱</div>
                      <div className={styles.th}>學生學號</div>
                      <div className={styles.th}>專注度程度</div>
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    <div className={styles.td_content}>
                      <div className={styles.td}>陳小花</div>
                      <div className={styles.td}>陳小花</div>
                      <div className={styles.td}>110934001</div>
                      <div className={styles.td}>專心</div>
                    </div>
                    <div className={styles.td_content}>
                      <div className={styles.td}>陳大花</div>
                      <div className={styles.td}>陳大花</div>
                      <div className={styles.td}>110934002</div>
                      <div className={styles.td}>不專心</div>
                    </div>
                    <div className={styles.td_content}>
                      <div className={styles.td}>郭小花</div>
                      <div className={styles.td}>郭小花</div>
                      <div className={styles.td}>110934003</div>
                      <div className={styles.td}>普通</div>
                    </div>
                    <div className={styles.td_content}>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>110934004</div>
                      <div className={styles.td}>專心</div>
                    </div>
                    <div className={styles.td_content}>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>110934004</div>
                      <div className={styles.td}>專心</div>
                    </div>
                    <div className={styles.td_content}>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>郭大花</div>
                      <div className={styles.td}>110934004</div>
                      <div className={styles.td}>專心</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.navContent} ${
                activeNavItem === "chart" ? "" : `${styles.navContent_none}`
              }`}
            >
              <div className={styles.statisticsContent}>
                {/* 本次課程結束後<br></br>將進行數據統計 */}
                <ClassChart />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.personInfo}>
          <div className={styles.title}>個人資訊</div>
          <div className={styles.personInfo_content}>
            <div className={styles.studentList}>
              <div className={styles.title}>學生選單</div>
              <div className={styles.students}>
                <div className={`${styles.student} ${styles.student_active}`}>
                  <div className={styles.name}>郭昀甄</div>
                  <div className={styles.number}>110934002</div>
                </div>
                <div className={styles.student}>
                  <div className={styles.name}>李淯萱</div>
                  <div className={styles.number}>110934002</div>
                </div>
                <div className={styles.student}>
                  <div className={styles.name}>沈桓民</div>
                  <div className={styles.number}>110934002</div>
                </div>
              </div>
            </div>
            <div className={styles.concernDetail}>
              <div className={styles.concernSection}>
                <div className={styles.detailTitle}>專注度百分比</div>
                <div className={styles.number}>97%</div>
              </div>
              <div className={styles.concernSection}>
                <div className={styles.detailTitle}>平均專注數值</div>
                <div className={styles.number}>0.94</div>
              </div>
              <div className={styles.concernSection}>
                <div className={styles.detailTitle}>最高持續專注時間</div>
                <div className={styles.number}>35分鐘</div>
              </div>
            </div>
            <div className={styles.studentChart}>
              <StudentChart />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
