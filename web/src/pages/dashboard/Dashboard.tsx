import React from 'react';
import intl from '../../components/intl/Index';
import PageTitle from '../../components/title/PageTitle';

const Dashboard = (props:any) =>{
    return(
        <div>
            <PageTitle title={intl.get("home")} />
        </div>
    )
}

export default Dashboard;
