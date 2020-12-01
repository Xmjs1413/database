import * as React from 'react';
import { Button, Row, Col, Table, Tabs } from 'antd';
//import { FormHalfLayout } from '../../../constants/FormLayout';
import CommonTitle from '../common/CommonTitle';
import CommonItem from '../common/CommonItem';
import ListAttributeTable from './ListAttributeTable';
import styles from './ListAttribute.module.less';

const { TabPane } = Tabs;

const middleData = [
    [
        { label: '英文名', value: 'cb_evt_cust_trd_opt_share_1d' },
        { label: '中文名', value: '分成个股期权交易金额(人民币)' },
        { label: 'Schema', value: 'htsc_dws' },
        { label: '目录', value: '未挂载' },
        { label: '表类型', value: '物理表【查看建表语句】' },
        { label: '状态', value: '已登记' },
        { label: '分层标签', value: 's' },
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
        { label: '数据源', value: 'gpdw/数据中心数仓' },
        { label: '数据源类型', value: 'GP' },
        { label: '数据源环境', value: 'PRD' },
        { label: '所属集群', value: 'gp-datacenter-prd/数据中心数仓集群' },
        { label: '所属指南针系统', value: '华泰集团数据中心' },
        { label: '数据来源类型', value: '中台数据源' },
    ],
];

const tabData = ['结构信息', '数据预览', '血缘', '刷新时间'];

const ListAttribute: React.FC<any> = (props) => {
    const renderTitle = (index: number) => {
        switch (index) {
            case 0:
                return <CommonTitle styles={{ fontSize: '12px' }} title="基本属性" />;
            case 1:
                return <CommonTitle styles={{ fontSize: '12px' }} title="拓展属性" />;
            case 2:
                return <CommonTitle styles={{ fontSize: '12px' }} title="物理属性" />;
            default:
                return null;
        }
    };

    const callback = (key: string) => {
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{props.title}</h2>
                <div>
                    <Button>申请权限</Button>
                    <Button>申请采集</Button>
                    <Button>关注</Button>
                </div>
            </div>
            <div className={styles.middle}>
                <h2># 通用属性</h2>
                <Row>
                    {middleData.map((ele: { label: string; value: string }[], index: number) => {
                        return (
                            <Col offset={1} key={index} span={7}>
                                {renderTitle(index)}
                                {ele.map((item, index) => {
                                    return (
                                        <CommonItem
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
            </div>
            <div className={styles.table}>
                <Tabs defaultActiveKey="0" onChange={callback}>
                    {tabData.map((ele: string, index: number) => {
                        return (
                            <TabPane tab={ele} key={`${index}`}>
                                <ListAttributeTable />
                            </TabPane>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
};

export default ListAttribute;
