/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
import Aside from "../../component/Aside";
import path from "../../utils/path";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";
import ClassChart from "../../component/ClassChart";
import StudentChart from "../../component/StudentChart";

const Home = () => {
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.home);
  }, [uiDispatch]);

  const [activeNavItem, setActiveNavItem] = useState("info");

  useEffect(() => {
    console.log("a = " + activeNavItem);
  }, [activeNavItem]);

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
              <div className={styles.time}>{`開始時間：9:10`}</div>
              <div className={styles.time}>{`休息時間：10:00 - 10:10`}</div>
              <div className={styles.time}>{`休息時間：11:00 - 11:10`}</div>
              <div className={styles.time}>{`結束時間：上課中...`}</div>
            </div>
          </div>
          <div className={styles.rank}>
            <div className={styles.title}>班級專注排行榜</div>
            <div className={styles.rank_section}>
              <div className={styles.percentRank}>
                <div>專注百分比排行</div>
                <div className={styles.rank_content}>
                  <div className={styles.content_person}>
                    <div className={styles.personTop}>
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>97%</div>
                    </div>
                  </div>
                  <div className={styles.content_person}>
                    <div
                      className={`${styles.personTop} ${styles.personTop_second}`}
                    >
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>97%</div>
                    </div>
                  </div>
                  <div className={styles.content_person}>
                    <div
                      className={`${styles.personTop} ${styles.personTop_third}`}
                    >
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>97%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.percentRank}>
                <div>持續專注時間排行</div>
                <div className={styles.rank_content}>
                  <div className={styles.content_person}>
                    <div className={styles.personTop}>
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>60mins</div>
                    </div>
                  </div>
                  <div className={styles.content_person}>
                    <div
                      className={`${styles.personTop} ${styles.personTop_second}`}
                    >
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>60mins</div>
                    </div>
                  </div>
                  <div className={styles.content_person}>
                    <div
                      className={`${styles.personTop} ${styles.personTop_third}`}
                    >
                      <div className={styles.name}>李淯萱</div>
                      <div className={styles.number}>110934017</div>
                    </div>
                    <div className={styles.personBottom}>
                      <div className={styles.value}>60mins</div>
                    </div>
                  </div>
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
                <table>
                  <thead>
                    <tr>
                      <td>學生姓名</td>
                      <td>Google Meet名稱</td>
                      <td>學生學號</td>
                      <td>專注度程度</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>郭昀甄</td>
                      <td>郭昀甄</td>
                      <td>110934002</td>
                      <td>專心</td>
                    </tr>
                    <tr>
                      <td>郭昀甄</td>
                      <td>郭昀甄</td>
                      <td>110934002</td>
                      <td>專心</td>
                    </tr>
                    <tr>
                      <td>郭昀甄</td>
                      <td>郭昀甄</td>
                      <td>110934002</td>
                      <td>專心</td>
                    </tr>
                    <tr>
                      <td>郭昀甄</td>
                      <td>郭昀甄</td>
                      <td>110934002</td>
                      <td>專心</td>
                    </tr>
                    <tr>
                      <td>郭昀甄</td>
                      <td>郭昀甄</td>
                      <td>110934002</td>
                      <td>專心</td>
                    </tr>
                  </tbody>
                </table>
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
