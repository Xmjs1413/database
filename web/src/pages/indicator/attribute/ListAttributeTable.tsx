import * as React from 'react';
import { Table, Tooltip } from 'antd';

const columns = [
    {
        title: '列名',
        dataIndex: 'name',
        ellipsis: { showTitle: false },
        render: (text: any, row: any, index: number) => {
            return (
                <Tooltip placement="topLeft" title={row.name}>
                    <a>{row.name}</a>
                </Tooltip>
            );
        },
    },
    {
        title: '列中文名',
        dataIndex: 'nameCH',
    },
    {
        title: '字段类型',
        dataIndex: 'field_type',
    },
    {
        title: '是否主键',
        dataIndex: 'is_primary_key',
    },
    {
        title: '是否业务唯一键',
        dataIndex: 'is_bussiness_onlykey',
    },
    {
        title: '脱敏规划',
        dataIndex: 'desensitization_plan',
    },
    {
        title: '安全级别',
        dataIndex: 'safe_level',
    },
    {
        title: '安全标签',
        dataIndex: 'safe_sign',
    },
    {
        title: '备注',
        dataIndex: 'note',
    },
];

const data: any[] = [];
for (let i = 0; i < 19; i++) {
    data.push({
        key: i,
        name: `tcnms_sopt_share_1d_058 ${i}`,
        nameCH: `分成个股期权净佣金 ${i}`,
        field_type: `numeric(21.4) ${i}`,
        is_primary_key: `否 ${i}`,
        is_bussiness_onlykey: `否 ${i}`,
        desensitization_plan: `未设置 ${i}`,
        safe_level: `2-中 ${i}`,
        safe_sign: `空 ${i}`,
        note: `暂无备注 ${i}`,
    });
}

const ListAttributeTable: React.FC<any> = () => {
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
        <div>
            <Table
                bordered
                pagination={onPagination()}
                rowSelection={rowSelection as any}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default ListAttributeTable;
