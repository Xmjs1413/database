import * as React from 'react';
import CommonItem from '../common/CommonItem';

const DevQuotaAttribute: React.FC<any> = (props) => {
    const DevData = [
        { label: '业务指标名称', value: props.title },
        { label: '派生指标名称', value: '分成个股期权毛佣金' },
        { label: '英文简称', value: 'tgcms_scopt_share_id_051' },
        { label: '登记人', value: '张益春012733' },
        { label: '所属业务板块', value: '经纪业务' },
        { label: '所属数据域', value: '事件' },
        { label: '所属业务过程', value: '成交' },
        { label: '原子指标', value: '交易毛佣金' },
        { label: '统计周期', value: '天' },
        { label: '修饰类型', value: '修饰词' },
        { label: '所属市场', value: '上海深圳' },
        { label: '分成方式', value: '合约分成网销分成 | 私募分成 | 一柜通分成' },
        { label: '期权类型', value: '个股期权' },
        { label: '证券大类', value: '期权' },
        { label: '派生指标目录挂载', value: '/经纪业务/成交/期权/分成方式/证券资产合约分成' },
        { label: '技术口径说明', value: '暂无' },
    ];

    return (
        <div>
            {DevData.map((ele: { label: string; value: string }, index: number) => {
                return (
                    <CommonItem
                        valueStyles={index === 0 ? { color: 'blue' } : null}
                        key={index}
                        label={ele.label}
                        value={ele.value}
                    />
                );
            })}
        </div>
    );
};

export default DevQuotaAttribute;
