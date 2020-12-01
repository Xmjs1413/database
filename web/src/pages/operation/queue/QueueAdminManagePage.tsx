import * as React from 'react';
import SubTitleTable from '../../../components/table/SubTitleTable';
import QueueChart from './QueueChart';
const data = require('./ChartData.json');
const vcoreData = data.map((ele:Array<any>)=>{
    const item = ele[1];
    ele[1] = item*Math.random(); 
    return ele;
});

const yarnColumns = [
    {
        title: "日期",
        dataIndex: "date"
    },
    {
        title: "查询数据",
        dataIndex: "select_data"
    },
    {
        title: "小时",
        dataIndex: "hour"
    },
    {
        title: "任务提交数(均值)",
        dataIndex: "average_submit"
    },
    {
        title: "持续时间",
        dataIndex: "alive_time"
    },
    {
        title: "任务数",
        dataIndex: "task_num"
    },
    {
        title: "内存占用(MB·S)",
        dataIndex: "am_used"
    }
];

const impalaColumns = [
    {
        title: "日期",
        dataIndex: "date"
    },
    {
        title: "查询数据",
        dataIndex: "select_data"
    },
    {
        title: "小时",
        dataIndex: "hour"
    },
    {
        title: "任务提交数",
        dataIndex: "task_submit"
    },
    {
        title: "持续时间",
        dataIndex: "alive_time"
    },
    {
        title: "任务数",
        dataIndex: "task_num"
    },
    {
        title: "每台内存占用",
        dataIndex: "am_used"
    }
];

const yarnData: Array<object> = [];
for (let i = 0; i < 20; i++) {
    const item = {
        key: i,
        date: "20201023",
        select_data: "17600",
        hour: "22",
        average_submit: "1271",
        alive_time: "20s到40s",
        task_num: "35643",
        am_used: "16到40 MB·S"

    };
    yarnData.push(item);
};

const impalaData: Array<object> = [];
for (let i = 0; i < 20; i++) {
    const item = {
        key:i,
        date: "20201023",
        select_data: "32081",
        hour: "22",
        task_submit: "8068",
        alive_time: "5到10s",
        task_num: "26777",
        am_used: "1到5g"
    };
    impalaData.push(item);
};

const QueueAdminManagePage = () => {
    return (
        <div>
            <div style={{backgroundColor:"#fff",padding:"20px 0px",marginLeft:"12px",marginBottom:"10px"}} >
                <SubTitleTable title="yarn日均任务情况" dataSource={yarnData} columns={yarnColumns} />
                <SubTitleTable title="impala日均任务情况" dataSource={impalaData} columns={impalaColumns} />
            </div>
            <div style={{backgroundColor:"#fff",padding:"20px 0px",marginLeft:"12px"}} >
                <QueueChart data={data} title="yarn资源队列内存使用情况" />
                <QueueChart data={vcoreData} title="yarn资源队列vcore使用情况" />
            </div>
        </div>
    )
};


export default QueueAdminManagePage;
