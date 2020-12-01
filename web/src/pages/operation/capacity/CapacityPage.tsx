import * as React from 'react';
import { AuthWidget } from '../../widget';
import CapacityAdminManagePage from './CapacityAdminManagePage';
import CapacityManagePagea from './CapacityManagePage';
import { getCapacityData } from '../../../service/operation';

const CapacityPage = () => {

    const [capacityData, setCapacityData] = React.useState<Array<object>>([]);

    React.useEffect(() => {
        let isUnmounted = false;
        const abortController = new AbortController();
        (
            async () => {

                const result = await getCapacityData();
                const { data } = result as any;
                if (!isUnmounted) {
                    setCapacityData(data);
                }
            }
        )();

        return () => {
            isUnmounted = true;
            abortController.abort();
        }

    }, [])

    return (
        <div>
            <AuthWidget
                children={(auth: any) => {
                    return (
                        <div>
                            {auth.role === "系统管理员" ? <CapacityAdminManagePage tableData={capacityData} /> : <CapacityManagePagea tableData={capacityData} />}
                        </div>
                    )
                }}
            />
        </div>
    )
};

export default CapacityPage;