import * as  React from 'react';
import AccessAudit from './AccessAudit';
import PageTitle from '../../../components/title/PageTitle';
import intl from '../../../components/intl/Index';

const ListLimitPage = () => {
   return(
       <div>
           <PageTitle title={intl.get("list_limit_manage")} />
           <AccessAudit />
       </div>
   )
};

export default ListLimitPage;

