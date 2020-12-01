import * as React from 'react';
import IndicatorSidePage from './side/IndicatorSidePage';
import IndicatorContentPage from './content/IndicatorContentPage';
import { Row, Col } from 'antd';
import PageTitle from '../../components/title/PageTitle';
import intl from '../../components/intl/Index';

const IndicatorManagerPage: React.FC<any> = () => {
    const [name, setName] = React.useState<string | null>(null);
    const [attribute, setAttribute] = React.useState<object | null>(null);

    const onContentChange = (data: object) => {
        const { name, attribute } = data as any;
        setName(name);
        setAttribute(attribute);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <PageTitle title={intl.get("semantic_indicator_manage")} />
            <Row>
                <Col span={4} offset={1}>
                    <IndicatorSidePage onContentChange={onContentChange} />
                </Col>
                <Col span={19}>
                    <IndicatorContentPage name={name} attribute={attribute} />
                </Col>
            </Row>
        </div>
    );
};

export default IndicatorManagerPage;
