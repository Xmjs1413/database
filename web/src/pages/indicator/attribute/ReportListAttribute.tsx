import * as React from 'react';
import { Table } from 'antd';
import PageTitle from '../../../components/title/index';
import CommonTitle from '../common/CommonTitle';
import WrapperDivider from '../common/WrapperDivider';
import CommonItem from '../common/CommonItem';

const baseInformation = [
    { label: '开发人', value: '李华泰019989' },
    { label: '业务owner', value: '张华泰01999' },
    { label: '报表Url', value: 'http://eip.htsc.com.cn/dsj/raphelibl/bazaar/111/dashboard/333' },
    { label: '描述', value: '—' },
];

const data = [
    {
        name: 'name',
        nameCH: '名称',
    },
    {
        name: 'notes',
        nameCH: '备注',
    },
];

const columns = [
    {
        title: '列名',
        dataIndex: 'name',
    },
    {
        title: '列中文名',
        dataIndex: 'nameCH',
    },
];

interface ReportListPorps {
    title: string;
}

const ReportListAttribute: React.FC<ReportListPorps> = (props) => {
    return (
        <div>
            <PageTitle
                title={props.title}
                styles={{
                    paddingBottom: '0px',
                    paddingTop: '0px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            />
            <CommonTitle title="基本信息" styles={{ padding: '20px 0' }} />
            {baseInformation.map((ele: { label: string; value: string }, index: number) => {
                return (
                    <CommonItem
                        valueToolTip={ele.value}
                        valueStyles={index === 2 ? { color: 'lightBlue' } : null}
                        label={ele.label}
                        value={ele.value}
                        key={index}
                    />
                );
            })}
            <WrapperDivider />
            <CommonTitle title="结构信息" />
            <Table
                columns={columns}
                dataSource={data}
                bordered
                rowKey="name"
                pagination={false}
            />
        </div>
    );
};

export default ReportListAttribute;
