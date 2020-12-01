import * as React from 'react';
import PageTitle from '../../../components/title/PageTitle';
import QueueAdminManagePage from './QueueAdminManagePage';
import QueueManagePage from './QueueManagePage'; 
import { AuthWidget } from '../../widget';
import intl from '../../../components/intl/Index';

const QueuePage = ()=>{
    return(
        <div>
            <PageTitle title={intl.get("queue_manage")} />
            <AuthWidget
                    children={(auth: any) => {
                         return(
                             <div>
                                 {auth.role==="系统管理员" ? <QueueAdminManagePage /> : <QueueManagePage />}
                             </div>
                         ) 
                    }} 
            />
        </div>
    )
};

export default QueuePage;
