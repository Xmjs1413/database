import React from 'react';
import img from '../../style/imgs/404.png';

const NotFound = () => {
   
    const [animated,setAnimated] = React.useState<string>('');

    const enter = () => {
        setAnimated('hinge')
    };

    return (
        <div
            className="center"
            style={{ height: '100%', background: '#ececec', overflow: 'hidden' }}
        >
            <img
                src={img}
                alt="404"
                className={`animated swing ${animated}`}
                onMouseEnter={enter}
            />
        </div>
    );
}


export default NotFound;
