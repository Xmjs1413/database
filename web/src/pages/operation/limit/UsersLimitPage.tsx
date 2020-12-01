import * as React from 'react';
import { Form, Row, Col, Select ,Table } from 'antd';
import { getUserLimitData } from '../../../service/operation';
import PageTitle from '../../../components/title/PageTitle';
import { FormLayout } from '../../../constants/FormLayout';
import intl from '../../../components/intl/Index';
import SearchButton from '../../../components/button/SearchButton';
import styles from './UsersLimitPage.module.less';
import { template } from '@babel/core';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
   {
      title:"group_name",
      dataIndex:"group_name"
   },
   {
      title:"privilege_scope",
      dataIndex:"privilege_scope"
   },
   {
      title:"server_name",
      dataIndex:"server_name"
   },
   {
      title:"db_name",
      dataIndex:"db_name"
   },
   {
      title:"table_name",
      dataIndex:"table_name"
   },
   {
      title:"column_name",
      dataIndex:"column_name"
   },
   {
      title:"uri",
      dataIndex:"uri"
   },
   {
      title:"action",
      dataIndex:"action"
   },
   {
      title:"with_grant_option",
      dataIndex:"with_grant_option"
   },
   {
      title:"user_name",
      dataIndex:"user_name"
   }
]

const UsersLimit = () => {

   const [usersData, setUsersData] = React.useState<Array<object>>();
   const [form] = Form.useForm();


   const getUsersData = async (params: object) => {
      const tableData:any = [];
      const data :any = await getUserLimitData({ ...params });
      data && Object.keys(data).map(item=>{
          const userData = data[item];
          const allMetaData:any = Object.values(userData);
          allMetaData.map((ele:string)=>{
               const singleData = ele.split(",");
               const temp = {
                  group_name:singleData[0],
                  privilege_scope:singleData[1],
                  server_name:singleData[2],
                  db_name:singleData[3],
                  table_name:singleData[4],
                  column_name:singleData[5],
                  uri:singleData[6],
                  action:singleData[7],
                  with_grant_option:singleData[8],
                  user_name:item
               };
               tableData.push(temp);
          })
      });
      return tableData;
   }

   React.useEffect(() => {
        let isUnmounted = false;
        const abortController = new AbortController();
        (async()=>{
          const dataSource= await getUsersData({ users: "kli,bdpt" });
          form.setFieldsValue({
            users: ["kli,bdpt"]
          });
          dataSource.map((ele:any,index:number)=>{
             ele.sequence = index;
          })
          if(!isUnmounted){
             setUsersData(dataSource)
          }
        })();    
        return () => {
            isUnmounted = true;
            abortController.abort();
        };
   }, []);

   const onFinish = (values: object) =>{
      
   }

   return (
      <div>
         <PageTitle title={intl.get("user_limit_manage")} />
         <div className={styles.container} >
            <Form
               form={form}
               onFinish={onFinish}
               {...FormLayout}
            >
               <Row>
                  <Col span={12} >
                     <FormItem
                        label="用户名"
                        name="users"
                     >
                        <Select
                           mode="multiple"

                        >
                           {
                              ["kli", "bdpt"].map((item: string) => {
                                 return (
                                    <Option key={item} value={item} >
                                       {item}
                                    </Option>
                                 )
                              })
                           }
                        </Select>
                     </FormItem>
                  </Col>
               </Row>
               <Row>
                  <Col span={24} >
                     <SearchButton />
                  </Col>
               </Row>
            </Form>
            <br/>
             <Table bordered rowKey="sequence" columns={columns} dataSource={usersData} tableLayout="fixed" />
         </div>
      </div>
   )
};

export default UsersLimit;
