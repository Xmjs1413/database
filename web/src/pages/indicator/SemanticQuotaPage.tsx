import * as React from 'react';
import CommonTitle from './common/CommonTitle';
import QuotaContent from './quota/QuotaContent';
import QuotaChart from './quota/QuotaChart';
import WrapperDivider from './common/WrapperDivider';

const BaseContent = [
    [
        { label: '指标归属业务领域', value: '运营服务', span: 12 },
        { label: '指标归属业务领域', value: '未设置', span: 12 },
    ],
    [{ label: '指标主题', value: '运营服务/其他', span: 12 }],
    [{ label: '指标说明', value: '指标说明', span: 12 }],
];

const expandContent = [
    [
        { label: '时间值/区间值', value: '时间区间-', span: 8 },
        { label: '是否人工指标', value: '否', span: 8 },
        { label: '同义词', value: '同义-', span: 8 },
    ],
    [{ label: '指标计算公式', value: '指标计算公式', span: 8 }],
    [{ label: '指标统计口径', value: '指标统计口径', span: 8 }],
    [{ label: 'USER', value: '运营中心', span: 8 }],
    [
        { label: '计量单位', value: '单位-', span: 8 },
        { label: '计量频率', value: '频率-', span: 8 },
        { label: '时效性', value: '时效-', span: 8 },
    ],
    [
        { label: '适用维度', value: '维度-', span: 8 },
        { label: '数据质量管理要求', value: '要求-', span: 8 },
        { label: '备注', value: '备注-', span: 8 },
    ],
    [
        { label: '指标负责人', value: '负责-', span: 8 },
        { label: '指标来源系统', value: '来源-', span: 8 },
        { label: '指标来源系统表', value: '来源表-', span: 8 },
    ],
    [
        { label: '描述对象', value: '对象-', span: 8 },
        { label: '展现形式', value: '展现-', span: 8 },
    ],
];

const SemanticQuotaPage: React.FC<{}> = () => {
    return (
        <div>
            <CommonTitle title={'业务指标基本属性'} />
            <QuotaContent content={BaseContent} />
            <WrapperDivider />
            <CommonTitle title={'业务指标拓展属性'} />
            <QuotaContent content={expandContent} />
            <WrapperDivider />
            <CommonTitle title={'血缘'} />
            <QuotaChart />
        </div>
    );
};

export default SemanticQuotaPage;
