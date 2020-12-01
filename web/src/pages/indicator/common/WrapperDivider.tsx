import * as React from 'react';
import { Divider } from 'antd';

const WrapperDivider: React.FC<any> = (props) => {
    return <Divider style={{ backgroundColor: '#aaa', ...props.styles }} />;
};

export default WrapperDivider;
