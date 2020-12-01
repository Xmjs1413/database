import * as React from 'react';
import ReactEcharts from 'echarts-for-react';

const CapacityChart = (props: any) => {

    const options = {
        title: {
            text: props.title || "",
            textStyle: {
                fontSize: 14
            },
            left: "center"
        },
        grid: {
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };

    return (
        <div>
            <ReactEcharts
                option={options as any}
                notMerge
                lazyUpdate
                style={{ height: '400px', width: '100%' }}
            />
        </div>
    )
};

export default CapacityChart;