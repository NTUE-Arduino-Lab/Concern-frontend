import React, { useContext } from "react";
import ReactEcharts from "echarts-for-react";
//Store
import { StoreContext } from "../../store/reducer";

const StudentChart = (prop) => {
  const { studentID, concernRangeMax, concernRangeMin } = prop;
  const {
    state: {
      studentConcernInfo: { studentConcernData },
    },
  } = useContext(StoreContext);

  const studentInfo = studentConcernData.find((x) => x.studentID === studentID);
  const concernRange = (concernDegree) => {
    if (concernDegree === null) {
      return "";
    } else if (concernDegree >= concernRangeMax) {
      return "專心";
    } else if (
      concernDegree < concernRangeMax &&
      concernDegree > concernRangeMin
    ) {
      return "普通";
    } else if (concernDegree <= concernRangeMin) {
      return "不專心";
    }
  };

  var newConcernDegreeArray = studentInfo.concernDegreeArray.map(function (
    value
  ) {
    return concernRange(value);
  });

  // // console.log(studentInfo.timeLineArray);

  const option = {
    title: {
      text: `${studentInfo.studentName}的專注度統計`,
      x: "70",
    },
    tooltip: {
      trigger: "axis",
    },
    // legend: {
    //     // orient: 'vertical',
    //     top: 20,
    //     right: 50,
    //     data:['A','B','C']
    // },
    xAxis: {
      data: studentInfo.timeLineArray,
      // splitLine: {
      //   show: true, //为false 时隐藏
      //   lineStyle: {
      //     color: "rgba(0,0,0,0.2)" //设置分割线颜色
      //   }
      // }
    },
    yAxis: {
      data: ["不專心", "普通", "專心"],
      type: "category",
      splitLine: {
        show: true, //为false 时隐藏
        lineStyle: {
          color: "rgba(0,0,0,0.1)", //设置分割线颜色
        },
      },
    },
    series: [
      {
        name: studentInfo.studentName,
        type: "line",
        data: newConcernDegreeArray,
      },
      // {
      //     name:'郭昀甄',
      //     type:'line',
      //     data:["專心", "不專心", "普通", "專心", "不專心", "專心", "專心"]
      // },
      // {
      //     name:'沈桓民',
      //     type:'line',
      //     data:["普通", "專心", "不專心", "普通", "專心", "不專心", "專心"]
      // }
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} />
    </div>
  );
};
export default StudentChart;
