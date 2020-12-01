import * as React from 'react';
import DevQuotaAttribute from './attribute/DevQuotaAttribute';
import ListAttributre from './attribute/ListAttribute';
import ReportListAttribute from './attribute/ReportListAttribute';

interface SemanticAttributeType {
    type: string;
    name: string;
}

const SemanticAttributePage: React.FC<SemanticAttributeType> = (props) => {
    const renderAttribute = (type: string) => {
        switch (type) {
            case 'dev':
                return <DevQuotaAttribute title={props.name} />;
            case 'list':
                return <ListAttributre title={props.name} />;
            case 'report_list':
                return <ReportListAttribute title={props.name} />;
            default:
                return null;
        }
    };

    return <div>{renderAttribute(props.type)}</div>;
};

export default SemanticAttributePage;
