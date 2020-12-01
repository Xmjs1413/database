import * as React from 'react';
import { Table, Tooltip } from 'antd';

const columns = [
    {
        title: 'chag_purs_cnfm_share_1d_014',
        dataIndex: 'chag_purs_cnfm_share_1d_014',
    },
    {
        title: 'last_modf_by',
        dataIndex: 'last_modf_by',
        ellipsis: { showTitle: false },
        render: (text: any, row: any, index: number) => {
            return (
                <Tooltip placement="topLeft" title={row.last_modf_by}>
                    <a>{row.last_modf_by}</a>
                </Tooltip>
            );
        },
    },
    {
        title: 'crt_busi_date',
        dataIndex: 'crt_busi_date',
    },
    {
        title: 'market_id',
        dataIndex: 'market_id',
    },
    {
        title: 'last_modf_busi_date',
        dataIndex: 'last_modf_busi_date',
    },
    {
        title: 'client_id',
        dataIndex: 'client_id',
    },
    {
        title: 'found_code',
        dataIndex: 'found_code',
    },
    {
        title: 'brh_id',
        dataIndex: 'brh_id',
    },
    {
        title: 'tshare_purs_cnfm_share_1d_079',
        dataIndex: 'tshare_purs_cnfm_share_1d_079',
    },
    {
        title: 'tamt_purs_cnfm_share_1d_079',
        dataIndex: 'tamt_purs_cnfm_share_1d_079',
    },
    {
        title: 'tamt_purs_cnfm_share_1d_147',
        dataIndex: 'tamt_purs_cnfm_share_1d_147',
    },
    {
        title: 'last_modf_date',
        dataIndex: 'last_modf_date',
    },
    {
        title: 'hdfs_par',
        dataIndex: 'hdfs_par',
    },
    {
        title: 'brh_no',
        dataIndex: 'brh_no',
    },
    {
        title: 'period_id',
        dataIndex: 'period_id',
    },
    {
        title: 'crt_by',
        dataIndex: 'crt_by',
    },
    {
        title: 'hs_client_key',
        dataIndex: 'hs_client_key',
    },
];

const data: any[] = [];
for (let i = 0; i < 19; i++) {
    data.push({
        key: i,
        chag_purs_cnfm_share_1d_014: `0 ${i}`,
        last_modf_by: `dws.cb_evt_cliscr_trd_fnd_p_ursshare_1d.sql ${i}`,
        crt_busi_date: `20080307`,
        market_id: `9`,
        last_modf_busi_date: `20080307`,
        client_id: `3486****`,
        found_code: `178558`,
        brh_id: `551`,
        tshare_purs_cnfm_share_1d_079: `92.06`,
        tamt_purs_cnfm_share_1d_079: `92.06`,
        tamt_purs_cnfm_share_1d_147: `1204905600000`,
        last_modf_date: `20200617`,
        hdfs_par: `56`,
        brh_no: `20200506`,
        period_id: `dws.cb_evt_cliscr_trd_fnd_p_ursshare_1d.sql ${i}`,
        crt_by: `1204905600000`,
        hs_client_key: `5246598`,
    });
}

const DataPreviewModal: React.FC<any> = (props) => {
    const onPagination = () => {
        return {
            total: data?.length,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page: number, pagesize: number | undefined) => {
            },
        };
    };

    return (
        <div>
            <Table
                bordered
                pagination={onPagination()}
                columns={columns}
                dataSource={data}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default DataPreviewModal;
