import * as React from 'react';
import { Table } from 'antd';
import intl from '../../../components/intl/Index';
import PageTitle from '../../../components/title/PageTitle';

const columns = [
  {
    title:"order_id",
    dataIndex:"order_id"
  },
  {
    title:"job_en_name",
    dataIndex:"job_en_name"
  },
  {
    title:"job_type",
    dataIndex:"job_type"
  },
  {
    title:"next_order_id",
    dataIndex:"next_order_id"
  },
  {
    title:"next_job_en_name",
    dataIndex:"next_job_en_name"
  },
  {
    title:"next_job_type",
    dataIndex:"next_job_type"
  },
  {
    title:"db_en_name",
    dataIndex:"db_en_name"    
  },
  {
    title:"exe_step",
    dataIndex:"exe_step"
  },
  {
    title:"rn",
    dataIndex:"rn"
  }
]

const InheritPage = (props:any) =>{
    return(
        <div>
            <PageTitle title={intl.get("inherit_parse")} />
            <Table 
              columns={columns}
              dataSource={[]}
              bordered
            />
        </div>
    )
}
export default InheritPage;