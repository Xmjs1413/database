import * as React from 'react';

interface ContentTitleProps {
    title: string | null;
    styles?: object;
}

const ContentTitle: React.FC<ContentTitleProps> = (props) => {
    return (
        <h2
            style={{
                margin: '0px',
                padding: '0px 0px 30px 0px',
                fontSize: '18px',
                fontWeight: 'bold',
                ...props.styles,
            }}
        >
            {props.title}
        </h2>
    );
};

export default ContentTitle;
