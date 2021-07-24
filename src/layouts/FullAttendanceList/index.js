/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Loading from "../../component/Loading";
import Alert from "../../component/Alert";
import XLSX from 'xlsx';

//uistore
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getTotalRollcallStatus } from "../../store/actions";

const FullAttendanceList = () => {
  const {
    uiState: { courseDataIDState },
    uiDispatch
  } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.fullAttendanceList);
  }, [uiDispatch]);

  //Store
  const {
    state: {
      teacherData: { courses },
      totalRollcallListData: {
        totalRollcallWeek,
        totalRollcallList,
        totalRollcallListDataLoading,
        error
      }
    },
    dispatch
  } = useContext(StoreContext);

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");
  //excel表頭
  const [header, setheader] = useState([
    {
      title: '學生姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '學生學號',
      dataIndex: 'id',
      key: 'id',
      // className: 'text-monospace', 這不知道要幹嘛的?
    },
  ]);

  //excel內容  
  const [excelList, setexcelList] = useState([]);

  //error
  useEffect(() => {
    if (error !== "" && error !== null) {
      setAlertshow(true);
      setAlerttext(error);
    }
    else {
      setAlertshow(false);
    }
  }, [error]);

  //載入完整點名名單
  useEffect(() => {
    if (courseDataIDState !== "") {
      getTotalRollcallStatus(dispatch, { courseDataID: courseDataIDState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDataIDState]);

  //載入日期
  useEffect(() => {
    let headers_push = [
      {
        title: '學生姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '學生學號',
        dataIndex: 'id',
        key: 'id',
      },
    ];
    for (let [index, weekname] of totalRollcallWeek.entries()) {
      let newElement = {
        title: weekname,
        dataIndex: 'data' + index,
        key: 'data' + index,
      };
      headers_push.push(newElement);
    }
    setheader(headers_push);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRollcallWeek]);

  //載入學生資料
  useEffect(() => {
    let excelList_push = [];
    for (let student of totalRollcallList) {
      let newElement = {
        name: student.studentName,
        id: student.studentID,
      };
      for (let [index] of totalRollcallWeek.entries()) {
        newElement['data' + index] = transform_status(student.rollcallStatus[index]);
      }
      excelList_push.push(newElement);
    }
    setexcelList(excelList_push);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRollcallList]);

  //狀態數字變成符號
  const transform_status = (param) => {
    // -2 X 代表曠課、-1 ◎ 代表點名未全到、0 △ 代表請假、1 V 出席
    switch (param) {
      case -2:
        return 'X';
      case -1:
        return '◎';
      case 0:
        return '△';
      case 1:
        return 'V';
      default:
        return '無點名';
    }
  }
  //id比對目前是哪堂課，將課程名稱加到excel檔名
  const findcourseName = (id) => {
    var name = courses.filter(function (course) {
      return course.courseDataID === id;
    });
    return name[0].courseName + "_學生完整點名名單.xlsx";
  }
  //輸出Excel
  const exportExcel = (headers, data, fileName) => {
    try {
      const tips = [
        {
          title: 'X 曠課； ◎ 點名未全到； △ 請假； V 出席',
          dataIndex: 'statustips',
          key: 'statustips',
        }
      ];
      const _tips = tips
        .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});
      //String.fromCharCode ABCD
      //reduce將陣列中每項元素（由左至右）累加
      const _headers = headers
        .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 2 }))
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});
      let _data;
      if (data.length !== 0) {
        _data = data
          .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 3) })))
          // 对刚才的结果进行降维处理（二维数组变成一维数组）
          //concat() 方法用來合併多個陣列
          .reduce((prev, next) => prev.concat(next))
          // 转换成 worksheet 需要的结构
          .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
      }
      else {
        _data = data;
      }
      // 合併 headers 和 data
      const output = Object.assign({}, _tips, _headers, _data);
      // 获取所有单元格的位置
      const outputPos = Object.keys(output);
      // 计算出范围 ,["A1",..., "H2"]
      const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
      //設定col寬度都是100
      const wscols = headers.map(w => { return { wpx: 100 } });
      // 建構 workbook 对象
      const wb = {
        SheetNames: ['mySheet'],
        Sheets: {
          mySheet: Object.assign(
            {},
            output,
            {
              //取得工作表有效範圍,["A1",..., "H2"]
              '!ref': ref,
              //欄位寬度
              '!cols': wscols,
            },
          ),
        },
      };
      // 導出 Excel
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      setAlertshow(true);
      setAlerttext("下載時發生錯誤！");
    }
  }

  return (
    <Fragment>
      <Alert
        show={Alertshow}
        onHide={() => { setAlertshow(false); setAlerttext(""); }}
        text={Alerttext}
      />
      <div className={styles.container}>
        <div className={styles.TipAndButton}>
          <div className={styles.tipSide}>
            X 曠課； ◎ 點名未全到； △ 請假； V 出席
          </div>
          <div className={styles.buttonSide}>
            <button disabled={totalRollcallListDataLoading || totalRollcallWeek.length === 0 ? true : false} className={styles.buttonSide_button} onClick={() => exportExcel(header, excelList, findcourseName(courseDataIDState))}>下載</button>
          </div>
        </div>
        {totalRollcallListDataLoading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : totalRollcallWeek.length === 0 ? (
          <div className={styles.nothing}>
            尚無點名資料
          </div>
        ) : (
          <div className={styles.attendanceList}>
            <div className={styles.thead}>
              <div className={styles.th_content}>
                <div className={styles.th}>學生姓名</div>
                <div className={styles.th}>學生學號</div>
                {totalRollcallWeek.map((week, index) => (
                  <div className={styles.th} key={"weekname" + index + "_" + week}>
                    {week}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tbody}>
              {totalRollcallList.map((studentinfo) => (
                <div className={styles.td_content}>
                  <div className={styles.td}>{studentinfo.studentName}</div>
                  <div className={styles.td}>{studentinfo.studentID}</div>
                  {studentinfo.rollcallStatus.map((status, index) => (
                    <div className={`${styles.td} ${styles.rollcall_status} ${status === -2 ? `${styles.red}` : ""}`} key={studentinfo.studentID + "status_" + index + status}>
                      {transform_status(status)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FullAttendanceList;
