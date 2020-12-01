import * as React from 'react';
import { useState, useEffect } from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const sideJson = require('./collect.json');

interface SideProps {
    onContentChange?: (value: string) => void;
}

const MyCollectSide: React.FC<SideProps> = (props) => {
    const [treeData, setTreeData] = useState<any[]>([]);
    const [initData, setInitData] = useState<any[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

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

    const onSelect = (selectedKeys: any[], info: any) => {
        // setSelectedKeys(selectedKeys);
        // const selectedNode = initData.filter(ele => `${ele.id}` === selectedKeys[0]);
        // const { name } = selectedNode[0];
        // //props.onContentChange(name);
    };

    useEffect(() => {
        const data: any[] = sideJson;
        const treeData = translateTree(sideJson);
        setInitData(data);
        setTreeData(treeData);
    }, []);

    return (
        <div>
            <Tree
                showLine
                treeData={treeData}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                className="semanticTree"
                switcherIcon={<DownOutlined />}
            />
        </div>
    );
};

export default MyCollectSide;
