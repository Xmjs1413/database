import * as React from 'react';
import { Empty } from 'antd';
import ReactEcharts from 'echarts-for-react';

const QueueChart = (props:any) => {

    const options = {
        title:{
           text:props.title || "",
           textStyle:{
             fontSize:14
           },
           left:"center"
        },
        legend:{
            data:['Beijing AQI','copy AQI','copy AQI1','copy AQI2','copy AQI3'],
            bottom:"0"
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: props.data?.map(function(item:any[]) {
                return item[0];
            }),
            boundaryGap:true
        },
        yAxis:{
            type: 'value'
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: [
            {
            name: 'Beijing AQI',
            type: 'line',
            data: props.data?.map(function (item:any[]) {
                return item[1]+100;
            })
            },
            {
            name: 'copy AQI',
            type: 'line',
            data: props.data?.map(function (item:any[]) {
                return item[1]+220;
            })
            },
            {
                name: 'copy AQI1',
                type: 'line',
                data: props.data?.map(function (item:any[]) {
                    return item[1]+230*Math.random();
                })
            },
            {
                name: 'copy AQI2',
                type: 'line',
                data: props.data?.map(function (item:any[]) {
                    return item[1]+240;
                })
            },
            {
                name: 'copy AQI3',
                type: 'line',
                data: props.data?.map(function () {
                    return 300;
                })
            }
        ]
    };

    return (
        <div style={{padding:"20px"}}>
            {
              props.data && props.data?.length > 0 
              ? <ReactEcharts 
                  option={options as any}
                  notMerge
                  lazyUpdate
                  style={{height: '500px', width: '100%'}}
                />
              : <Empty /> 
            }
        </div>
    )
};

export default QueueChart;
