import React from "react";
import ReactEcharts from "echarts-for-react";

const ClassChart = (prop) => {
    const { classroomConcernData, concernRangeMax, concernRangeMin } = prop;
    
    const timeArray = classroomConcernData.map(x => x.time);
    const concernDegreeArray = classroomConcernData.map(x => x.aveConcernDegree);
    
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
    
      var newConcernDegreeArray = concernDegreeArray.map(function (
        value
      ) {
        return concernRange(value);
      });

  const option = {
    title: {
        text: '全班的平均專注度統計',
        x: 'center'
    },
    tooltip:{
        trigger: 'axis'
    },
    // legend: {
    //     // orient: 'vertical',
    //     top: 20,
    //     right: 50,
    //     data:['A','B','C']
    // },
    xAxis: {
        data: timeArray,
    },
    yAxis: {
        data: ["不專心","普通","專心"],
        splitLine: {
            show: true, //为false 时隐藏
            lineStyle: {
              color: "rgba(0,0,0,0.1)", //设置分割线颜色
            },
          },
    },
    series : [
        {
            name:'全班平均專注度',
            type:'line',
            data: newConcernDegreeArray,
        }
    ]
    };

    return (
      <div>
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    );
};
export default ClassChart;
