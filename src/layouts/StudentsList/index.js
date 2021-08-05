/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Loading from "../../component/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from "../../component/Alert";
import XLSX from 'xlsx';

// uiStore
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

//Store
import { StoreContext } from "../../store/reducer";
import { getClassmatesList, editOneStudent, deleteOneStudent, addStudent, addMultipleStudents } from "../../store/actions";

const StudentsList = () => {
  // uiStore
  const {
    uiState: { courseDataIDState },
    uiDispatch
  } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.studentsList);
  }, [uiDispatch]);

  //Store
  const {
    state: {
      teacherData: { courses },
      classmatesListData: {
        classmatesList,
        addFailList,
        classmatesListDataLoading,
        error
      }
    },
    dispatch
  } = useContext(StoreContext);

  //載入學生名單
  useEffect(() => {
    if (courseDataIDState !== "" && courses.length !== 0) {
      getClassmatesList(dispatch, { courseDataID: courseDataIDState });
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDataIDState]);

  //error
  useEffect(() => {
    // console.log("error"+error);
    if (error !== "" && error !== null) {
      setAlertshow(true);
      setAlerttext(error);
    }
    else {
      setAlertshow(false);
    }
  }, [error]);

  //Alert的開關及內容
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState("");

  //確認刪除畫面的開關
  const [show, setShow] = useState(false);

  //儲存目前新增的學生姓名
  const [addstudentName, setaddStudentName] = useState("");
  //儲存目前新增的學生Google meet名
  const [addstudentGoogleName, setaddStudentGoogleName] = useState("");
  //儲存目前新增的學生id
  const [addstudentID, setaddStudentID] = useState("");

  //設定目前是否為編輯模式
  const [editMode, seteditMode] = useState(false);
  //設定目前開啟編輯的學生id
  const [editOpenID, seteditOpenID] = useState("");
  //設定目前是否開啟編輯子畫面
  const [editOpen, seteditOpen] = useState(false);
  //設定目前開啟編輯的學生在table裡的順序
  const [editstudentIndex, seteditstudentIndex] = useState("");
  //儲存目前編輯的學生姓名
  const [editstudentName, seteditStudentName] = useState("");
  //儲存目前編輯的學生Google meet名
  const [editstudentGoogleName, seteditStudentGoogleName] = useState("");
  //儲存目前編輯的學生id
  const [editstudentID, seteditStudentID] = useState("");
  //編輯模式改變
  const editModeChange = () => {
    if (editMode) {
      document.getElementById("editMode").textContent = "編輯學生名單";
    }
    else {
      document.getElementById("editMode").textContent = "完成編輯";
    }
    seteditMode(!editMode);
    seteditOpen(false);
  }
  //全部重整
  const reset = () => {
    setShow(false);
    setAlertshow(false);
    setAlerttext("");
    seteditMode(false);
    if (courses.length !== 0)
      document.getElementById("editMode").textContent = "編輯學生名單";
    seteditOpen(false);
    seteditOpenID("");
    seteditstudentIndex("");
    seteditStudentName("");
    seteditStudentGoogleName("");
    seteditStudentID("");
  }
  //開啟編輯的畫面
  const editStart = (studentIndex, StudentName, StudentGoogleName, studentID) => {
    seteditOpen(true);
    seteditstudentIndex(studentIndex);
    seteditOpenID(studentID);
    seteditStudentName(StudentName);
    seteditStudentGoogleName(StudentGoogleName);
    seteditStudentID(studentID);
  }
  //X返回
  const editBack = () => {
    seteditOpen(false);
    seteditstudentIndex("");
    seteditStudentName("");
    seteditStudentGoogleName("");
    seteditStudentID("");
  }
  //更新單筆學生資料
  const editFinish = () => {
    if (editstudentName === "" || editstudentID === "") {
      setAlertshow(true);
      setAlerttext("學生名稱和學號為必填，您尚未填寫！");
    }
    else {
      editOneStudent(dispatch, { courseDataID: courseDataIDState, studentIndex: editstudentIndex, studentName: editstudentName, studentGoogleName: editstudentGoogleName, studentID: editstudentID });
      seteditMode(true);
      seteditOpen(false);
      seteditOpenID("");
    }

  }
  //開啟刪除的確認畫面
  const editDelete_Modal = (StudentName, studentID) => {
    setShow(true);
    seteditStudentName(StudentName);
    seteditStudentID(studentID);
  }
  //刪除該筆學生
  const editDelete = () => {
    deleteOneStudent(dispatch, { courseDataID: courseDataIDState, studentID: editstudentID });
    setShow(false);
  }
  //手動新增學生
  const submitHandler = (e) => {
    e.preventDefault();
    if (addstudentName === "" || addstudentID === "") {
      setAlertshow(true);
      setAlerttext("學生名稱和學號為必填，您尚未填寫！");
    }
    else {
      addStudent(dispatch, { courseDataID: courseDataIDState, studentName: addstudentName, studentGoogleName: addstudentGoogleName, studentID: addstudentID });
      setaddStudentName("");
      setaddStudentGoogleName("");
      setaddStudentID("");
    }
  };
  // 上傳檔案
  const HandleImportFile = (e) => {
    let { files } = e.target
    // 获取文件名称
    let name = files[0].name
    // 获取文件后缀
    let suffix = name.substr(name.lastIndexOf("."));

    let reader = new FileReader();
    reader.onload = (event) => {
      try {
        // 判断文件類型是否正確
        if (".xlsx" !== suffix) {
          setAlertshow(true);
          setAlerttext("檔案格式不正確，必須是.xlsx！");
          return false;
        }
        let { result } = event.target
        // 讀取文件
        let workbook = XLSX.read(result, { type: 'binary' });
        let datas = []
        // 循環文件中的每個工作表
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 將獲取到表中的數據轉化為json格式
            datas = datas.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: '' }));
            //把欄名字改成英文
            datas = JSON.parse(JSON.stringify(datas).replace(/學生Google Meet名稱/g, "studentGoogleName").replace(/學生姓名/g, "studentName").replace(/學生學號/g, "studentID"))
            //篩選格式有沒有錯誤
            // eslint-disable-next-line array-callback-return
            datas.map((data) => {
              if (data.studentName === "" || data.studentID === "") {
                throw Error("學生姓名和學號為必填！")
              }
              data.studentName = data.studentName.toString();
              data.studentGoogleName = data.studentGoogleName.toString();
              data.studentID = data.studentID.toString();
            })
            // console.log(datas);
            addMultipleStudents(dispatch, { courseDataID: courseDataIDState, studentsDataArray: datas });
          }
        }
      } catch (e) {
        setAlertshow(true);
        if (e.message !== "") {
          setAlerttext(e.message);
        }
        else {
          setAlerttext("檔案格式不正確！");
        }
      }
    }
    reader.readAsBinaryString(files[0]);
    //解決同個檔不能上傳兩次
    e.target.value = '';
  }

  return (
    <Fragment>
      <Alert
        show={Alertshow}
        onHide={() => { setAlertshow(false); setAlerttext(""); }}
        text={Alerttext}
      />
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <h4>你確定要刪除 {editstudentName} 的資料嗎？</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShow(false)}>
            取消
          </Button>
          <Button variant="danger" size="sm" onClick={editDelete}>
            刪除
          </Button>
        </Modal.Footer>
      </Modal>
      {courses.length === 0 ? (
        <div className={styles.noData}>
          目前尚無資料
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.studentsList}>
            <div className={styles.editBtnSection}>
              <button disabled={classmatesListDataLoading ? true : false} className={styles.editBtnSection_btn} id="editMode" onClick={() => editModeChange()} >編輯學生名單</button>
            </div>
            {classmatesListDataLoading ? (
              <div className={styles.loading}>
                <Loading />
              </div>
            ) : classmatesList.length === 0 ? (
              <div className={styles.nothing}>
                尚無學生資料
              </div>
            ) : (
              <div className={styles.table}>
                <div className={styles.thead}>
                  <div className={styles.th_content}>
                    <div className={styles.th}>學生姓名</div>
                    <div className={styles.th}>Google Meet名稱</div>
                    <div className={styles.th}>學生學號</div>
                    {editMode ? (<div className={styles.th}></div>) : ""}
                  </div>
                </div>
                <div className={styles.tbody}>
                  {classmatesList.map((student, index) => (
                    <Fragment key={"classmates" + student.studentID}>
                      <div
                        className={`${styles.td_content} ${editMode && !editOpen ? `${styles.editmode}` : ""
                          }${editMode && editOpen && editOpenID === student.studentID ? `${styles.editOpen}` : ""
                          }
                  `}
                      >
                        <div className={styles.td}>
                          {student.studentName}
                          {editMode && editOpen && editOpenID === student.studentID ? (
                            <input
                              type="text"
                              onChange={(e) => seteditStudentName(e.target.value)}
                              className={styles.editmode_input}
                              value={editstudentName}
                            ></input>
                          ) : ""}
                        </div>
                        <div className={styles.td}>
                          {student.studentGoogleName === "" ? (
                            <div className={styles.empty_title}>空</div>) :
                            (`${student.studentGoogleName}`)
                          }
                          {editMode && editOpen && editOpenID === student.studentID ? (
                            <input
                              type="text"
                              onChange={(e) => seteditStudentGoogleName(e.target.value)}
                              className={styles.editmode_input}
                              value={editstudentGoogleName}
                            ></input>
                          ) : ""}
                        </div>
                        <div className={styles.td}>
                          {student.studentID}
                          {editMode && editOpen && editOpenID === student.studentID ? (
                            <input
                              type="text"
                              onChange={(e) => seteditStudentID(e.target.value)}
                              className={styles.editmode_input}
                              value={editstudentID}
                            ></input>
                          ) : ""}
                        </div>
                        {editMode ? (<div className={styles.td}>
                          {editOpen && editOpenID === student.studentID ? (
                            <button className={styles.editoption_back_btn} onClick={() => editBack()}>X</button>
                          )
                            :
                            (
                              <div className={styles.editoption}>
                                <button className={styles.editoption_edit_btn} onClick={() => editStart(index, student.studentName, student.studentGoogleName, student.studentID)}>編輯</button>
                                <button className={styles.editoption_delete_btn} onClick={() => editDelete_Modal(student.studentName, student.studentID)}>刪除</button>
                              </div>
                            )
                          }
                          {editOpen && editOpenID === student.studentID ? (
                            <button className={styles.editoption_finish_btn} onClick={() => editFinish()}>完成</button>
                          ) : ""}
                        </div>) : ""}
                      </div>
                      <hr></hr>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
          {!editMode ? (
            <div className={styles.description}>
              功能：
              <div className={styles.description_box}>
                <div className={styles.description_number}>1.</div>
                已登錄於名單中的學生<br></br>
                自動允許加入GoogleMeet教室
              </div>
              <div className={styles.description_box}>
                <div className={styles.description_number}>2.</div>
                已登錄於名單中的學生<br></br>
                可進行點名功能
              </div>
            </div>
          ) :
            (
              <div className={styles.addStudent}>
                <div className={styles.addStudentbox}>
                  <div className={styles.addStudentbox_title}>手動新增學生</div>
                  <form onSubmit={submitHandler}>
                    <div className={styles.inputbox}>
                      <div className={styles.input_title}>學生姓名</div>
                      <input
                        type="text"
                        onChange={(e) => setaddStudentName(e.target.value)}
                        value={addstudentName}
                        placeholder="請輸入"
                      ></input>
                    </div>
                    <div className={styles.inputbox}>
                      <div className={styles.input_title}>Google Meet名稱</div>
                      <input
                        type="text"
                        onChange={(e) => setaddStudentGoogleName(e.target.value)}
                        value={addstudentGoogleName}
                        placeholder="請輸入"
                      ></input>
                    </div>
                    <div className={styles.inputbox}>
                      <div className={styles.input_title}>學生學號</div>
                      <input
                        type="text"
                        onChange={(e) => setaddStudentID(e.target.value)}
                        value={addstudentID}
                        placeholder="請輸入"
                      ></input>
                    </div>
                    <button type="submit" id="submit">
                      新增
                    </button>
                  </form>
                </div>
                <div className={styles.addStudentbox}>
                  <div className={styles.addStudentbox_title}>匯入學生名單</div>
                  <div className={styles.studentexcel_box}>
                    <div className={styles.studentexcel_word}>
                      <div className={styles.studentexcel_number}>1.</div>
                      下載名單格式範例
                    </div>
                    <a href="https://docs.google.com/spreadsheets/d/1K44DMz2uJKlh49ASiG62Xc0C3ocgegZeSIfkGBOeBoA/export?format=xlsx">
                      下載格式範例
                    </a>
                  </div>
                  <div className={styles.studentexcel_box}>
                    <div className={styles.studentexcel_word}>
                      <div className={styles.studentexcel_number}>2.</div>
                      建立符合格式之名單檔
                    </div>
                  </div>
                  <div className={styles.studentexcel_box}>
                    <div className={styles.studentexcel_word}>
                      <div className={styles.studentexcel_number}>3.</div>
                      匯入檔案(.xlsx)
                    </div>
                    <label className={styles.upload_label}>
                      <input className={styles.upload_input} onChange={HandleImportFile} type="file" />
                      上傳檔案
                    </label>
                  </div>
                  {
                    addFailList.length !== 0 ? (
                      <div className={styles.faillist_box}>
                        <div className={styles.studentexcel_word}>
                          <div className={styles.studentexcel_number}>4.</div>
                          重複上傳學生名單（學號相同）
                        </div>
                        {addFailList.map((student, index) =>
                          <div className={styles.studentexcel_word} key={"fail" + student.studentID}>
                            <div>
                              {student.studentName}
                            </div>
                            <div>
                              {student.studentID}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : ""
                  }
                </div>
              </div>
            )}
        </div>
      )}
    </Fragment>
  );
};

export default StudentsList;
