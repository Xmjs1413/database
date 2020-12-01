import * as React from 'react';
import { Empty, Tabs, Button } from 'antd';
import ContentTitle from './ContentTitle';
import BussinessAttribute from './BussinessAttribute';
import TechnicalModuleAttribute from './TechnicalModuleAttribute';
import AttributeTable from './AttributeTable';
import AttributeChart from './AttributeChart';
import AttributeReportList from './AttributeReportList';
import WrapperDivider from './WrapperDivider';
import { HddFilled } from '@ant-design/icons';

const { TabPane } = Tabs;

interface IndicatorContentPageProps {
    name: string | null;
    attribute: object | null;
}

const tabData = ['指标所在表', '指标血缘', '指标相关报表'];

const IndicatorContentPage: React.FC<IndicatorContentPageProps> = (props) => {
    const callback = (key: string) => {
    };
    const renderTabPane = (key: string) => {
        switch (key) {
            case '指标所在表':
                return <AttributeTable />;
            case '指标血缘':
                return <AttributeChart />;
            case '指标相关报表':
                return (
                    <AttributeReportList
                        attribute={props.attribute && (props.attribute as any).report_list}
                    />
                );
            default:
                return null;
        }
    };

    const wrapperStyles = {
        marginTop: '70px',
        paddingLeft: '20px',
        paddingRight:'20px',
    };

    const subTitleStyles = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#1E90FF',
        padding: '10px',
    };

    return (
        <div
            style={
                props.name
                    ? {
                          ...wrapperStyles,
                          borderLeft: '1px solid #aaa',
                          borderTop: '1px solid #aaa',
                          borderRight:'1px solid #aaa',
                      }
                    : wrapperStyles
            }
        >
            {props.name ? (
                <div>
                    <div
                        style={{
                            ...(subTitleStyles as any),
                            backgroundColor: 'transparent',
                            padding: '20px 0px 10px 20px',
                            marginLeft: '-20px',
                        }}
                    >
                        <ContentTitle
                            title={props.name}
                            styles={{
                                fontSize: '20px',
                                paddingBottom: '0px',
                                paddingRight: '20px',
                            }}
                        />
                        <Button type="primary">已启用</Button>
                        <Button>收藏</Button>
                    </div>
                    <div
                        style={{
                            ...(subTitleStyles as any),
                            paddingLeft: '20px',
                            paddingBottom: '10px',
                        }}
                    >
                        <HddFilled style={{ color: '#fff' }} />
                        <ContentTitle
                            title="指标详情"
                            styles={{ padding: '0px 0 0px 10px', color: '#F8F8FF' }}
                        />
                    </div>
                    <BussinessAttribute />
                    <WrapperDivider />
                    <TechnicalModuleAttribute
                        title={props.attribute && (props.attribute as any)['dev']}
                    />
                    <WrapperDivider />
                    <div style={{ padding: '0px 30px 20px 30px', backgroundColor: '#fff' }}>
                        <Tabs defaultActiveKey="0" onChange={callback}>
                            {tabData.map((ele: string, index: number) => {
                                return (
                                    <TabPane tab={ele} key={ele}>
                                        {renderTabPane(ele)}
                                    </TabPane>
                                );
                            })}
                        </Tabs>
                    </div>
                </div>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default IndicatorContentPage;
