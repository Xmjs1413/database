import * as React from 'react';
import { Tree, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getKnowledgeSide } from '../../service/knowledge';

const sideJson = require('./side.json');

const { Search } = Input;

interface SideProps {
    onContentSearch?: (v: string) => void;
}

const KnowledgeGraphSide: React.FC<SideProps> = (props) => {
    const [isSpinning, setSpinning] = React.useState<boolean>(true);
    const [initData, setInitData] = React.useState<any[]>([]);
    const [treeData, setTreeData] = React.useState<any[]>([]);
    const [expandedKeys, setExpandedKeys] = React.useState<string[]>(['']);
    const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = React.useState<string[] | number[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    const toTree = (pid: string, restArray: []): any[] => {
        const children = [];
        const len = restArray.length;
        for (let i = 0; i < len; i++) {
            let node: any = restArray[i];
            if (node.pid === pid) {
                children.push({
                    key: `${node.id}`,
                    title: node.name,
                    children: toTree(node.id, restArray),
                });
            }
        }
        return children;
    };

    const translatetree = (data: any): { key: any; title: any; children: any[] }[] => {
        const rootTree: { key: any; title: any; children: any[] }[] = [];
        const restArray = data.filter((item: any) => item.pid !== 0);
        data.map((ele: any) => {
            if (ele.pid === 0) {
                const temp = {
                    key: `${ele.id}`,
                    title: ele.name,
                    children: restArray.length > 0 ? toTree(ele.id, restArray) : [],
                };
                rootTree.push(temp);
            }
            return ele;
        });
        return rootTree;
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

    const getAllId = (item: any) => {
        const pItem = initData.filter((ele) => ele.id === item.pid);
        const temp = [];
        if (item.pid === 0) {
            temp.push(item.id);
        } else {
            const id = item.id;
            temp.push(id);
            const nextId: any = getAllId(pItem[0]);
            temp.push(nextId);
        }
        return temp;
    };

    React.useEffect(() => {
        let isUnmounted = false;
        (async () => {
            if (!isUnmounted) {
                // const result = await getKnowledgeSide();
                // const { data } = result;
                const rootTree = translatetree(sideJson);
                setSpinning(false);
                setInitData(sideJson);
                setTreeData(rootTree);
            }
        })();

        return () => {
            isUnmounted = true;
        };
    }, []);

    const onSelect = (selectedKeys: any, info: any) => {
        setSelectedKeys(selectedKeys);
        const { children } = info.node.title.props;
        const title = `${children[0] + children[1].props.children + children[2]}`.trim();
        props.onContentSearch && props.onContentSearch(title);
    };

    const onTreeSearch = (value: any) => {
        setSearchValue(value || '');
        if (value !== '') {
            let temp: any[] = [];
            let allKeys: any[] = [];
            const expandedKeys: any[] = [];

            initData?.map((ele: any) => {
                if (ele.name.indexOf(value) > -1) {
                    const ids = ele.pid === 0 ? ele.id : getAllId(ele);
                    const flatternIds = flattern(ids);
                    temp = temp.concat(flatternIds);
                }
            });

            allKeys = [...new Set(temp)];

            const newTreeData: any[] = [];
            initData?.map((ele) => {
                allKeys.map((item) => {
                    if (ele.id === item) {
                        newTreeData.push(ele);
                        expandedKeys.push(`${ele.id}`);
                    }
                });
            });

            const rootTree = translatetree(newTreeData);
            setTreeData(rootTree);
            setExpandedKeys(expandedKeys);
            setSelectedKeys(expandedKeys);
            setAutoExpandParent(true);
        } else {
            const rootTree = translatetree(initData);
            setTreeData(rootTree);
            setExpandedKeys([]);
            setSelectedKeys([]);
            setAutoExpandParent(false);
        }
    };

    const onTreeExpand = (expandedKeys: any[]) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const loop = (data: any[]): any => {
        return data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span className="site-tree-search-value">{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }

            return {
                title,
                key: item.key,
            };
        });
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

    return (
        <div>
            <div style={{ marginBottom: '15px' }}>
                <Search
                    placeholder="input search text"
                    onSearch={onTreeSearch}
                    style={{ width: 200 }}
                    size="large"
                />
            </div>
            <Spin spinning={isSpinning} indicator={antIcon}>
                <Tree
                    showLine={true}
                    treeData={loop(treeData)}
                    onSelect={onSelect}
                    expandedKeys={expandedKeys}
                    selectedKeys={selectedKeys}
                    autoExpandParent={autoExpandParent}
                    onExpand={onTreeExpand}
                />
            </Spin>
        </div>
    );
};

export default KnowledgeGraphSide;
