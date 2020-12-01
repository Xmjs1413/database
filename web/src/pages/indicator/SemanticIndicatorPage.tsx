import * as React from 'react';
import intl from '../../components/intl/Index';
import PageTitle from '../../components/title/PageTitle';
import { Row, Col, Empty } from 'antd';
import SemanticIndicatorSide from './SemanticIndicatorSide';
import SemanticIndicatorContent from './SemanticIndicatorContent';

const SemanticIndicatorPage: React.FC<{}> = () => {
    const [quotaType, setQuotaType] = React.useState<string | null>(null);
    const [attributeTitle, setAttributeTitle] = React.useState<string>('');

    const onContentChange = (nodeName: string, type: string | null) => {
        setAttributeTitle(nodeName);
        setQuotaType(type);
    };

    return (
        <div>
            <PageTitle title={intl.get('semantic_indicator')} />
            <div>
                <Row>
                    <Col offset={1} span={5} style={{ padding: '0px' }}>
                        <SemanticIndicatorSide onContentChange={onContentChange} />
                    </Col>
                    <Col
                        span={17}
                        style={{
                            marginTop: '70px',
                            borderLeft: 'solid 1px #aaa',
                            padding: '0  0 0 30px',
                        }}
                    >
                        {attributeTitle ? (
                            <SemanticIndicatorContent title={attributeTitle} type={quotaType} />
                        ) : (
                            <Empty />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default SemanticIndicatorPage;
