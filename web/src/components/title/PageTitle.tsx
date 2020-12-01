import * as React from 'react';
import styles from './PageTitle.module.less';

interface PageTitleProps {
    title:string|React.ReactNode,
    style?:object
}

const PageTitle = (props: PageTitleProps) => {
    return (
        <div>
            <h2 className={styles.title} style={{...props.style}} > {props.title} </h2>
        </div>
    )
};

export default PageTitle;
