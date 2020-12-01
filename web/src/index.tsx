import React from 'react';
import ReactDOM from 'react-dom';
import { AlitaProvider, setConfig } from 'redux-alita';
import umbrella from 'umbrella-storage';
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import * as apis from './service';

import './style/antd/index.less';
import './style/index.less';

setConfig(apis);
umbrella.config('REACT-ADMIN');

ReactDOM.render(
    <AlitaProvider>
        <Page />
    </AlitaProvider>,
    document.getElementById('root')
);
serviceWorker.register();
