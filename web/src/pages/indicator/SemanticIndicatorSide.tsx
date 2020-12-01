import * as React from 'react';
import { useState, useEffect } from 'react';
import { Tree, Input, Spin } from 'antd';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import MyCollectSide from './MyCollectSide';
import styles from './SemanticIndicatorSide.module.less';
const sideJson = require('./semantics.json');

const { Search } = Input;

interface SideProps {
    onContentChange: (name: string, type: string | null) => void;
}

const SemanticIndicatorSide: React.FC<SideProps> = (props) => {
    const [isSpinning, setSpinning] = useState<boolean>(false);
    const [treeData, setTreeData] = useState<any[]>([]);
    const [initData, setInitData] = useState<any[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['']);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const toTree = (item: any, array: any[]): any[] => {
        const data = [];
        const childrenArray = array.filter((ele: any) => ele.pid === item.id);
        for (let i = 0; i < childrenArray.length; i++) {
            const child = childrenArray[i];
            data.push({
                key: child.id,
                title: child.name,
                children: toTree(child, array),
            });
        }
        return data;
    };

    const translateTree = (data: any) => {
        const paraentData = data.filter((ele: any) => ele.pid === 0);
        const restArray = data.filter((ele: any) => ele.pid !== 0);
        const result = [];
        for (let i = 0; i < paraentData.length; i++) {
            const parentItem = paraentData[i];
            result.push({
                key: parentItem.id,
                title: parentItem.name,
                children: restArray.length > 0 ? toTree(parentItem, restArray) : [],
            });
        }
        return result;
    };

    const result: any[] = [];
    const flattern = (arr: any[]) => {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            const item = arr[i];
            if (Array.isArray(item)) {
                flattern(item);
            } else {
                result.push(item);
            }
        }
        return result;
    };

    const getNewIds = (item: any): any[] => {
        const pItem = initData?.filter((ele) => ele.id === item.pid);
        const temp = [];
        if (item.pid !== 0) {
            temp.push(item.id);
            temp.push(getNewIds(pItem[0]));
        } else {
            temp.push(item.id);
        }
        return temp;
    };

    const onTreeSearch = (v: string) => {
        setSpinning(true);
        setSearchValue(v);
        if (v) {
            const expandedKeys: string[] = [];
            let targetKeys: any[] = [];
            const targetArray = initData?.filter((ele) => ele.name.indexOf(v) > -1);

            targetArray?.map((ele) => {
                const ids = ele.pid === 0 ? [ele.id] : getNewIds(ele);
                const flatternIds = flattern(ids);
                targetKeys = targetKeys.concat(flatternIds);
            });

            const allKeys = [...new Set(targetKeys)];

            const newTreeData: any[] = [];
            initData?.map(function(ele){
                allKeys.map(function(item){
                    if (ele.id === item) {
                        newTreeData.push(ele);
                        expandedKeys.push(`${ele.id}`);
                    }
                });
            });

            const rootTree = translateTree(newTreeData);
            setTreeData(rootTree);
            setExpandedKeys(expandedKeys);
            setSelectedKeys(expandedKeys);
            setAutoExpandParent(true);
            setSpinning(false);
        } else {
            const rootTree = translateTree(initData);
            setTreeData(rootTree);
            setExpandedKeys([]);
            setSelectedKeys([]);
            setAutoExpandParent(false);
            setSpinning(false);
        }
    };

    const onTreeExpand = (expandedKeys: any) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onSelect = (selectedKeys: any[], info: any) => {
        setSelectedKeys(selectedKeys);
        const selectedNode = initData.filter((ele) => `${ele.id}` === selectedKeys[0]);
        if (selectedNode && selectedNode.length > 0 && selectedNode[0].pid !== 0) {
            const { name } = selectedNode[0];
            const type = selectedNode[0].type || null;
            props.onContentChange(name, type);
        }
    };

    useEffect(() => {
        const data: any[] = sideJson;
        const treeData = translateTree(sideJson);
        setInitData(data);
        setTreeData(treeData);
    },[]);

    const loop = (data: any[]): any[] => {
        return data.map((ele) => {
            const index = ele.title.indexOf(searchValue);
            const beforeStr = ele.title.substr(0, index);
            const afterStr = ele.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span className="site-tree-search-value">{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <>
                        <span>{ele.title}</span>
                    </>
                );
            if (ele.children) {
                return {
                    key: `${ele.key}`,
                    title,
                    children: loop(ele.children),
                };
            }
            return {
                key: `${ele.key}`,
                title,
            };
        });
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

    return (
        <div className={styles.container}>
            <div>
                <Search
                    placeholder="search..."
                    onSearch={onTreeSearch}
                    style={{ width: '100%' }}
                    size="large"
                />
            </div>
            <div>
                <Spin spinning={isSpinning} indicator={antIcon}>
                    <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        treeData={loop(treeData)}
                        onSelect={onSelect}
                        expandedKeys={expandedKeys}
                        selectedKeys={selectedKeys}
                        autoExpandParent={autoExpandParent}
                        onExpand={onTreeExpand}
                        className="semanticTree"
                    />
                </Spin>
                <MyCollectSide />
            </div>
        </div>
    );
};

export default SemanticIndicatorSide;
