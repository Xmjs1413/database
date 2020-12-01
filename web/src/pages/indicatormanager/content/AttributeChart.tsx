import * as React from 'react';
import G6 from '@antv/g6';

const AttributeChart: React.FC<any> = () => {
    const containerRef = React.useRef();
    const ref = React.useRef(null);

    const data = {
        nodes: [
            {
                id: '0',
                label: '业务指标',
                labelCfg: {
                    style: {
                        fill: 'red',
                    },
                },
            },
            {
                id: '1',
                label: '技术指标',
                labelCfg: {
                    style: {
                        fill: 'yellow',
                    },
                },
            },
            {
                id: '2',
                label: 'table1',
                labelCfg: {
                    style: {
                        fill: '#6495ED',
                    },
                },
            },
            {
                id: '3',
                label: 'table2',
                labelCfg: {
                    style: {
                        fill: '#6495ED',
                    },
                },
            },
            {
                id: '4',
                label: 'table3',
                labelCfg: {
                    style: {
                        fill: '#6495ED',
                    },
                },
            },
            {
                id: '5',
                label: '目标集市',
                labelCfg: {
                    style: {
                        fill: '#000',
                    },
                },
            },
            {
                id: '6',
                name: '报表',
                type: 'dom-node',
            }
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
            {
                source: '1',
                target: '2',
            },
            {
                source: '1',
                target: '3',
            },
            {
                source: '2',
                target: '4',
                label: 'etl',
            },
            {
                source: '3',
                target: '5',
            },
            {
                source: '4',
                target: '5',
            },
            {
                source: '5',
                target: '6',
                label: '数据',
            }
        ],
    };

    React.useEffect(() => {
            G6.registerNode('dom-node', (cfg: any) => {
                return `
                <group>
                  <rect>
                   <text style={{ 
                      marginLeft: 20, 
                      marginBottom: 10,
                      textAlign: 'center', 
                      fill: #000 }}>{{name}}</text>
                   <image style={{ img: ${
                       process.env.PUBLIC_URL + '/images/icons/bb.jpg'
                   }, width: 80, height: 80 }} /> 
                  </rect>
                </group>`;
            });

            const graph = new G6.Graph({
                container: ref.current as any,
                width: 1200,
                height: 400,
                modes: {
                  default: ['drag-canvas'],
                },
                layout: {
                    type: 'dagre',
                    rankdir: 'LR',
                    align: 'UL',
                    nodesepFunc: (d: number) => {
                        return 20;
                    },
                    ranksep: 40,
                },
                defaultNode: {
                    type: 'rect',
                    style: {
                        stroke: '#000',
                        fill: '#fff',
                    },
                },
                defaultEdge: {
                    type: 'polyline',
                    color: '#6495ED',
                    style: {
                        endArrow: true,
                        radius: 10,
                    },
                    labelCfg: {
                        refY: 10,
                    }
                }
            });
            graph.data(data);
            graph.render();
    }, []);

    return (
       <div style={{ overflow: 'auto', position: 'relative' }} ref={ref as any}></div>
    );
};

export default AttributeChart;
