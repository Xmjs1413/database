import React, { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Layout, Popover, Select } from 'antd';
import { gitOauthToken, gitOauthInfo } from '../service';
import { parseQuery } from '../utils';
import { useHistory } from 'react-router-dom';
import { useAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
import { useSwitch } from '../utils/hooks';
import {
    ArrowsAltOutlined,
    BarsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};

const HeaderCustom = (props: HeaderCustomProps) => {
    const [user, setUser] = useState<any>();
    const [responsive] = useAlita('responsive', { light: true });
    const [lang, setAlita] = useAlita({ "lang": "zh" }, { light: true });

    const [visible, turn] = useSwitch();
    const history = useHistory();

    useEffect(() => {
        const query = parseQuery();
        let storageUser = umbrella.getLocalStorage('user');

        if (!storageUser && query.code) {
            gitOauthToken(query.code as string).then((res: any) => {
                gitOauthInfo(res.access_token).then((info: any) => {
                    setUser({
                        user: info,
                    });
                    umbrella.setLocalStorage('user', info);
                });
            });
        } else {
            setUser({
                user: storageUser,
            });
        }
    }, []);

    useEffect(()=>{
      const localLang = umbrella.getLocalStorage("localLang") || "zh";
      setAlita("lang",localLang); 
    },[]);

    const screenFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };
    const menuClick = (e: any) => {
        e.key === 'logout' && logout();
    };
    const logout = () => {
        umbrella.removeLocalStorage('user');
        history.push('/login');
    };

    const handleChangeLang = (val: string) => {
        setAlita("lang", val);
    }

    return (
        <Header className="custom-theme header">
            {responsive?.isMobile ? (
                <Popover
                    content={<SiderCustom popoverHide={turn.turnOff} />}
                    trigger="click"
                    placement="bottomLeft"
                    visible={visible}
                    onVisibleChange={(visible:boolean) => (visible ? turn.turnOn() : turn.turnOff())}
                >
                    <BarsOutlined className="header__trigger custom-trigger" />
                </Popover>
            ) : props.collapsed ? (
                <MenuUnfoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            ) : (
                        <MenuFoldOutlined
                            className="header__trigger custom-trigger"
                            onClick={props.toggle}
                        />
                    )}
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
                onClick={menuClick}
            >
                <Menu.Item key="full">
                    <ArrowsAltOutlined onClick={screenFull} />
                </Menu.Item>
                <SubMenu
                    title={
                        <span className="avatar">
                            <img src={avater} alt="头像" />
                            <i className="on bottom b-white" />
                        </span>
                    }
                >
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="logout">
                            <span onClick={logout}>退出登录</span>
                        </Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
            <Select
                style={{ width: '100px', float: 'right', marginTop: '15px' }}
                defaultValue={lang}
                value={lang}
                onChange={handleChangeLang}
            >
                <Option key="zh" value="zh">中文</Option>
                <Option key="en" value="en">英文</Option>
            </Select>

        </Header>
    );
};

export default HeaderCustom;
