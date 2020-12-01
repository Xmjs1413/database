import * as React from 'react';
import { Button } from 'antd';
import styles from './SearchButton.module.less'; 

const SearchButton = (props:any) => {
    return (
        <div className={styles.container} >
           <Button htmlType="submit" {...props}>查询</Button> 
        </div>
    )
};

export default SearchButton;
