import * as React from 'react';
import intl from '../../../components/intl/Index';
import SubTitleTable from '../../../components/table/SubTitleTable';
import PageTitle from '../../../components/title/PageTitle';

interface CapacityManagePageProps{
    tableData : Array<object>
}

const columns = [
    {
        title: "日期",
        dataIndex: "calcu_date"
    },
    {
        title: "库名",
        dataIndex: "hive_database"
    },
    {
        title: "空间大小",
        dataIndex: "volumn"
    }
];

const dataSource: Array<any> = [];

const CapacityManagePage = (props:CapacityManagePageProps) => {
    return (
        <div>
            <PageTitle title={intl.get("capacity_manage")} />
            <div style={{ backgroundColor: "#fff", padding: "20px 0px", marginLeft: "12px", marginBottom: "10px" }}>
                <SubTitleTable title="用户在hdfs上的quota使用限制和已使用情况" key="hive_database" dataSource={props.tableData} columns={columns} />
            </div>
        </div>
    )
};

export default CapacityManagePage;
