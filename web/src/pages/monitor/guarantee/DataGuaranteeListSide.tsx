import * as React from 'react';
import { Tree } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

const treeData = [
  {
    title: 'DSP 系统',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'EXORA',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'CRM数据',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'MF层数据',
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: '资产旁路',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
          {
            title: '全球通数据',
            key: '0-0-0-3',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'ACRM_GP',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'CRM直推数据',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'HT_HIS',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: '柜台清算数据',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          }
        ],
      },
    ],
  },
  {
    title: 'DXP系统',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'GP',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'CRM系统',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />
          }
        ]
      }
    ]
  }
];
const DataGuaranteeListSide = (props:any) => {

    return (
        <div>
          <Tree
            showLine
            defaultExpandedKeys={['0-0-0']}
            treeData={treeData}
          />
        </div>
      );
   
};

export default DataGuaranteeListSide;
