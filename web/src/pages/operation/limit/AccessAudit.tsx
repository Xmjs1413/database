import * as React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { PicRightOutlined } from '@ant-design/icons';
import { FormLayout } from '../../../constants/FormLayout';
import { getTableVisitData } from '../../../service/operation';
import SearchButton from '../../../components/button/SearchButton';
import styles from './AccessAudit.module.less';

const FormItem = Form.Item;
const Option = Select.Option;

const AccessAudit = () => {

    const [tabsData, setTabsData] = React.useState<any>(null);
    const [tabsKeys, setTabsKeys] = React.useState<Array<string> | undefined>(undefined);

    const [form] = Form.useForm();

    const getTableData = async (params: object) => {
        const data: any = {};
        const keys: string[] = [];
        const result: any = await getTableVisitData({ ...params });
        result && typeof result === 'object' && Object.keys(result)?.map((ele: string) => {
            const { groups, roles, users } = result[ele] as any;
            const groupsValues = Object.values(groups);
            const rolesValues = Object.values(roles);
            const usersValues = Object.values(users);
            data[ele] = {
                groups: groupsValues,
                roles: rolesValues,
                users: usersValues
            };
            keys.push(ele);
        });
        return { data, keys }
    }

    React.useEffect(() => {
        let isUnmounted = false;
        const abortController = new AbortController();
        (
            async () => {
                if (!isUnmounted) {
                    const { data, keys } = await getTableData({dbtables:"ana_matic.trade_terminal,ana_matic.total_fund2"});
                    form.setFieldsValue({
                        "dbtables":["ana_matic.trade_terminal,ana_matic.total_fund2"]
                    });
                    setTabsData(data);
                    setTabsKeys(keys);
                };
            }
        )();
        return () => {
            isUnmounted = true;
            abortController.abort();
        };
    }, []);

    const onFinish = (values: any) => {

    }

    const renderTabContent = (key: string, obj: object,index?:number) => {
        const { groups, roles, users } = obj as any;
        const pStyle = { margin: "0px", padding: "0px", color: "#1890ff" };
        return (
            <div key={index}>
                <Form
                   {...FormLayout} 
                >
                    <FormItem
                        label={<span>表名</span>}
                    >
                        <p style={{ ...pStyle }} key={key} >{key}</p>
                    </FormItem>
                    <FormItem
                        label={<span>可访问表组</span>}
                    >
                        {groups.map((item: any) => {
                            return (
                                <p style={{ ...pStyle }} key={item} >{item}</p>
                            )
                        })}
                    </FormItem>
                    <FormItem
                        label={<span>可访问表角色</span>}
                    >
                        {roles.map((item: any) => {
                            return (
                                <p style={{ ...pStyle }} key={item} >{item}</p>
                            )
                        })}
                    </FormItem>
                    <FormItem
                        label={<span>可访问表用户</span>}
                    >
                        {users.map((item: any) => {
                            return (
                                <p style={{ ...pStyle }} key={item} >{item}</p>
                            )
                        })}
                    </FormItem>
                </Form>
            </div>
        )
    }

    return (
        <div className={styles.container} >
            <div className={styles.title} >
                <PicRightOutlined className={styles.titlePrefix} />
                <h2>表访问审计信息</h2>
            </div>
            <div className={styles.content} >
                <div>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        {...FormLayout}
                    >
                        <Row>
                            <Col span={12} >
                                <FormItem
                                    label="表名"
                                    name="dbtables"
                                >
                                   <Select
                                      mode="multiple"

                                   >
                                       {
                                           tabsKeys && tabsKeys.map((item:string)=>{
                                                 return (
                                                     <Option key={item} value={item} >
                                                         {item}
                                                     </Option>
                                                 )  
                                           })
                                       }
                                   </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} >
                                <SearchButton />
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div>
                    <Row>
                        {
                            tabsData && tabsKeys?.map((key: string,index:number) => {
                                return <Col key={key} span={12} >
                                    {renderTabContent(key, tabsData[key],index)}
                                </Col>
                            })
                        }
                    </Row>
                </div>
            </div>     
        </div>
    )
};

export default AccessAudit;

