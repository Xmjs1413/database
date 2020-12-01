import * as React from 'react';
import { Form, Button, Input } from 'antd';
import { FormLayout } from '../../../constants/FormLayout';
import SqlCodeMirror from '../../knowledge/SqlCodeMirror';

const FormItem = Form.Item;

const StoreProcedureModal: React.FC<any> = (props) => {
    const [form] = Form.useForm();

    const { name, schema } = props.data;

    React.useEffect(() => {
        form.setFieldsValue({
            name,
            schema,
            sql: 'select * from xxx',
        });
    }, [name, schema, form]);

    //  const onFinish = () => {
    //      form.validateFields().then((value:object)=>{
    //           console.log(value);
    //           props.onClose();
    //      }).catch((err:any)=>{
    //          console.log(new Error(err));
    //          props.onClose();
    //      });
    //  }

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
                <FormItem label="schema" name="schema" rules={ruleOptions}>
                    <Input />
                </FormItem>
            </Form>
        </div>
    );
};

export default StoreProcedureModal;
