import * as React from 'react';
import G6 from '@antv/g6';
import { useEffect, useState } from 'react';
import { Space, Image } from 'antd';
import PageTitle from '../../../components/title/PageTitle';
import LinkChartModal from './LinkChartModal';
import ListModal from './ListModal';
import { getFlowChartData } from '../../../service/flow';
import intl from '../../../components/intl/Index';


interface DataType {
    nodeList: {
        id: string;
        title: string;
        level: number;
        type: string;
        status: string;
        content: string;
    }[];
    edgeList: {
        srcNode: string;
        targetNode: string;
    }[];
}

interface GraphDataType {
    nodes: {
        id: string;
        name?: string;
        level?: number;
        content?: string;
    }[];
    edges: {
        source: string;
        target: string;
    }[];
}

const FlowPage: React.FC<any> = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState();
    const [chartVisible, setChartVisible] = useState<boolean>(false);

    const ref = React.useRef();

    let graph: any = null;

    function getNodeType(nodeType: string): string {
        switch (nodeType.trim()) {
            case 'sync':
                return 'collection';
            case 'proc':
                return 'procedure';
            case 'before':
                return 'pre-approval';
            default:
                return '';
        }
    }

    function getFillColor(status: string): string {
        switch (status) {
            case 'S':
                return '#67C23A';
            case 'E':
                return '#F56C6C';
            case 'R':
                return '#409EFF';
            case 'W':
                return '#909399';
            default:
                return '#909399';
        }
    }

    function getNodeData(relRow: any, maxLength: number) {
        const nodeData: any = [];
        let maxWidth = 0;
        for (let key of relRow.keys()) {
            const levelData = relRow.get(key);
            if (levelData && levelData.length === maxLength) {
                levelData.map((item: any) => {
                    let temp = 0;
                    for (let i = 0; i < item.title.length; i++) {
                        const code = item.title.charCodeAt(i);
                        if (
                            (code > 97 && code < 122) ||
                            (code > 65 && code < 90) ||
                            (code > 48 && code < 57)
                        ) {
                            temp += 8;
                        } else {
                            temp += 18;
                        }
                    }
                    maxWidth += (temp < 130 ? 130 : temp) + 20;
                });
            }
        }

        let marginHeight = 0;
        for (let key of relRow.keys()) {
            const levelData = relRow.get(key);
            let nodeX = 30;
            if (levelData) {
                const levelLength = levelData.length;
                const marginLeft = (maxLength - levelLength) * (maxWidth / (2 * maxLength));
                levelData.map((item: any) => {
                    const { id, title, content, status, type } = item;
                    const titleLength = title.length;
                    let temp = 0;
                    for (let i = 0; i < titleLength; i++) {
                        const code = item.title.charCodeAt(i);
                        if (
                            (code > 97 && code < 122) ||
                            (code > 65 && code < 90) ||
                            (code > 48 && code < 57)
                        ) {
                            temp += 8;
                        } else {
                            temp += 18;
                        }
                    }
                    const x = marginLeft + nodeX;
                    nodeX += (temp < 130 ? 130 : temp) + 20;
                    const y = 50 + marginHeight;
                    const color = getFillColor(status);
                    nodeData.push({
                        type: getNodeType(type),
                        x,
                        y,
                        nodeWidth: temp < 130 ? 130 : temp,
                        id,
                        name: title,
                        color,
                        upContent: content.split('进度')[0],
                        downContent: '进度' + content.split('进度')[1],
                    });
                });
            };
            marginHeight += 170;
        }
        return { nodeData, maxWidth };
    }

    function drawCanvas(data: DataType) {
        const relRow = new Map();
        const edgesData: any = [];
        let max_list_length = 0;
        data.nodeList.map(function (item) {
            let list = [];
            if (relRow.has(item.level)) {
                list = relRow.get(item.level);
            };
            list.push(item);
            relRow.set(item.level, list);
        });

        for (let key of relRow.keys()) {
            if (relRow.get(key).length > max_list_length) {
                max_list_length = relRow.get(key).length;
            }
        };

        const { nodeData, maxWidth } = getNodeData(relRow, max_list_length);
        data.edgeList.map(function (item) {
            const { srcNode, targetNode } = item;
            edgesData.push({
                source: srcNode,
                target: targetNode,
            });
        });
        const graphData: GraphDataType = {
            nodes: nodeData,
            edges: edgesData,
        };
        G6.registerNode('collection', (cfg: any) => {
            return `
      <group>
          <rect style={{
            width: ${cfg.nodeWidth},
            height: 40,
            fill: ${cfg.color},
            stroke: #aaa,
            cursor: 'move'，
            stroke: #000
          }} draggable="true">
            <text style={{ 
              marginLeft: ${cfg.nodeWidth / 2}, 
              marginTop:5,
              textBaseline: 'middle',
              textAlign: 'center', 
              fontWeight: 'bold', 
              fill: #000 }} draggable="true">{{name}}</text>
          </rect>
          <rect style={{
            width: ${cfg.nodeWidth},
            height: 60,
            stroke: #aaa,
            fill: #ffffff, 
          }} draggable="true">
          <text style={{ fill: '#333',marginTop:10, marginLeft: ${cfg.nodeWidth / 2
                } ,textAlign: 'center',textBaseline: 'middle',}} draggable="true">{{upContent}}</text>
          <text style={{ fill: '#333',marginTop:10, marginLeft: ${cfg.nodeWidth / 2
                } ,textAlign: 'center',textBaseline: 'middle', }} draggable="true">{{downContent}}</text>
          </rect>
      </group>`;
        });

        G6.registerNode(
            'procedure',
            {
                draw: (cfg: any, group: any) => {
                    const { color, name, upContent, downContent, nodeWidth } = cfg;
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [20, 0],
                                [nodeWidth, 0],
                                [nodeWidth, 15],
                                [0, 15],
                            ],
                            fill: color,
                            cursor: 'move',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [0, 15],
                                [nodeWidth, 15],
                                [nodeWidth, 40],
                                [0, 40],
                            ],
                            fill: color,
                            cursor: 'move',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [0, 40],
                                [nodeWidth, 40],
                                [nodeWidth, 100],
                                [0, 100],
                            ],
                            fill: '#fff',
                            cursor: 'move',
                            stroke: '#aaa',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('text', {
                        attrs: {
                            x: nodeWidth / 2,
                            y: 20,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: name,
                            fill: '#000',
                            fontSize: 12,
                            fontStyle: 'bold',
                        },
                        name: 'text-shape',
                        draggable: true,
                    });
                    group.addShape('text', {
                        attrs: {
                            x: nodeWidth / 2,
                            y: 70,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: `${upContent}\n${downContent}`,
                            fill: '#000',
                            fontSize: 12,
                        },
                        name: 'text-shape',
                        draggable: true,
                    });
                    return group;
                },
            },
            'single-node'
        );
        G6.registerNode(
            'pre-approval',
            {
                draw: (cfg: any, group: any) => {
                    const { color, name, upContent, downContent, nodeWidth } = cfg;
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [20, 0],
                                [nodeWidth - 20, 0],
                                [nodeWidth, 15],
                                [0, 15],
                            ],
                            fill: color,
                            cursor: 'move',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [0, 15],
                                [nodeWidth, 15],
                                [nodeWidth, 40],
                                [0, 40],
                            ],
                            fill: color,
                            cursor: 'move',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('polygon', {
                        attrs: {
                            points: [
                                [0, 40],
                                [nodeWidth, 40],
                                [nodeWidth, 100],
                                [0, 100],
                            ],
                            fill: '#fff',
                            cursor: 'move',
                            stroke: '#aaa',
                        },
                        name: 'polygon-shape',
                        draggable: true,
                    });
                    group.addShape('text', {
                        attrs: {
                            x: nodeWidth / 2,
                            y: 20,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: name,
                            fill: '#000',
                            fontSize: 12,
                            fontStyle: 'bold',
                        },
                        name: 'text-shape',
                        draggable: true,
                    });
                    group.addShape('text', {
                        attrs: {
                            x: nodeWidth / 2,
                            y: 70,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: `${upContent}\n${downContent}`,
                            fill: '#000',
                            fontSize: 12,
                        },
                        name: 'text-shape',
                        draggable: true,
                    });
                    return group;
                },
            },
            'single-node'
        );
        G6.registerEdge('dom-edge', {
            draw(cfg: any, group: any) {
                const startPoint = cfg.startPoint;
                const endPoint = cfg.endPoint;
                const dx = endPoint.x - startPoint.x;
                const dy = endPoint.y - startPoint.y;
                const qLine2 = [
                    endPoint.x + 10,
                    endPoint.y - 50 - (dy - 50) / 3,
                    endPoint.x,
                    endPoint.y - 50,
                ];
                const keyshape = group.addShape('path', {
                    attrs: {
                        stroke: '#666',
                        path:
                            Math.abs(dx) > 10
                                ? [
                                    ['M', startPoint.x, startPoint.y + 48],
                                    ['Q', ...qLine2],
                                ]
                                : [
                                    ['M', startPoint.x, startPoint.y + 48],
                                    ['L', endPoint.x, endPoint.y - 50],
                                ],
                        endArrow: true,
                    },
                });
                return keyshape;
            },
        });
        if (!graph && ref && ref.current) {
            const contextMenu = new G6.Menu({
                getContent() {
                    return `<ul style="margin:0px;padding:0px;border-radius:4px;background-color:#fff">
            <li style="padding:5px;margin:0px;width:100px;list-style:none;color:#1890ff;cursor:pointer;min-width:120px">查看节点相关链路图</li>
            <li style="padding:5px;margin:0px;width:100px;list-style:none;color:#1890ff;cursor:pointer;min-width:120px">查看节点作业列表</li>
          </ul>`;
                },
                handleMenuClick: (target: any, item: any) => {
                    const clickText = target.innerHTML.trim();
                    const { _cfg } = item;
                    const { id, name, upContent, downContent } = _cfg.model;
                    const message = upContent + downContent;
                    setContent({ id, name, message } as any);
                    if (clickText === '查看节点相关链路图') {
                        setChartVisible(true);
                    } else {
                        setVisible(true);
                    }
                },
                itemTypes: ['node'],
            });
            graph = new G6.Graph({
                groupByTypes: false,
                container: (ref as any).current,
                width: maxWidth + 50,
                height: relRow.size * 170 + 50,
                defaultEdge: {
                    type: 'dom-edge',
                },
                modes: {
                    default: ['drag-node'],
                },
                plugins: [contextMenu],
                linkCenter: true,
            });

            graph.data(graphData);
            graph.render();
            const edges = graph.getEdges();
            edges.forEach((node: any) => {
                node.toFront();
            });
            graph.paint();
        }
    };

    const pollingFn = () => {
        return (async () =>
        getFlowChartData()
            .then((data: any) => {
                drawCanvas(data);
            })
            .catch((err) => {
                console.error(err);
            })
       )();
    }

    useEffect(() => {
        let timer: any = "initTimer" ;
        if (timer && timer !== "initTimer") {
            clearInterval(timer);
            timer = null;
        } else if(timer === "initTimer"){
            pollingFn();
        };
        timer = setInterval(() => {
            pollingFn();
        }, 5*60*1000);

    }, []);

    const handleModalClose = () => {
        setVisible(false);
        setChartVisible(false);
    };

    return (
        <div style={{ overflow: 'auto', position: 'relative' }}>
            <PageTitle title={intl.get("operation_screen")} />
            <div id="legend">
                <Space>
                    <Image
                        width={650}
                        src={process.env.PUBLIC_URL + '/images/legend.png'}
                        title="status"
                        alt="status"
                    />
                </Space>
            </div>
            <div ref={ref as any}></div>
            {visible && (
                <ListModal
                    visible={visible}
                    content={content as any}
                    handleOk={handleModalClose}
                    handleCancel={handleModalClose}
                />
            )}
            {chartVisible && (
                <LinkChartModal
                    visible={chartVisible}
                    content={content as any}
                    handleOk={handleModalClose}
                    handleCancel={handleModalClose}
                />
            )}
        </div>
    );
};

export default FlowPage;
