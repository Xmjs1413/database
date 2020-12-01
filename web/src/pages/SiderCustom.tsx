import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import routes, { IFMenuBase ,IFMenu } from '../routes/config';
import SiderMenu from './SiderMenu';
import { useSwitch } from '../utils/hooks';
import { usePrevious } from 'ahooks';
import intl from '../components/intl/Index';
const { Sider } = Layout;

type SiderCustomProps = RouteComponentProps<any> & {
    popoverHide?: () => void;
    collapsed?: boolean;
    smenus?: any;
    onSaveStatus?:(key:IFMenuBase)=>void
};
interface IMenu {
    openKeys: string[];
    selectedKey: string;
}

const SiderCustom = (props: SiderCustomProps) => {
    const [collapsed, tCollapsed] = useSwitch();
    const [firstHide, tFirstHide] = useSwitch();
    const [menu, setMenu] = useState<IMenu>({ openKeys: [''], selectedKey: '' });
    // 异步菜单
    //  const [smenus] = useAlita({ smenus: [] }, { light: true });
    const { location, collapsed: pCollapsed } = props;
    const prePathname = usePrevious(props.location.pathname);
    useEffect(() => {
        const recombineOpenKeys = (openKeys: string[]) => {
            let i = 0;
            let strPlus = '';
            let tempKeys: string[] = [];
            // 多级菜单循环处理
            while (i < openKeys.length) {
                strPlus += openKeys[i];
                tempKeys.push(strPlus);
                i++;
            }
            return tempKeys;
        };
        const getOpenAndSelectKeys = () => {
            return {
                openKeys: recombineOpenKeys(location.pathname.match(/[/](\w+)/gi) || []),
                selectedKey: location.pathname,
            };
        };

        if (pCollapsed !== collapsed) {
            setMenu(getOpenAndSelectKeys());
            tCollapsed.setSwitcher(!!pCollapsed);
            tFirstHide.setSwitcher(!!pCollapsed);
        }

        if (prePathname !== location.pathname) {
            setMenu(getOpenAndSelectKeys());
        }
    }, [prePathname, location.pathname, collapsed, tFirstHide, tCollapsed, pCollapsed]);

    const menuClick = (e: any) => {
        const findItem = (menuItem:IFMenu) => {
            if(menuItem.subs && menuItem.subs.length> 0){
                return menuItem.subs.map(ele=>{
                    findItem(ele);
                })
            }else{
                if(e.key===menuItem.key){
                    props.onSaveStatus && props.onSaveStatus(menuItem);
                }
            };
        };
        routes.menus.map((ele:IFMenu)=>{
             findItem(ele)   
        });
        setMenu((state) => ({ ...state, selectedKey: e.key }));
        props.popoverHide?.(); // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    };

    const openMenu: any = (v: string[]) => {
        setMenu((state) => ({ ...state, openKeys: v }));
        tFirstHide.turnOff();
    };

    return (
        <Sider
            trigger={null}
            breakpoint="lg"
            collapsed={collapsed}
            style={{ overflowY: 'auto' }}
            className="sider-custom"
        >
            <div className="logo">{`${!collapsed ? intl.get('admin_manage') : ''}`}</div>
            <SiderMenu
                menus={[...routes.menus]} //...smenus 异步菜单 服务端
                onClick={menuClick}
                mode="inline"
                selectedKeys={[menu.selectedKey]}
                openKeys={firstHide ? [] : menu.openKeys}
                onOpenChange={openMenu}
            />
            <style>
                {`
                    #nprogress .spinner{
                        left: ${collapsed ? '50px' : '206px'};
                        right: 0 !important;
                    }
                    `}
            </style>
        </Sider>
    );
};

export default withRouter(SiderCustom);
