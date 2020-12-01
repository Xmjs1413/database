import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routesConfig, { IFMenuBase, IFMenu } from './config';
import { checkLogin } from '../utils';
import RouteWrapper from './RouteWrapper';
import { KeepAlive } from 'react-keep-alive';
import { connectAlita } from 'redux-alita';
import allPages from './pages';

type CRouterProps = {
    auth: any;
    aliveTags:any
};

const CRouter = (props: CRouterProps) => {
    const { auth } = props;
    const [aliveTagsData,setAliveTagsData] = React.useState<Array<string>>([]);
    const getPermits = (): any[] | null => {
        return auth ? auth.permissions : null;
    };

    const requireAuth = (permit: any, component: React.ReactElement) => {
        const permits = getPermits();
        if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />;
        return component;
    };

    const requireLogin = (component: React.ReactElement, permit: any) => {
        const permits = getPermits();

        if (!checkLogin(permits)) {
            // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permit ? requireAuth(permit, component) : component;
    };

    const createMenu = (r: IFMenu ,data?:any[]) => {
        const route = (r: IFMenuBase) => {
            const WComponent = r.component && allPages[r.component];
            const aliveTime = new Date().getTime();
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={(props: any) => {
                        // 重新包装组件
                        const wrapper = (
                            (data && data.indexOf(r.key)>-1) ? <KeepAlive name={r.key+aliveTime} >
                              <RouteWrapper {...{ ...props, Comp: WComponent, route: r }} />
                            </KeepAlive> : 
                            <RouteWrapper {...{ ...props, Comp: WComponent, route: r }} />
                        );
                        return r.login ? wrapper : requireLogin(wrapper, r.requireAuth);
                    }}
                />
            );
        };

        const subRoute = (r: IFMenu): any =>
            r.subs && r.subs.map((subR: IFMenu) => (subR.subs ? subRoute(subR) : route(subR)));

        return r.component ? route(r) : subRoute(r);
    };

    const createRoute = (key: string,data?:any[]) => {
        return routesConfig[key].map((ele:any)=>createMenu(ele,data))
    };

    const renderRoute = (data?:any[]) => {
        return Object.keys(routesConfig).map((key) => createRoute(key,data))
    };

    React.useEffect(()=>{
       setAliveTagsData(props.aliveTags.data || []);
    },[props])

    return (
        <Switch>
             {
                renderRoute(aliveTagsData)
             }
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    );
};

export default connectAlita(["aliveTags"])(CRouter);
