import * as React from 'react';
import { Tag } from 'antd';
import intl from '../intl/Index';
import { Link ,withRouter ,RouteComponentProps } from 'react-router-dom';
import { IFMenuBase } from '../../routes/config';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Index.module.less';

type StatusTabsProps = RouteComponentProps & {
    statuses: Array<IFMenuBase>;
    onChangeStatus?:(key:string,fn?:(key:string)=>void) => void;
    onSignChangeStatus?:(key?:string|null,fn?:(key:string)=>void)=>void;
    onTagRefresh?:(key:string)=>void;
} 

const StatusTabs = (props: StatusTabsProps) => {
    
    const OnSelectClick = (e:any) => {
          const value = e.target.innerHTML;
          const key = props.location.pathname;
          switch(value){
              case intl.get("close_others"):
                props.onSignChangeStatus && props.onSignChangeStatus(key);
                  break;
              case intl.get("close_all"):
                props.onSignChangeStatus && props.onSignChangeStatus("",function(nextKey:string){
                    props.history.push(nextKey)
                });
                  break; 
               default:
                   break;      
          }
    }
   
    const onTagClose = (key: string) => {
        const pathname = props.location.pathname;
        onTagRefresh(key);
        if(pathname===key){
            props.onChangeStatus && props.onChangeStatus(key,function(lastkey:string){
                props.history.push(lastkey);      
            });
        }else{
           props.onChangeStatus && props.onChangeStatus(key)
        };
    };
    
    const onTagRefresh = (key:string) => {
        props.onTagRefresh && props.onTagRefresh(key);
    }

    return (
        <div className={styles.container} style={props.statuses.length > 0 ? { display: "flex" } : { display: "none" }}  >
            <div className={styles.tabs}>
                {props.statuses.map((ele: any) => {
                    return (
                        <Tag className={styles.tab} key={ele.key} icon={<RedoOutlined onClick={()=>onTagRefresh(ele.key)} className={styles.refreshIcon} />} color={ props.location.pathname === ele.key ? "blue" : "" } closable onClose={() => onTagClose(ele.key)}>
                            <Link style={props.location.pathname === ele.key ? {color:"#1E90FF"} : {color:"#666666"}} to={ele.key} >
                                {intl.get(ele.title)}
                            </Link>
                        </Tag>
                    )
                })}
            </div>
            <div className={styles.selectContainer}>
                <span>
                    {intl.get("sign_select")}
                </span>
                <ul onClick={OnSelectClick} >
                    <li key="close_others" >{intl.get("close_others")}</li>
                    <li key="close_all" >{intl.get("close_all")}</li>
                </ul>
            </div>
        </div>
    );

};


export default withRouter(StatusTabs);