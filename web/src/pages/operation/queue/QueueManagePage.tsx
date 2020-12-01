import * as React from 'react';
import SubTitleTable from '../../../components/table/SubTitleTable';

const yarnData: any = [];
const impalaData: any = [];

const yarnColumns = [
    {
        title: '日期',
        dataIndex: 'date'
    },
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: 'yarn总任务数',
        dataIndex: 'totaltask'
    },
    {
        title: 'yarn执行失败任务数',
        dataIndex: 'executefailedtask'
    },
    {
        title: 'yarn慢查询个数',
        dataIndex: 'slowrequire'
    }
];

const impalaColumns = [
    {
        title: '日期',
        dataIndex: 'date'
    },
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: 'impala总任务数',
        dataIndex: 'totaltask'
    },
    {
        title: 'impala执行失败任务数',
        dataIndex: 'executefailedtask'
    },
    {
        title: 'impala慢查询个数',
        dataIndex: 'slowrequire'
    },
    {
        title: 'impala编译失败任务数',
        dataIndex: 'compilefailedtask'
    }
];

for (let i = 0; i < 20; i++) {
    const yarnitem = {
        key: i,
        date: 20200917,
        username: "yt_analysis" + i,
        totaltask: 360,
        executefailedtask: 4,
        slowrequire: 0
    };
    const impalaitem = {
        key: i,
        date: 20200917,
        username: "fx_analysis" + i,
        totaltask: 21702,
        executefailedtask: 31,
        slowrequire: 2,
        compilefailedtask: 684
    };
    yarnData.push(yarnitem);
    impalaData.push(impalaitem);
}

const QueueManagePage = () => {
    return (
        <div style={{backgroundColor:"#fff",padding:"20px 0px",marginLeft:"12px",marginBottom:"10px"}}>
            <SubTitleTable title="用户每日YARN任务信息" dataSource={yarnData} columns={yarnColumns} />
            <SubTitleTable title="用户每日IMPALA任务信息" dataSource={impalaData} columns={impalaColumns} />
        </div>
    )
};

export default QueueManagePage;
