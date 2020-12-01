import * as React from 'react';
import styles from './CommonTitle.module.less';

interface CommonTitleProps {
    title: string;
    styles?: object;
}

const CommonTitle: React.FC<CommonTitleProps> = (props) => {
    return (
        <div className={styles.container} style={props.styles}>
            <h2>{props.title}</h2>
        </div>
    );
};

export default CommonTitle;
