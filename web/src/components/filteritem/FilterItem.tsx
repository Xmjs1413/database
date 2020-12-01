import React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem'

const FormItem = Form.Item;

const FilterItem = (props:FormItemProps) => {
  return (
    <FormItem
      {...props}
    >
        {props.children}
    </FormItem>
  )
};

export default FilterItem;
