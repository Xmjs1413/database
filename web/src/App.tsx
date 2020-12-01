import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import umbrella from 'umbrella-storage';
import { useAlita } from 'redux-alita';
import Routes from './routes';
import SiderCustom from './pages/SiderCustom';
import HeaderCustom from './pages/HeaderCustom';
import { checkLogin } from './utils';
import { Redirect } from 'react-router-dom';
import StatusTabs from './components/statustabs/Index';
import { IFMenuBase } from './routes/config';

const { Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [auth, aliveTags, setAlita] = useAlita(
        { auth: umbrella.getLocalStorage('user') },
        { aliveTags: [] },
        { light: true }
    );
    const [statuses, setStatuses] = React.useState<Array<IFMenuBase>>([]);

    useEffect(() => {
        const user = umbrella.getLocalStorage('user');
        user && setAlita('auth', user);
    }, [setAlita]);

    const changeAliveTags = (key: any) => {
        const initdata = aliveTags;
        const newData = initdata.filter((ele: string) => ele === key);
        setAlita("aliveTags", newData);
    }

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const onSaveStatus = (item: IFMenuBase) => {
        if (statuses.indexOf(item) < 0) {
            const newStatuses = [item].concat(statuses);
            setStatuses(newStatuses);
            const newTags = aliveTags.concat([item.key]);
            setAlita("aliveTags", newTags);
        }
    };

    const onSignChangeStatus = (key?: string | null, fn?: (nextkey: string) => void) => {
        changeAliveTags(key);
        if (key) {
            const newStatuses = statuses.filter((ele: any) => ele.key === key);
            setStatuses(newStatuses);
        } else {
            setStatuses([]);
            fn && fn('/app/dashboard/index');
        }
    }

    const changeStatus = (key: string, fn?: (newKey: string) => void) => {
        const newStatuses = statuses.filter((ele: any) => ele.key !== key);
        setStatuses(newStatuses);
        if (fn) {
            const length = newStatuses.length;
            if (length === 0) {
                fn('/app/dashboard/index');
            } else {
                fn(newStatuses[length - 1].key);
            }
        }
    }

    const onTagRefresh = (key: string) => {
        const initdata = aliveTags;
        const newData = initdata.filter((ele: string) => ele !== key);
        setAlita("aliveTags", newData);
    }

    return (
        <Layout>
            {checkLogin(auth && auth.permissions) && (
                <SiderCustom onSaveStatus={onSaveStatus} collapsed={collapsed} />
            )}
            <Layout className="app_layout">
                <HeaderCustom toggle={toggle} collapsed={collapsed} user={auth || {}} />
                <Content className="app_layout_content">
                    <StatusTabs onTagRefresh={onTagRefresh} onSignChangeStatus={onSignChangeStatus} onChangeStatus={changeStatus} statuses={statuses} />
                    {auth && auth.permissions ? <Routes auth={auth} /> : <Redirect to="/login" />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
