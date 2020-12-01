import React,{Suspense} from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/notfound/NotFound';
import Login from './pages/login/Login';
import App from './App';
import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';
import umbrella from 'umbrella-storage';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import { Provider as KeepAliveProvider } from 'react-keep-alive';
import { connectAlita } from 'redux-alita';
import Loading from './pages/widget/Loading';

const locales = {
    "en": require('./locales/en-US.json'),
    "zh": require('./locales/zh-CN.json'),
};

const Page = (props: any) => {
    const [localLang, setLocalLang] = React.useState<any>();

    function loadLocales(lang = umbrella.getLocalStorage("localLang") || "zh") {
        intl.init({
            currentLocale: lang,
            locales,
        }).then(() => {
            setLocalLang(lang === 'zh' ? zh_CN : en_US);
        });
    };

    React.useEffect(() => {
        const data = props.lang.data;
        umbrella.setLocalStorage("localLang", data || "zh");
        loadLocales(data);
    }, [props]);


    return (
        <div style={{ height: "100%" }} >
            {  localLang
                ?<Suspense fallback={<Loading />} >
                      <ConfigProvider locale={localLang}>
                        <KeepAliveProvider>
                            <Router>
                                <Switch>
                                    <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
                                    <Route path="/app" component={App} />
                                    <Route path="/404" component={NotFound} />
                                    <Route path="/login" component={Login} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Router>
                        </KeepAliveProvider>
                       </ConfigProvider>
                    </Suspense> 
                : null
            }
        </div>
    )
};

export default connectAlita(["lang", "aliveTags"])(Page);
