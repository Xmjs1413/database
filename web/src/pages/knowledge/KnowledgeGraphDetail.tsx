import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormLayout, FormWrapperLayout } from '../../constants/FormLayout';

interface DetailType {
    data: any;
    onClose: () => void;
}

const FormItem = Form.Item;

const KnowledgeGraphDetail: React.FC<DetailType> = (props) => {
    const { name, Ename, work, dataField, process, atomic, dimension, dimenValue } = props.data;
    const [form] = Form.useForm();

    React.useEffect(() => {
        form.setFieldsValue({
            name,
            Ename,
            work,
            dataField,
            process,
            atomic,
            dimension,
            dimenValue,
        });
    }, [name, Ename, work, dataField, process, atomic, dimension, dimenValue, form]);

    const onFinish = () => {
        form.validateFields()
            .then((value) => {
                props.onClose();
            })
            .catch((err) => {
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
                <FormItem label="Ename" name="Ename" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="work" name="work" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="dataField" name="dataField" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="process" name="process" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="atomic" name="atomic" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="dimension" name="dimension" rules={ruleOptions}>
                    <Input />
                </FormItem>
                <FormItem label="dimenValue" name="dimenValue" rules={ruleOptions}>
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

export default KnowledgeGraphDetail;
