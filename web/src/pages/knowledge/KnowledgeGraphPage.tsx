import * as React from 'react';
import { Row, Col } from 'antd';
import intl from '../../components/intl/Index';
import KnowledgeGraphContent from './KnowledgeGraphContent';
import KnowledgeGraphSide from './KnowledgeGraphSide';
import PageTitle from '../../components/title/PageTitle';

const KnowledgeGraphPage: React.FC<any> = () => {
    const [title, setTitle] = React.useState<string>();

    const onContentSearch = (sideTitle: string) => {
        setTitle(sideTitle);
    };

    return (
            <div>
                    <PageTitle title={intl.get('knowledge_graph')} />
                    <Row gutter={[16, 16]}>
                        <Col offset={1} span={5}>
                            <KnowledgeGraphSide onContentSearch={onContentSearch} />
                        </Col>
                        <Col span={18}>
                            <KnowledgeGraphContent title={title} />
                        </Col>
                    </Row>    
            </div>
    );
};

export default KnowledgeGraphPage;
