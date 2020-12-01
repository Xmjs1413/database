import * as React from 'react';
import { Button } from 'antd';
import PageTitle from '../../components/title';
import SemanticQuotaPage from './SemanticQuotaPage';
import SemanticAttributePage from './SemanticAttributePage';
import styles from './SemanticIndicatorContent.module.less';

interface ContentProps {
    title: string;
    type: string | null;
}

const SemanticIndicatorContent: React.FC<ContentProps> = (props) => {
    return (
        <div>
            {props.type ? (
                <SemanticAttributePage name={props.title} type={props.type} />
            ) : (
                <div>
                    <div className={styles.container}>
                        <PageTitle
                            title={props.title}
                            styles={{ paddingBottom: '0px', paddingTop: '0px' }}
                        />
                        <Button type="primary" className={styles.middle} size="small">
                            已启用
                        </Button>
                        <Button size="small">收藏</Button>
                    </div>
                    <SemanticQuotaPage />
                </div>
            )}
        </div>
    );
};

export default SemanticIndicatorContent;
