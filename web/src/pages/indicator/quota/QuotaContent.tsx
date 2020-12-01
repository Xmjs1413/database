import * as React from 'react';
import { Row, Col } from 'antd';
import CommonItem from '../common/CommonItem';

interface ColProps {
    label: string;
    value: string;
    span: number;
}

interface QuotaContentProps {
    content: Array<Array<ColProps>>;
}

const QuotaContent: React.FC<QuotaContentProps> = (props) => {
    return (
        <div>
            {props.content.map((row, index) => {
                return (
                    <Row key={index}>
                        {row.map((col) => {
                            return (
                                <Col key={col.value} span={col.span}>
                                    <CommonItem
                                        valueToolTip={col.value}
                                        labelTooltip={col.label}
                                        key={col.value}
                                        label={col.label}
                                        value={col.value}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                );
            })}
        </div>
    );
};

export default QuotaContent;
