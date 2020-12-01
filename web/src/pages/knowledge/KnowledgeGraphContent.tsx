import * as React from 'react';
import { Table, Input, Button, Tooltip, Modal } from 'antd';
import { SwapOutlined, EditFilled } from '@ant-design/icons';
import KnowledgeGraphDetail from './KnowledgeGraphDetail';
import KnowledgeGraphCode from './KnowledgeGraphCode';
const contentData = require('./content.json');

const { Search } = Input;

const KnowledgeGraphContent: React.FC<{ title?: string }> = (props) => {
    const [detailVisible, setDetailVisible] = React.useState<boolean>(false);
    const [codeVisible, setCodeVisible] = React.useState<boolean>(false);
    const [detailRow, setDetailRow] = React.useState<any>();
    const [tableData, setTableData] = React.useState<any>();
    const [initData, setInitData] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const columns = [
        {
            title: '指标名称',
            dataIndex: 'name',
            ellipsis: { showTitle: false },
            render: (text: any, record: object, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={text}>
                        {text}
                    </Tooltip>
                );
            },
        },
        {
            title: '英文名称',
            dataIndex: 'Ename',
            ellipsis: { showTitle: false },
            render: (text: any, record: object, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={text}>
                        {text}
                    </Tooltip>
                );
            },
        },
        {
            title: '业务模块',
            dataIndex: 'work',
        },
        {
            title: '数据域',
            dataIndex: 'dataField',
        },
        {
            title: '业务过程',
            dataIndex: 'process',
        },
        {
            title: '原子指标',
            dataIndex: 'atomic',
        },
        {
            title: '维度',
            dataIndex: 'dimension',
        },
        {
            title: '维度值',
            dataIndex: 'dimenValue',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (text: any, record: object, index: number) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip title="详情">
                            <Button onClick={() => onShowDetail(record)} icon={<SwapOutlined />} />
                        </Tooltip>
                        <Tooltip title="代码">
                            <Button onClick={() => onShowCode(record)} icon={<EditFilled />} />
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const fetchSearchData = (value: string) => {
        setLoading(true);
        if (value) {
            const searchData: any[] = [];
            initData.map((ele: any) => {
                for (let i in ele) {
                    if (typeof ele[i] !== 'string') {
                        continue;
                    }
                    if (ele[i] && ele[i].indexOf(value) > -1) {
                        searchData.push(ele);
                    }
                }
            });
            setTableData(searchData);
            setLoading(false);
        } else {
            setTableData(initData);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSearchData(props.title || '');
    }, [props.title]);

    React.useEffect(() => {
        let isUnmounted = false;
        (async () => {
            // const res = getKnowledgeContent({all:'1'});
            const result: any[] = contentData; //res.data || [];
            const data: any[] = [];
            result.map((ele: any, index: number) => {
                data.push({
                    key: `${ele.seq_id}`,
                    name: ele.name_cn,
                    Ename: ele.name_en,
                    work: ele.sector_name,
                    dataField: ele.field_name,
                    process: ele.process_name,
                    atomic: ele.atomic_name,
                    dimension: `Dimension ${index}`,
                    dimenValue: `dimenValue ${index}`,
                    remarks: `remarks ${index}`,
                    sql: `Select * from *** ${index}`,
                });
            });
            if (!isUnmounted) {
                setTableData(data);
                setInitData(data);
                setLoading(false);
            }
        })();
        return () => {
            isUnmounted = true;
        };
    }, []);

    const onShowDetail = (row: object) => {
        setDetailVisible(true);
        setDetailRow(row);
    };

    const onDetailCancel = () => {
        setDetailVisible(false);
    };

    const onShowCode = (row: object) => {
        setCodeVisible(true);
        setDetailRow(row);
    };

    const onCodeCancel = () => {
        setCodeVisible(false);
    };

    const onPagination = () => {
        return {
            total: tableData?.length,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page: number, pagesize: number | undefined) => {
            },
        };
    };

    const renderDetail = () => {
        return (
            <div>
                {detailRow ? (
                    <Modal
                        title={`指标ID：${detailRow.key}`}
                        visible={detailVisible}
                        onCancel={onDetailCancel}
                        destroyOnClose={true}
                        width="60%"
                        footer={null}
                    >
                        <KnowledgeGraphDetail onClose={onDetailCancel} data={detailRow} />
                    </Modal>
                ) : null}
            </div>
        );
    };

    const renderCode = () => {
        return (
            <div>
                {detailRow ? (
                    <Modal
                        title={`指标ID：${detailRow.key}`}
                        visible={codeVisible}
                        onCancel={onCodeCancel}
                        destroyOnClose={true}
                        width="60%"
                        footer={null}
                    >
                        <KnowledgeGraphCode onClose={onCodeCancel} data={detailRow} />
                    </Modal>
                ) : null}
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <Search
                    placeholder="input search text"
                    onSearch={fetchSearchData}
                    style={{ width: 200 }}
                    size="large"
                />
            </div>
            <Table
                loading={loading}
                bordered={true}
                rowKey="key"
                columns={columns}
                dataSource={tableData}
                pagination={onPagination()}
            />
            {renderDetail()}
            {renderCode()}
        </div>
    );
};

export default KnowledgeGraphContent;
