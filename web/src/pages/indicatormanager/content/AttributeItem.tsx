import * as React from 'react';
import { Form, Tooltip } from 'antd';
import { FormFilterLayout } from '../../../constants/FormLayout';

const FormItem = Form.Item;

interface AttributeItemProps {
    label: string;
    value: string;
    valueToolTip?: any;
    labelTooltip?: any;
    ItemLayout?: any;
    labelStyles?: object | null;
    valueStyles?: object | null;
    labelAlign?: 'right' | 'left';
}

const AttributeItem: React.FC<AttributeItemProps> = (props) => {
    const [ItemLayout, setItemLayout] = React.useState(FormFilterLayout);

    React.useEffect(() => {
        props.ItemLayout && setItemLayout(props.ItemLayout);
    }, []);

    const labelCommon = {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    };

    return (
        <div>
            <Form {...ItemLayout}>
                <FormItem
                    className="nowrapFormItem"
                    style={{ marginBottom: '0px' }}
                    labelAlign={props.labelAlign ? props.labelAlign : 'right'}
                    label={
                        <Tooltip title={props.labelTooltip}>
                            <span style={{ ...(labelCommon as any), ...props.labelStyles }}>
                                {props.label}
                            </span>
                        </Tooltip>
                    }
                >
                    <Tooltip placement="topLeft" title={props.valueToolTip}>
                        <span style={{ ...(labelCommon as any), ...props.valueStyles }}>
                            {props.value}
                        </span>
                    </Tooltip>
                </FormItem>
            </Form>
        </div>
    );
};

export default AttributeItem;
