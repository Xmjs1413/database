import * as React from 'react';
import { Row, Col } from 'antd';
import AttributeTitle from './AttributeTitle';
import AttributeItem from './AttributeItem';
import { LayoutFilled } from '@ant-design/icons';

interface TechnicalModuleAttributeProps {
    title: string;
}

const TechnicalModuleAttribute: React.FC<TechnicalModuleAttributeProps> = (props) => {
    const DevData = [
        { label: '派生指标名称', value: props.title },
        { label: '英文简称', value: ' tamt_astk_1d_050' },
        { label: '登记人', value: '陈铮015405' },
        { label: '所属业务板块', value: '经纪业务' },
        { label: '所属数据域', value: '事件' },
        { label: '原子指标', value: '交易金额' },
        { label: '统计周期', value: '天' },
        { label: '修饰类型', value: '修饰词' },
        { label: '所属市场', value: '上海深圳' },
        { label: '币种', value: '人民币' },
        { label: '业务动作', value: '证券买入，证券卖出' },
        { label: '资金账户类型', value: '普通资金账户' },
        { label: '股东账户类型', value: '沪A资户账户，深A股东账户' },
        { label: '证券大类', value: 'A股' },
        { label: '技术口径说明', value: '原因子ID=120' },
    ];

    const len = DevData.length;
    const firstColData = DevData.slice(0, len / 2);
    const secondColData = DevData.slice(len / 2, len);

    return (
        <div style={{ paddingLeft: '30px', paddingBottom: '10px', backgroundColor: '#fff' }}>
            <AttributeTitle Icon={<LayoutFilled />} title="指标技术模型属性" />
            <Row>
                <Col span={12}>
                    {firstColData.map((col: { label: string; value: string }) => {
                        return (
                            <AttributeItem key={col.label} label={col.label} value={col.value} />
                        );
                    })}
                </Col>
                <Col span={12}>
                    {secondColData.map((col: { label: string; value: string }) => {
                        return (
                            <AttributeItem key={col.label} label={col.label} value={col.value} />
                        );
                    })}
                </Col>
            </Row>
        </div>
    );
};

export default TechnicalModuleAttribute;
