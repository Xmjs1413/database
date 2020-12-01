import * as React from 'react';
import styles from './AttributeTitle.module.less';

interface AttributeTitleProps {
    title: string | null;
    styles?: object;
    Icon?: React.ReactNode;
}

const addStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    margin: '0px',
    padding: '0px',
};

const AttributeTitle: React.FC<AttributeTitleProps> = (props) => {
    return (
        <div className={styles.container}>
            {props.Icon ? (
                <div style={addStyles as any}>
                    {props.Icon}
                    <h2 style={{ ...props.styles, paddingLeft: '5px' }}>{props.title}</h2>
                </div>
            ) : (
                <h2 style={{ ...props.styles }}>{props.title}</h2>
            )}
        </div>
    );
};

export default AttributeTitle;
