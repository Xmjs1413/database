import * as React from 'react';
import G6 from '@antv/g6';
import styles from './QuotaChart.module.less';

const data = {
    nodes: [
        {
            id: '1',
            name: '业务指标',
            label: '业务指标',
            style: {
                fill: 'red',
            },
        },
        {
            id: '2',
            name: '开发指标',
            label: '开发指标',
            style: {
                fill: 'yellow',
            },
        },
        {
            id: '3',
            name: '表',
            label: '表',
            style: {
                fill: 'lightBlue',
            },
        },
        {
            id: '4',
            name: '报表',
            label: '报表',
            style: {
                fill: 'green',
            },
        },
    ],
    edges: [
        {
            source: '1',
            target: '2',
        },
        {
            source: '2',
            target: '3',
        },
        {
            source: '3',
            target: '4',
        },
    ],
};

const QuotaChart: React.FC<any> = () => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref && ref.current) {
            const width = (ref as any).current.offsetWidth;
            const height = 500;
            const graph = new G6.Graph({
                container: (ref as any).current,
                width,
                height,
                layout: {
                    type: 'dagre',
                    // nodesepFunc: () => {
                    //     return 50;
                    // },
                    ranksep: 30,
                },
                defaultNode: {
                    type: 'circle',
                    labelCfg: {
                        position: 'right',
                        offset: 5,
                    },
                },
                defaultEdge: {
                    type: 'polyline',
                    style: {
                        endArrow: true,
                        lineWidth: 1,
                        stroke: '#333',
                    },
                },
                nodeStateStyles: {
                    selected: {
                        stroke: '#d9d9d9',
                        fill: '#5394ef',
                    },
                },
                modes: {
                    default: ['drag-node'],
                },
                fitView: true,
            });
            graph.data(data);
            graph.render();
        }
    }, []);

    return (
        <div className={styles.container}>
            <div ref={ref as any} />
            <div>
                <div>
                    <span style={{ backgroundColor: 'red' }} />
                    <span>业务指标</span>
                </div>
                <div>
                    <span style={{ backgroundColor: 'yellow' }} />
                    <span>开发指标</span>
                </div>
                <div>
                    <span style={{ backgroundColor: 'lightBlue' }} />
                    <span>表</span>
                </div>
                <div>
                    <span style={{ backgroundColor: 'green' }} />
                    <span>报表</span>
                </div>
            </div>
        </div>
    );
};

export default QuotaChart;
