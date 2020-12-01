import * as React from 'react';
import { Row, Col, Table, Tooltip } from 'antd';
import AttributeItem from '../content/AttributeItem';
import AttributeTitle from '../content/AttributeTitle';
import { FormLayout } from '../../../constants/FormLayout';
import { LayoutFilled } from '@ant-design/icons';

interface InfoModalProps {
    data: object;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
    const infoData = [
        [
            { label: '英文名', value: (props.data as any).name },
            { label: '中文名', value: (props.data as any).nameCH },
            { label: 'Schema', value: (props.data as any).schema },
            { label: '目录', value: '未挂载' },
            { label: '表类型', value: '物理表【查看建表语句】' },
            { label: '状态', value: '已登记' },
            { label: '分层标签', value: 's' },
            { label: '粒度', value: (props.data as any).granularity },
        ],
        [
            { label: '技术owner', value: '信息技术部-张益春012733' },
            { label: '业务owner', value: '空' },
            { label: '资产登记时间', value: '2020-04-01 15：28：41' },
            { label: '是否确认完成脱敏确认', value: '否' },
            { label: '是否涉敏', value: '未设置' },
            { label: '安全等级', value: '2-中' },
            { label: '质量评分', value: '空' },
            { label: '备注说明', value: '暂无备注' },
        ],
        [
            { label: '数据源', value: (props.data as any).data_source_ID },
            { label: '数据源类型', value: 'GP' },
            { label: '数据源环境', value: (props.data as any).environment },
            { label: '所属集群', value: 'gp-datacenter-prd/数据中心数仓集群' },
            { label: '所属指南针系统', value: '华泰集团数据中心' },
            { label: '数据来源类型', value: '中台数据源' },
        ],
    ];

    const columns = [
        {
            title: '列名',
            dataIndex: 'name',
            ellipsis: { showTitle: false },
            render: (text: any, row: any, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={row.name}>
                        <a>{row.name}</a>
                    </Tooltip>
                );
            },
        },
        {
            title: '列中文名',
            dataIndex: 'nameCH',
        },
        {
            title: '字段类型',
            dataIndex: 'field_type',
        },
        {
            title: '是否主键',
            dataIndex: 'is_primary_key',
        },
        {
            title: '是否业务唯一键',
            dataIndex: 'is_bussiness_onlykey',
        },
        {
            title: '脱敏规划',
            dataIndex: 'desensitization_plan',
        },
        {
            title: '安全级别',
            dataIndex: 'safe_level',
        },
        {
            title: '安全标签',
            dataIndex: 'safe_sign',
        },
        {
            title: '备注',
            dataIndex: 'note',
        },
    ];

    const data: any[] = [];
    for (let i = 0; i < 19; i++) {
        data.push({
            key: i,
            name: `tcnms_sopt_share_1d_058 ${i}`,
            nameCH: `分成个股期权净佣金 ${i}`,
            field_type: `numeric(21.4) ${i}`,
            is_primary_key: `否 ${i}`,
            is_bussiness_onlykey: `否 ${i}`,
            desensitization_plan: `未设置 ${i}`,
            safe_level: `2-中 ${i}`,
            safe_sign: `空 ${i}`,
            note: `暂无备注 ${i}`,
        });
    }

    const renderTitle = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <AttributeTitle
                        Icon={<LayoutFilled />}
                        styles={{ fontSize: '12px' }}
                        title="基本属性"
                    />
                );
            case 1:
                return (
                    <AttributeTitle
                        Icon={<LayoutFilled />}
                        styles={{ fontSize: '12px' }}
                        title="拓展属性"
                    />
                );
            case 2:
                return (
                    <AttributeTitle
                        Icon={<LayoutFilled />}
                        styles={{ fontSize: '12px' }}
                        title="物理属性"
                    />
                );
            default:
                return null;
        }
    };

    const onPagination = () => {
        return {
            total: data?.length,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page: number, pagesize: number | undefined) => {
            },
        };
    };

    return (
        <div>
            <Row>
                {infoData.map((ele: { label: string; value: string }[], index: number) => {
                    return (
                        <Col offset={1} key={index} span={7}>
                            {renderTitle(index)}
                            {ele.map((item, index) => {
                                return (
                                    <AttributeItem
                                        labelAlign="left"
                                        ItemLayout={FormLayout}
                                        labelTooltip={item.label}
                                        valueToolTip={item.value}
                                        label={item.label}
                                        value={item.value}
                                        key={index}
                                    />
                                );
                            })}
                        </Col>
                    );
                })}
            </Row>
            <div style={{ padding: '20px' }}>
                <Table
                    bordered={true}
                    pagination={onPagination()}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    );
};

export default InfoModal;
