import * as React from 'react';
import { Row, Col } from 'antd';
import AttributeTitle from './AttributeTitle';
import AttributeItem from './AttributeItem';
import { LayoutFilled } from '@ant-design/icons';

const BaseContent = [
    [
        {
            label: '业务归属领域',
            value: '运营服务',
        },
        {
            label: '业务口径',
            value: '运营',
        },
        {
            label: '指标统计口径及公式',
            value: '统计口径',
        },
        {
            label: '来源',
            value: '指标来源',
        },
    ],
    [
        {
            label: '业务主题',
            value: '未设置',
        },
        {
            label: '用户',
            value: '未设置',
        },
        {
            label: '负责人',
            value: '未设置',
        },
    ],
];

const BussinessAttribute: React.FC<any> = () => {
    return (
        <div
            style={{
                paddingLeft: '30px',
                backgroundColor: '#ffff',
                paddingTop: '10px',
                paddingBottom: '10px',
            }}
        >
            <AttributeTitle Icon={<LayoutFilled />} title="指标业务属性" />
            <Row>
                {BaseContent.map((cols: { label: string; value: string }[], index: number) => {
                    return (
                        <Col span={12} key={index}>
                            {cols.map((col) => {
                                return (
                                    <AttributeItem
                                        key={col.label}
                                        label={col.label}
                                        value={col.value}
                                    />
                                );
                            })}
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default BussinessAttribute;
