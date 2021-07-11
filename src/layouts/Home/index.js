/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import "../../select.scss";
import styles from "./styles.module.scss";
import ClassChart from "../../component/ClassChart";
import StudentChart from "../../component/StudentChart";
import Loading from "../../component/Loading";
import { PrettoSlider, sliderMarks } from "../../component/SliderStyle";
import path from "../../utils/path";

//uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setClassroomDataID, setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import {
  getClassroomTimeStatus,
  getRankData,
  getClassroomConcernInfo,
  getStudentConcernInfo,
} from "../../store/actions";

const Home = () => {
  const {
    uiState: { classroomDataIDState },
    uiDispatch,
  } = useContext(UIStoreContext);

  const {
    state: {
      courseWeeksData: { courseWeeks },
      classroomTimeStatus: {
        isClassing,
        startTime,
        restTime,
        endTime,
        timeStatusLoading,
      },
      rankData: { concernPercentageRank, bestLastedRank, rankDataLoading },
      studentConcernInfo: { studentConcernData, studentConcernInfoLoading },
      classroomConcernInfo: {
        classroomConcernData,
        classroomConcernInfoLoading,
      },
    },
    dispatch,
  } = useContext(StoreContext);

  //設定左邊側邊欄目前的頁面
  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.home);
  }, [uiDispatch]);

  //從後台撈上課時間資料
  const [classTimeSpacing, setClassTimeSpacing] = useState(1);
  const [studentTimeSpacing, setStudentTimeSpacing] = useState(1);

  useEffect(() => {
    getClassroomTimeStatus(dispatch, { classroomDataID: classroomDataIDState });
    getRankData(dispatch, {
      classroomDataID: classroomDataIDState,
      rankCount: 3,
    });
    getStudentConcernInfo(dispatch, {
      classroomDataID: classroomDataIDState,
      timeSpacing: studentTimeSpacing * 60,
    });
    getClassroomConcernInfo(dispatch, {
      classroomDataID: classroomDataIDState,
      timeSpacing: classTimeSpacing * 60,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomDataIDState]);

  //全班統計圖表改變呼叫api
  const callClassroomConcernInfoApi = () => {
    getClassroomConcernInfo(dispatch, {
      classroomDataID: classroomDataIDState,
      timeSpacing: classTimeSpacing * 60,
    });
  };

  const [studentTimeSpacingChange, isStudentTimeSpacingChange] =
  useState(false);

  //學生圖表改變呼叫api
  const callStudentConcernInfoApi = () => {
    isStudentTimeSpacingChange(true);
    getStudentConcernInfo(dispatch, {
      classroomDataID: classroomDataIDState,
      timeSpacing: studentTimeSpacing * 60,
    });
  };

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

  //時間換算成分鐘
  const timeChangeToMins = (time) => {
    var timeArray = time.split(":");
    var mins = timeArray[0] * 60 + timeArray[1] * 1;
    return Math.floor(mins);
  };

  //設定全班資訊目前選擇的項目
  const [activeNavItem, setActiveNavItem] = useState("info");
  useEffect(() => {}, [activeNavItem]);

  //平均專注數值判斷是否專心
  const concernRangeMax = 0.8;
  const concernRangeMin = 0.5;
  const concernRange = (aveConcern) => {
    if (aveConcern === null) {
      return "無";
    } else if (aveConcern >= concernRangeMax) {
      return "專心";
    } else if (aveConcern < concernRangeMax && aveConcern > concernRangeMin) {
      return "普通";
    } else if (aveConcern <= concernRangeMin) {
      return "不專心";
    }
  };

  //全班統計圖表SliderChange
  const classSliderChange = (event, newValue) => {
    setClassTimeSpacing(newValue);
  };

  //學生資訊-平均專注數值判斷
  const studentConcernRange = (aveConcern) => {
    if (aveConcern === null) {
      return styles.concernLevel_red;
    } else if (aveConcern >= concernRangeMax) {
      return styles.concernLevel_green;
    } else if (aveConcern < concernRangeMax && aveConcern > concernRangeMin) {
      return styles.concernLevel_yellow;
    } else if (aveConcern <= concernRangeMin) {
      return styles.concernLevel_red;
    }
  };

  //找尋特定的學生資訊
  const [studentID, setStudentID] = useState("");
  const [studentPersonalInfo, setStudentPersonInfo] = useState({});

  useEffect(() => {
    isStudentTimeSpacingChange(false);
    if (studentConcernData[0] !== undefined) {
      setStudentPersonInfo(studentConcernData[0]);
      setStudentID(studentConcernData[0].studentID);
    }
  }, [studentConcernData]);

  const findStudentInfo = (studentID) => {
    setStudentID(studentID);
    const studentInfo = studentConcernData.find(
      (x) => x.studentID === studentID
    );
    setStudentPersonInfo(studentInfo);
  };

  //學生圖表SliderChange
  const studentSliderChange = (event, newValue) => {
    setStudentTimeSpacing(newValue);
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
          <div className={styles.timeRecord}>
            <div className={styles.title}>本次上課時段紀錄</div>
            <div className={styles.timeRecord_section}>
              {timeStatusLoading ? (
                <div className={styles.loading}>
                  <Loading />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className={styles.rank}>
            <div className={styles.title}>班級專注排行榜</div>
            <div className={styles.rank_section}>
              {rankDataLoading ? (
                <div className={styles.loading}>
                  <Loading />
                </div>
              ) : (
                <>
                  <div className={styles.percentRank}>
                    <div>專注百分比排行</div>
                    <div className={styles.rank_content}>
                      {concernPercentageRank.map((rank) => (
                        <div className={styles.content_person} key={rank.rank}>
                          <div
                            className={`${styles.personTop} ${rankBg(
                              rank.rank
                            )}`}
                          >
                            <div className={styles.name}>
                              {rank.studentName}
                            </div>
                            <div className={styles.number}>
                              {rank.studentID}
                            </div>
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
                            className={`${styles.personTop} ${rankBg(
                              rank.rank
                            )}`}
                          >
                            <div className={styles.name}>
                              {rank.studentName}
                            </div>
                            <div className={styles.number}>
                              {rank.studentID}
                            </div>
                          </div>
                          <div className={styles.personBottom}>
                            <div className={styles.value}>{`${timeChangeToMins(
                              rank.bestLasted
                            )}mins`}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
              {studentConcernInfoLoading &&
              studentTimeSpacingChange === false ? (
                <div className={styles.loading}>
                  <Loading />
                </div>
              ) : (
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
                      {studentConcernData.map((student) => (
                        <div
                          className={styles.td_content}
                          key={student.studentID}
                        >
                          <div className={styles.td}>{student.studentName}</div>
                          <div className={styles.td}>
                            {student.studentGoogleName}
                          </div>
                          <div className={styles.td}>{student.studentID}</div>
                          <div
                            className={`${styles.td} ${
                              student.aveConcern <= concernRangeMin
                                ? `${styles.td_red}`
                                : ""
                            }`}
                          >
                            {concernRange(student.aveConcern)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${styles.navContent} ${
                activeNavItem === "chart" ? "" : `${styles.navContent_none}`
              }`}
            >
              <div className={styles.classSliderSection}>
                <div className={styles.classSlider}>
                  <Typography
                    id="discrete-slider-custom"
                    gutterBottom
                    className={styles.classSliderTitle}
                  >
                    計算時間區隔調整 （單位：分）
                  </Typography>
                  <PrettoSlider
                    defaultValue={1}
                    value={classTimeSpacing}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    marks={sliderMarks}
                    min={1}
                    max={10}
                    onChange={classSliderChange}
                    onChangeCommitted={callClassroomConcernInfoApi}
                  />
                </div>
              </div>
              {classroomConcernInfoLoading ? (
                <div className={styles.loading}>
                  <Loading />
                </div>
              ) : (
                <div>
                  <ClassChart
                    classroomConcernData={classroomConcernData}
                    concernRangeMax={concernRangeMax}
                    concernRangeMin={concernRangeMin}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.personInfo}>
          <div className={styles.title}>個人資訊</div>
          <div className={styles.personInfo_content}>
            {studentConcernInfoLoading && studentTimeSpacingChange === false ? (
              <div className={styles.loading}>
                <Loading />
              </div>
            ) : (
              <>
                <div className={styles.studentList}>
                  <div className={styles.title}>學生選單</div>
                  <div className={styles.students}>
                    {studentConcernData.map((student) => (
                      <div
                        className={`${styles.student} ${
                          studentID === `${student.studentID}`
                            ? `${styles.student_active}`
                            : ""
                        }`}
                        key={student.studentID}
                        onClick={() => findStudentInfo(`${student.studentID}`)}
                      >
                        <div className={styles.name}>{student.studentName}</div>
                        <div className={styles.number}>{student.studentID}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.concernDetail}>
                  <div className={styles.concernSection}>
                    <div className={styles.detailTitle}>課程參與比例</div>
                    <div className={styles.number}>
                      {studentPersonalInfo.attendTimePercentage}
                    </div>
                  </div>
                  <div className={styles.concernSection}>
                    <div className={styles.detailTitle}>專注百分比</div>
                    <div className={styles.number}>
                      {studentPersonalInfo.concernPercentage}
                    </div>
                  </div>
                  <div className={styles.concernSection}>
                    <div className={styles.detailTitle}>平均專注數值</div>
                    <div className={styles.number}>
                      {studentPersonalInfo.aveConcern}
                    </div>
                    <div
                      className={`${styles.concernLevel} ${studentConcernRange(
                        studentPersonalInfo.aveConcern
                      )}`}
                    >
                      {concernRange(studentPersonalInfo.aveConcern)}
                    </div>
                  </div>
                  <div className={styles.concernSection}>
                    <div className={styles.detailTitle}>最長專注時間</div>
                    <div className={styles.number}>
                      {studentPersonalInfo.bestLasted}
                    </div>
                  </div>
                </div>
                <div className={styles.studentChart}>
                  <div className={styles.classSliderSection}>
                    <div className={styles.classSlider}>
                      <Typography
                        id="discrete-slider-custom"
                        gutterBottom
                        className={styles.classSliderTitle}
                      >
                        計算時間區隔調整 （單位：分）
                      </Typography>
                      <PrettoSlider
                        defaultValue={1}
                        value={studentTimeSpacing}
                        aria-labelledby="discrete-slider-custom"
                        step={1}
                        marks={sliderMarks}
                        min={1}
                        max={10}
                        onChange={studentSliderChange}
                        onChangeCommitted={callStudentConcernInfoApi}
                      />
                    </div>
                  </div>
                  {studentConcernInfoLoading ? (
                    <div className={styles.loading}>
                      <Loading />
                    </div>
                  ) : studentPersonalInfo.studentID !== undefined ? (
                    <StudentChart
                      studentID={studentID}
                      concernRangeMax={concernRangeMax}
                      concernRangeMin={concernRangeMin}
                    />
                  ) : (
                    // <></>
                    <div className={styles.loading}>
                      <Loading />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
