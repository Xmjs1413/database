import * as React from 'react';
import { Modal, Table, Tag } from 'antd';
import { getDependList, getSubDependList } from '../../../service/flow';
import { ColumnsType } from 'antd/es/table';

interface ModalProps {
    visible: boolean;
    content: { id: string, name: string, message: string };
    handleOk: () => void;
    handleCancel: () => void;
}

const ListModal = (props: ModalProps) => {
    const { visible = false, content, handleOk, handleCancel } = props;
    const { id, name, message } = content;
    const [linkVisible, setLinkVisible] = React.useState<boolean>(false);
    const [linkName, setLinkName] = React.useState<string>('');
    const [dataSource, setDataSource] = React.useState<Array<any>>([]);
    const [linkDataSource, setLinkDataSource] = React.useState<Array<any>>([]);

    const getStatus = (v: string | null) => {
        const value = v ? v.toUpperCase() : v;
        switch (value) {
            case 'R':
                return { 'status': '运行中', 'color': 'blue', 'rnk': 4 };
            case 'S':
                return { 'status': '成功', 'color': 'green', 'rnk': 5 };
            case 'E':
                return { 'status': '失败', 'color': 'red', 'rnk': 1 };
            case 'W':
                return { 'status': '等待', 'color': 'yellow', 'rnk': 2 };
            case null:
                return { 'status': '', 'color': '', 'rnk': 3 };
            default:
                return { 'status': '未知状态', 'color': '', 'rnk': 6 };
        }
    };

    const getType = (v: string | null | number) => {
        const value = v ? v.toString() : v;
        switch (value) {
            case '0':
                return "批前";
            case '1':
                return "订单";
            case '2':
                return "程序";
            case null:
                return "";
            default:
                return "";
        }
    };

    const columns: ColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'SRC_JOB_ORDER_ID',
            sorter: (a, b) => a.SRC_JOB_ORDER_ID - b.SRC_JOB_ORDER_ID,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '作业名称',
            dataIndex: 'JOB_EN_NAME',
            sorter: (a, b) => a.JOB_EN_NAME.localeCompare(b.JOB_EN_NAME, 'zh-CN'),
            sortDirections: ['ascend', 'descend'],
            render: (text: string, row: object, index: number) => {
                const tipStyle = {
                    color: '#4169E1',
                };
                return (
                    <div>
                        <a onClick={() => onLinkClick(row)} style={tipStyle}>{(row as any).JOB_EN_NAME}</a>
                    </div>
                )
            }
        },
        {
            title: '源',
            dataIndex: 'JOB_SRC_DB_NAME',
            sorter: (a, b) => a.JOB_SRC_DB_NAME.localeCompare(b.JOB_SRC_DB_NAME, 'zh-CN'),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '目标',
            dataIndex: 'JOB_TAR_DB_NAME',
            sorter: (a, b) => {
                const sa = a.JOB_TAR_DB_NAME || '';
                const sb = b.JOB_TAR_DB_NAME || '';
                return sa.localeCompare(sb, 'zh-CN')
            },
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '类型',
            dataIndex: 'JOB_TYPE_ID',
            sorter: (a, b) => a.typeNumber > b.typeNumber,
            sortDirections: ['ascend', 'descend'],
            render: (text: any, row: any) => (
                <Tag color='blue'>
                    {row.JOB_TYPE_ID.typeCh}
                </Tag>
            )
        },
        {
            title: '状态',
            dataIndex: 'JOB_STATUS',
            defaultSortOrder: 'ascend',
            sorter: (a: any, b: any) => {
                return a.JOB_STATUS.rnk - b.JOB_STATUS.rnk
            },
            sortDirections: ['ascend', 'descend'],
            render: (text: string, row: any, index: number) => {
                return (
                    <div>
                        <Tag onClick={() => onLinkClick(row)} color={row.JOB_STATUS.color} >
                            {row.JOB_STATUS.status}
                        </Tag>
                    </div>
                );
            },
        },
        {
            title: '开始时间',
            dataIndex: 'START_TIME',
            sorter: (a, b) => {
                const sa = a.START_TIME || ''
                const sb = b.START_TIME || ''
                return sa.localeCompare(sb, 'zh-CN')
            },
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '结束时间',
            dataIndex: 'END_TIME',
            sorter: (a, b) => {
                const sa = a.END_TIME || ''
                const sb = b.END_TIME || ''
                return sa.localeCompare(sb, 'zh-CN')
            },
            sortDirections: ['ascend', 'descend'],
        },
    ];

    const linkColumns: ColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'SRC_JOB_ORDER_ID',
        },
        {
            title: '作业名称',
            dataIndex: 'JOB_EN_NAME',
        },
        {
            title: '源',
            dataIndex: 'JOB_SRC_DB_NAME',
        },
        {
            title: '目标',
            dataIndex: 'JOB_TAR_DB_NAME',
        },
        {
            title: '类型',
            align: "center",
            render: (text: any, row: any) => {
                return (
                    <div>
                        {
                            row.JOB_TYPE_ID.typeCh && <Tag color='blue'>
                                {row.JOB_TYPE_ID.typeCh}
                            </Tag>
                        }
                    </div>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'JOB_STATUS',
        },
        {
            title: '开始时间',
            dataIndex: 'START_TIME',
        },
        {
            title: '结束时间',
            dataIndex: 'END_TIME',
        },
    ];

    React.useEffect(() => {
        (
            async () => {
                getDependList({ group_id: id }).then((data: any) => {
                    const addtest = {
                        END_TIME: "20201103 22:34",
                        JOB_EN_NAME: "BF_HT_SUBTA",
                        JOB_SRC_DB_IP: "188.40.1.111",
                        JOB_SRC_DB_NAME: "TA_中登",
                        JOB_STATUS: null,
                        JOB_TAR_DB_IP: null,
                        JOB_TAR_DB_NAME: null,
                        JOB_TYPE_ID: "0",
                        PERIOD_ID: 20201103,
                        SRC_JOB_ORDER_ID: "143..",
                        START_TIME: "20201103 22:33"
                    };
                    const addtest2 = {
                        END_TIME: "20201103 22:34",
                        JOB_EN_NAME: "BF_HT_SUBTA",
                        JOB_SRC_DB_IP: "188.40.1.111",
                        JOB_SRC_DB_NAME: "TA_中登",
                        JOB_STATUS: "",
                        JOB_TAR_DB_IP: null,
                        JOB_TAR_DB_NAME: null,
                        JOB_TYPE_ID: "0",
                        PERIOD_ID: 20201103,
                        SRC_JOB_ORDER_ID: "143..。",
                        START_TIME: "20201103 22:33"
                    };
                    data?.map((item: object) => {
                        const status = (item as any).JOB_STATUS;
                        const type = (item as any).JOB_TYPE_ID;
                        (item as any).JOB_TYPE_ID = { typeNumber: type, typeCh: getType(type) };
                        (item as any).JOB_STATUS = getStatus(status);
                    });
                    setDataSource((data as any));
                })
            }
        )();
    }, [id])

    const onLinkClick = (row: object) => {
        const { JOB_EN_NAME } = row as any;
        getSubDependList({ job_name: JOB_EN_NAME }).then((data: any) => {
            data?.map((item: object, index: number) => {
                const status = (item as any).JOB_STATUS;
                const type = (item as any).JOB_TYPE_ID;
                (item as any).JOB_TYPE_ID = { typeNumber: type, typeCh: getType(type) };
                (item as any).JOB_STATUS = getStatus(status);
                (item as any).key = index;;
            });
            setLinkDataSource(data as any);
            setLinkName(JOB_EN_NAME);
            setLinkVisible(true);
        });
    };

    const handleLinkOk = () => {
        setLinkVisible(false);
    };

    const handleLinkCancel = () => {
        setLinkVisible(false);
    };

    const renderLinkModal = () => {
        return (
            <Modal
                visible={linkVisible}
                onOk={handleLinkOk}
                onCancel={handleLinkCancel}
                destroyOnClose
                title={<span>{linkName}</span>}
                width="80%"
            >
                <p>{linkName}</p>
                <p>依赖作业列表：</p>
                <Table tableLayout="fixed" rowKey="key" dataSource={linkDataSource} columns={linkColumns} bordered />
            </Modal>
        );
    };

    return (
        <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
            title={
                <span>
                    {name}(group_id: {id})
                </span>
            }
            width="80%"
        >
            <div>
                <p>{message}</p>
                <p>作业列表:</p>
                <Table tableLayout="fixed" rowKey="SRC_JOB_ORDER_ID" dataSource={dataSource} columns={columns} bordered />
            </div>
            {linkVisible && renderLinkModal()}
        </Modal>
    );
};

export default ListModal;
