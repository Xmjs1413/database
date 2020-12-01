import * as React from 'react';
import { Table } from 'antd';
import styles from './SubTitleTable.module.less';

interface SubTitleTableProps{
    title:React.ReactNode | string,
    dataSource:Array<object>,
    columns:Array<object>,
    key?:string,
    styles?:object
}

const SubTitleTable = (props:SubTitleTableProps) => {
    return (
        <div className={styles.container} style={{...props.styles}} >
            <h2 className={styles.title} >{props.title}</h2>
            <Table 
              tableLayout="fixed"
              bordered
              dataSource={props.dataSource}
              columns={props.columns}
              key={props.key}
            />
        </div>
    )
};

export default SubTitleTable;