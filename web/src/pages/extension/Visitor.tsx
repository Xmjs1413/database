import React from 'react';
import { Row, Col, Card } from 'antd';

const Visitor = () => {
    return (
        <>
            <Row gutter={16}>
                <Col md={24}>
                    <Card
                        title="访客模式"
                        bordered={false}
                        bodyStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 500,
                        }}
                    >
                        访客模式的页面，你不需要登录即可访问的页面
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Visitor;
