import * as React from 'react';
import { Table, Tooltip, Modal } from 'antd';
import StructureInfoModal from '../listmodal/StructureInfoModal';
import DataPreviewModal from '../listmodal/DataPreviewModal';
import StoreProcedureModal from '../listmodal/StoreProcedureModal';

const AttributeTable: React.FC<any> = () => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<object>({});
    const [modalKey, setModalKey] = React.useState<string>('');

    const handleCancel = () => {
        setVisible(false);
    };

    const renderModal = () => {
        switch (modalKey) {
            case 'info':
                return (
                    <Modal
                        title={(modalData as any).info}
                        visible={visible}
                        onCancel={handleCancel}
                        onOk={handleCancel}
                        destroyOnClose={true}
                        width="80%"
                    >
                        <StructureInfoModal data={modalData} />
                    </Modal>
                );
            case 'data_preview':
                return (
                    <Modal
                        title={(modalData as any).data_preview}
                        visible={visible}
                        onCancel={handleCancel}
                        onOk={handleCancel}
                        destroyOnClose={true}
                        width="80%"
                    >
                        <DataPreviewModal data={modalData} />
                    </Modal>
                );
            case 'store_procedure':
                return (
                    <Modal
                        title={(modalData as any).store_procedure}
                        visible={visible}
                        onCancel={handleCancel}
                        onOk={handleCancel}
                        destroyOnClose={true}
                        width="80%"
                    >
                        <StoreProcedureModal data={modalData} />
                    </Modal>
                );
            default:
                return null;
        }
    };

    const openModal = (key: string, row: object) => {
        setVisible(true);
        setModalKey(key);
        setModalData(row);
    };

    const tipStyle = {
        textDecoration: 'underline',
        color: '#4169E1',
    };

    const columns = [
        {
            title: '表名',
            dataIndex: 'name',
        },
        {
            title: '表中文名',
            dataIndex: 'nameCH',
        },
        {
            title: '系统',
            dataIndex: 'system',
        },
        {
            title: 'schema',
            dataIndex: 'schema',
        },
        {
            title: '数据源ID',
            dataIndex: 'data_source_ID',
        },
        {
            title: '环境',
            dataIndex: 'environment',
        },
        {
            title: '表结构信息',
            dataIndex: 'info',
            render: (text: any, row: object, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={(row as any).info}>
                        <a style={tipStyle} onClick={() => openModal('info', row)}>
                            {(row as any).info}
                        </a>
                    </Tooltip>
                );
            },
        },
        {
            title: '表数据预览',
            dataIndex: 'data_preview',
            render: (text: any, row: object, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={(row as any).data_preview}>
                        <a style={tipStyle} onClick={() => openModal('data_preview', row)}>
                            {(row as any).data_preview}
                        </a>
                    </Tooltip>
                );
            },
        },
        {
            title: '表存储过程代码',
            dataIndex: 'store_procedure',
            render: (text: any, row: object, index: number) => {
                return (
                    <Tooltip placement="topLeft" title={(row as any).store_procedure}>
                        <a style={tipStyle} onClick={() => openModal('store_procedure', row)}>
                            {(row as any).store_procedure}
                        </a>
                    </Tooltip>
                );
            },
        },
    ];

    const data: any[] = [
        {
            key: 0,
            name: `cb_evt_cust_trd_astk_1d`,
            nameCH: `A股佣金`,
            granularity: '用户',
            system: `企业数仓`,
            schema: `htsc_dws`,
            data_source_ID: `gpdw`,
            environment: `PRD`,
            info: `表结构信息`,
            structure: `表结构`,
            data_preview: `表数据预览`,
            store_procedure: `表存储过程`,
        },
        {
            key: 1,
            name: `cb_evt_cust_clisc_astk_1d`,
            nameCH: `股票净佣金收入`,
            granularity: '用户',
            system: `企业数仓`,
            schema: `htsc_dws`,
            data_source_ID: `gpdw`,
            environment: `PRD`,
            info: `表结构信息`,
            structure: `表结构`,
            data_preview: `表数据预览`,
            store_procedure: `表存储过程`,
        },
        {
            key: 2,
            name: `cb_evt_cust_trd_astk_1d `,
            nameCH: `客户A股佣金、净佣金、交易金额等交易信息`,
            granularity: '用户',
            system: `大数据基础平台`,
            schema: `htsc_dws`,
            data_source_ID: `dw-bigdata-hive`,
            environment: `PRD`,
            info: `表结构信息`,
            structure: `表结构`,
            data_preview: `表数据预览`,
            store_procedure: `表存储过程`,
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);

    const onSelectChange = (selectedRowKeys: string[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const onPagination = () => {
        return {
            total: data?.length,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page: number, pagesize: number | undefined) => {
            },
        };
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div style={{ paddingLeft: '10px' }}>
            <Table
                bordered={true}
                pagination={onPagination()}
                //rowSelection={rowSelection as any}
                scroll={{ x: true }}
                columns={columns}
                dataSource={data}
            />
            {renderModal()}
        </div>
    );
};

export default AttributeTable;
