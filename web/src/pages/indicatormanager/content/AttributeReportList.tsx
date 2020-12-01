import * as React from 'react';
import { Table, Divider, Select, Empty } from 'antd';
import PageTitle from '../../../components/title/index';
import AttributeTitle from './AttributeTitle';
import AttributeItem from './AttributeItem';
import { LayoutFilled } from '@ant-design/icons';

const { Option } = Select;

const baseInformation = [
    { label: '开发人', value: '李华泰019989' },
    { label: '业务owner', value: '张华泰01999' },
    { label: '报表Url', value: 'http://eip.htsc.com.cn/dsj/raphelibl/bazaar/111/dashboard/333' },
    { label: '描述', value: '—' },
    { label: '报表用途', value: '考核' },
    { label: '报表使用部门', value: '战略发展部' },
];

const columns = [
    {
        title: '分支机构',
        children: [
            {
                title: '分公司号',
            },
            {
                title: '分公司名称',
            },
            {
                title: '营业部号',
            },
            {
                title: '营业部名称',
            },
            {
                title: '负责人',
            },
        ],
    },
    {
        title: '股票交易净佣金（元）',
        children: [
            {
                title: '传统代理',
            },
            {
                title: '融资融券',
            },
            {
                title: '约定购回',
            },
            {
                title: '根网套利',
            },
        ],
    },
    {
        title: '基金交易净佣金（元）',
        children: [
            {
                title: '传统代理',
            },
            {
                title: '融资融券',
            },
            {
                title: '约定购回',
            },
            {
                title: '根网套利',
            },
        ],
    },
    {
        title: '股票交易里（元）',
        children: [
            {
                title: '传统代理',
            },
            {
                title: '融资融券',
            },
            {
                title: '约定购回（沪）',
            },
            {
                title: '约定购回（深）',
            },
            {
                title: '根网套利',
            },
        ],
    },
];

const influenceColumns = [
    {
        title: '指标',
        dataIndex: 'indicator',
    },
    {
        title: '报表列',
        dataIndex: 'list_column',
    },
];

const dataSource = [
    {
        indicator: 'A股成交金额',
        list_column: '传统代理',
    },
];

interface ReportListPorps {
    attribute: Array<string> | undefined;
}

const AttributeReportList: React.FC<ReportListPorps> = (props) => {
    const [attrTitle, setAttrTitle] = React.useState<string | undefined>();

    React.useEffect(() => {
        const initAttribute = props.attribute && props.attribute.length > 0 ? props.attribute[0] : '';
        setAttrTitle(initAttribute);
    }, [props]);

    const onSelect = (v: string) => {
        setAttrTitle(v);
    };

    return (
        <div>
            {attrTitle ? (
                <div>
                    <Select
                        defaultValue={attrTitle}
                        value={attrTitle}
                        onChange={onSelect}
                        style={{ minWidth: 120,float:"right",marginRight:"15px" }}
                        size="large"
                    >
                        {props.attribute?.map((ele: string, index: number) => {
                            return (
                                <Option key={ele} value={ele}>
                                    {ele}
                                </Option>
                            );
                        })}
                    </Select>
                    <PageTitle
                        title={attrTitle}
                        styles={{
                            paddingBottom: '0px',
                            paddingTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    />
                    <AttributeTitle
                        Icon={<LayoutFilled />}
                        title="基本信息"
                        styles={{ padding: '20px 0' }}
                    />
                    {baseInformation.map((ele: { label: string; value: string }, index: number) => {
                        return (
                            <AttributeItem
                                valueToolTip={ele.value}
                                valueStyles={index === 2 ? { color: '#1E90FF' } : null}
                                label={ele.label}
                                value={ele.value}
                                key={index}
                            />
                        );
                    })}
                    <Divider />
                    <AttributeTitle Icon={<LayoutFilled />} title="报表表头信息" />
                    <Table
                        columns={columns}
                        bordered
                        scroll={{ x: true }}
                        className="hiddenTb"
                    />
                    <Divider />
                    <AttributeTitle Icon={<LayoutFilled />} title="指标影响报表列" />
                    <Table
                        columns={influenceColumns}
                        dataSource={dataSource}
                        rowKey="indicator"
                        pagination={false}
                        bordered
                        scroll={{ x: true }}
                    />
                </div>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default AttributeReportList;
