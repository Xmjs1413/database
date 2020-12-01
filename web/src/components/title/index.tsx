import * as React from 'react';

interface PgaeTitleProps {
    title: string | React.ReactNode;
    styles?: object;
}

const PgaeTitle: React.FC<PgaeTitleProps> = (props) => {
    return (
        <div style={{ margin: 0, padding: '10px 0' }}>
            <h2
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0px',
                    paddingBottom: '20px',
                    ...props.styles,
                }}
            >
                {props.title}
            </h2>
        </div>
    );
};

export default PgaeTitle;
