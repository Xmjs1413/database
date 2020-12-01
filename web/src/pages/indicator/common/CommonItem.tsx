import * as React from 'react';
import { Form, Tooltip } from 'antd';
import { FormFilterLayout } from '../../../constants/FormLayout';

const FormItem = Form.Item;

interface CommonItemProps {
    label: string;
    value: string;
    valueToolTip?: any;
    labelTooltip?: any;
    ItemLayout?: any;
    labelStyles?: object | null;
    valueStyles?: object | null;
}

const CommonItem: React.FC<CommonItemProps> = (props) => {
    const [ItemLayout, setItemLayout] = React.useState(FormFilterLayout);

    React.useEffect(() => {
        props.ItemLayout && setItemLayout(props.ItemLayout);
    }, []);

    return (
        <div>
            <Form {...ItemLayout}>
                <FormItem
                    className="nowrapFormItem"
                    label={
                        <Tooltip title={props.labelTooltip || null}>
                            <span
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    ...props.labelStyles,
                                }}
                            >
                                {props.label}
                            </span>
                        </Tooltip>
                    }
                >
                    <Tooltip placement="topLeft" title={props.valueToolTip}>
                        <span
                            style={{
                                width: '100%',
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                ...props.valueStyles,
                            }}
                        >
                            {props.value}
                        </span>
                    </Tooltip>
                </FormItem>
            </Form>
        </div>
    );
};

export default CommonItem;
