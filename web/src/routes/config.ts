export interface IFMenuBase {
    key: string;
    title: any;
    icon?: string;
    component?: any;
    query?: string;
    requireAuth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}
const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: 'home', icon: 'mobile', component:'Dashboard' },
        { 
            key: '/app/monitor', 
            title: 'monitor', 
            icon: 'syncOutlined',
            subs:[
                {
                  key: '/app/monitor/operation',
                  title:'operation_screen',
                  component: 'FlowPage'
                },
                {
                    key: '/app/monitor/inherit',
                    title:'inherit_parse',
                    component: 'InheritPage'
                },
                {
                    key:'/app/monitor/guarantee',
                    title:'data_guarantee_list',
                    component: 'DataGuaranteeListPage'
                }
            ]
        },
        {
            key: '/app/knowledge',
            title: 'knowledge_graph',
            icon: 'alignLeftOutlined',
            component: 'KnowledgeGraphPage'
        },
        {
            key: '/app/firstindicator',
            title: 'semantic_indicator_first',
            icon: 'alignRightOutlined',
            component: 'SemanticIndicatorPage'
        },
        {
            key: '/app/indicator',
            title: 'semantic_indicator',
            icon: 'alignRightOutlined',
            component: 'SemanticIndicatorPage'
        },
        {
            key: '/app/operation',
            title: 'operation',
            icon: 'switcher',
            subs: [
                { 
                    key: '/app/operation/capacity', 
                    title: 'capacity_manage', 
                    icon: 'user', 
                    component: 'CapacityPage'
                },
                { 
                    key: '/app/operation/queue', 
                    title: 'queue_manage', 
                    icon: 'user', 
                    component: 'QueueManage'
                },
                { 
                    key: '/app/operation/limit', 
                    title: 'limit_manage', 
                    icon: 'user', 
                    subs:[
                      {
                        key: '/app/operation/limit/list', 
                        title: 'list_limit_manage', 
                        icon: 'list',
                        component: 'ListLimitPage'
                      },
                      {
                        key: '/app/operation/limit/user', 
                        title: 'user_limit_manage', 
                        icon: 'user',
                        component: 'UsersLimitPage'
                      }   
                    ]
                },
            ],
        },
        {
            key: '/app/extension',
            title: 'extension',
            icon: 'bars',
            subs: [
                {
                    key: '/app/extension/queryParams',
                    title: 'query_param',
                    component: 'QueryParams',
                    query: '?param1=1&param2=2',
                },
                {
                    key: '/app/extension/visitor',
                    title: 'visitor_mode',
                    component: 'Visitor',
                    login: true,
                },
                {
                    key: '/app/extension/env',
                    title: 'env',
                    component: 'Env'
                },
            ],
        },
        {
            key: '/app/auth',
            title: 'authority_management',
            icon: 'safety',
            subs: [
                { 
                    key: '/app/auth/basic', 
                    title: 'base_demo', 
                    component: 'AuthBasic'
                },
                {
                    key: '/app/auth/routerEnter',
                    title: 'route_interception',
                    component: 'RouterEnter',
                    requireAuth: 'auth/testPage',
                },
            ],
        },
    ],
    others: [],
};

export default menus;
