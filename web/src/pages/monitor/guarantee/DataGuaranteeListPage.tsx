import * as React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { FormFilterLayout } from '../../../constants/FormLayout';
import FilterItem from '../../../components/filteritem/FilterItem';
import intl from '../../../components/intl/Index';
import PageTitle from '../../../components/title/PageTitle';
import SearchButton from '../../../components/button/SearchButton';
import DataGuaranteeListSide from './DataGuaranteeListSide';
import DataGuaranteeListContent from './DataGuaranteeListContent';
import styles from './DataGuaranteeListPage.module.less';

const DataGuaranteeListPage = () => {

  const [form] = Form.useForm();
  const onFinish = (values: object) => { }

  return (
    <div className={styles.container} >
      <PageTitle title={intl.get("data_guarantee_list")} />
      <div className={styles.filter} >
        <Form
          form={form}
          onFinish={onFinish}
          {...FormFilterLayout}
        >
          <Row>
            <Col span={12}>
              <FilterItem
                name="system"
                label={intl.get("guarantee_system")}
              >
                <Input />
              </FilterItem>
            </Col>
            <Col span={12}>
              <FilterItem
                name="address"
                label={intl.get("guarantee_address")}
              >
                <Input />
              </FilterItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FilterItem
                name="sign"
                label={intl.get("guarantee_sign")}
              >
                <Input />
              </FilterItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <SearchButton />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.content} >
         <Row>
           <Col offset={2} span={5} >
              <DataGuaranteeListSide />
           </Col>
           <Col span={17} >
              <DataGuaranteeListContent /> 
           </Col>
         </Row>
      </div>
    </div>
  )
};

export default DataGuaranteeListPage;
