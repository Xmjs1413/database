import * as React from 'react';
import { Form, Button, Input } from 'antd';
import { FormLayout, FormWrapperLayout } from '../../constants/FormLayout';
import SqlCodeMirror from './SqlCodeMirror';

const FormItem = Form.Item;

const KnowledgeGraphCode: React.FC<any> = (props) => {
    const [form] = Form.useForm();
    const { name, remarks, sql } = props.data;

    React.useEffect(() => {
        form.setFieldsValue({
            name,
            remarks,
            sql,
        });
    }, [name, remarks, sql, form]);

    const onFinish = () => {
        form.validateFields()
            .then((value: object) => {
                console.log(value);
                props.onClose();
            })
            .catch((err: any) => {
                console.log(new Error(err));
                props.onClose();
            });
    };

    const ruleOptions = [
        {
            required: true,
        },
    ];

    return (
        <div>
            <Form {...FormLayout} form={form}>
                <FormItem label="name" name="name" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="sql" name="sql" rules={ruleOptions}>
                    <SqlCodeMirror />
                </FormItem>
                <FormItem label="remarks" name="remarks" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem {...FormWrapperLayout}>
                    <Button onClick={onFinish} type="primary">
                        保存
                    </Button>
                    <Button onClick={props.onClose}>返回</Button>
                </FormItem>
            </Form>
        </div>
    );
};

export default KnowledgeGraphCode;
