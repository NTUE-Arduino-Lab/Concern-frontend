import React from "react";
import ReactEcharts from "echarts-for-react";

const StudentChart = () => {

  const option = {
    title: {
        text: '郭昀甄的專注度統計',
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
        data: ['11:30:33','11:30:43','11:30:53','11:31:03','11:31:13','11:31:23','11:31:33']
    },
    yAxis: {
        data: ["不專心","普通","專心"]
        // type: 'value'
    },
    series : [
        {
            name:'郭昀甄',
            type:'line',
            data:["專心", "不專心", "普通", "普通", "專心", "普通", "專心"]
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
export default StudentChart;
