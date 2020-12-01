import * as React from 'react';
import { Select } from 'antd';
import PageTitle from '../../../components/title/PageTitle';
import SubTitleTable from '../../../components/table/SubTitleTable';
import CapacityChart from './CapacityChart';
import styles from './CapacityAdminManagePage.module.less';
import intl from '../../../components/intl/Index';

const { Option } = Select;

interface CapacityAdminManagePageProps{
    tableData:Array<object>
};

const capacityDataBaseNames = [
    {
        key:"ana_crm_csp",
        value:"ana_crm_csp"
    },
    {
        key:"ana_crm_wljrb",
        value:"ana_crm_wljrb"
    }
]

const listColumns = [
    {
        title:"日期",
        dataIndex:"calcu_date"
    },
    {
        title:"库名",
        dataIndex:"hive_database"
    },
    {
        title:"表名",
        dataIndex:"list_name"
    },
    {
        title:"空间大小",
        dataIndex:"volumn",
        sorter: (a:any, b:any) => a.space_size - b.space_size,
        sortDirections: ['ascend', 'descend'],
    }
];

const libaryColumns =[
    {
        title:"日期",
        dataIndex:"calcu_date"
    },
    {
        title:"库名",
        dataIndex:"hive_database"
    },
    {
        title:"空间总和大小",
        dataIndex:"volumn",
        sorter: (a:any, b:any) => a.space_size - b.space_size,
        sortDirections: ['ascend', 'descend'],
    }
];

const CapacityAdminManagePage = (props:CapacityAdminManagePageProps) => {
    return (
        <div>
            <PageTitle title={intl.get("capacity_manage")} />
            <div style={{backgroundColor:"#fff",padding:"20px 0px",marginLeft:"12px",marginBottom:"10px"}} > 
            <div className={styles.container} >
               <div>
                   <span>日期</span>
                   <Select defaultValue="1" >
                     <Option value="1">20201123</Option>    
                   </Select> 
                </div>  
                <div>
                   <span>库</span>
                   <Select defaultValue={capacityDataBaseNames[0].value} >
                     {
                         capacityDataBaseNames.map(ele=>{
                             return (
                                 <Option value={ele.value} key={ele.key} >
                                     {ele.value}
                                 </Option>
                             )
                         })
                     }    
                   </Select> 
                </div>           
            </div> 
            <SubTitleTable dataSource={props.tableData} columns={listColumns} key="hive_database" title="库表信息" />
            <SubTitleTable dataSource={props.tableData} columns={libaryColumns} key="hive_database" title="库信息" styles={{padding:"20px 0px"}} />
            <CapacityChart data={[]} title="库空间日期增量图" />
            </div>
        </div>
    )
};

export default CapacityAdminManagePage;
