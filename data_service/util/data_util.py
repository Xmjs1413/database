# _*_ coding: utf8 _*_

import sys
sys.path.append("..")

from model.node import Node
import json
import datetime
import re
from util.conn_util import ConnUtil


class DataUtil:

    def __init__(self, app):
        self.conn_util = ConnUtil(app)
        self.app = app

    def get_period_id(self):
        if self.app.config['CUR_ENV'] == 'PROD':
            conn = self.conn_util.get_dsp_conn()
            with conn.cursor() as cur:
                records = cur.execute('''SELECT datastage.fn_get_exchdate(to_number(to_char(sysdate,'yyyymmdd')),
                            case when  TO_NUMBER(to_char(sysdate, 'hh24')) BETWEEN 0 and 15 then -1 else 0 end) from dual''')
                period_id = records.fetchone()[0]
            self.conn_util.put_dsp_conn(conn)
            return period_id
        else:
            return 20201103

    def refresh_data(self):
        print('TimeNow:%s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        conn = self.conn_util.get_dsp_conn()
        with conn.cursor() as cur:
            cur.execute('''select datastage.proc_op_run_info({0}) FROM dual'''.format(self.get_period_id()))
        self.conn_util.put_dsp_conn(conn)

    def get_down_nodes(self, node):
        l = []
        for i in node.child_nodes:
            l.append(i)
            l.extend(self.get_down_nodes(i))
        return list(set(l))

    def get_up_nodes(self, node):
        l = []
        for i in node.parent_nodes:
            l.append(i)
            l.extend(self.get_up_nodes(i))
        return l

    def get_map_json(self, group_id=''):

        period_id = self.get_period_id()
        conn = self.conn_util.get_dsp_conn()
        cur = conn.cursor()
        records = cur.execute('''SELECT a.GROUP_ID, b.TITLE, a.PERIOD_ID, a.STATUS,
                        '开始：'||to_char(START_TIME, 'mmdd HH24:MI')||'\n进度：'||CAST(SUCCESS_JOB AS varchar(10))||'/'||cast(JOB_TOTAL_NUM AS varchar(10))
        AS progress, case when b.group_type='批前作业' then 'before' when b.group_type='程序作业' then 'proc' when b.group_type='同步作业' then 'sync' else '' end as group_type
        FROM DATASTAGE.OP_PROJECT_GROUP_INFO  c
        left join DATASTAGE.OP_GROUP_RUN_INFO a on a.group_id = c.group_id
        LEFT JOIN DATASTAGE.OP_GROUP_STATIC_INFO b ON a.GROUP_ID = b.GROUP_ID
        WHERE PERIOD_ID = {0}'''.format(period_id))

        node_list = []

        node_map = {}

        for node in records.fetchall():
            node1 = Node(node[0], node[1], node[3], node[4], node[5])
            node_list.append(node1)
            node_map[node1.id] = node1

        edge_list = []
        records = cur.execute('''
            SELECT a.GROUP_ID, a.P_GROUP_ID FROM 
            DATASTAGE.OP_PROJECT_GROUP_DEPEND_INFO a 
            inner join DATASTAGE.OP_PROJECT_GROUP_INFO c on a.group_id = c.group_id
            inner join DATASTAGE.OP_PROJECT_GROUP_INFO d on a.p_group_id = d.group_id
        ''')

        for edge in records.fetchall():
            if edge[0] not in node_map or edge[1] not in node_map:
                continue
            if edge[0] == edge[1] :
                print('循环依赖：'+edge[0] + '<-' + edge[1])
                continue
            if not node_map[edge[0]].is_child_of(node_map[edge[1]]):
                edge_list.append( {"srcNode": edge[1], "targetNode": edge[0]})
            node_map[edge[1]].child_nodes.append(node_map[edge[0]])
            node_map[edge[0]].parent_nodes.append(node_map[edge[1]])

        #print(edge_list)

        root_nodes = [ n for n in node_list if len(n.parent_nodes)==0 ]

        for n in root_nodes:
            n.level = 1

        def set_node_level(node):
            for child in node.child_nodes:
                if child.level == -1 or node.level + 1 > child.level:
                    child.level = node.level + 1
            #set_node_level(child)
            for child in node.child_nodes:
                 set_node_level(child)
            # if node.id == '289':
            #     print(node.level)

        for n in root_nodes:
            set_node_level(n)

        node_list.sort(key=lambda a: a.level)

        #for n in node_list:
        #    print(n.id, n.title, n.level, n.status, n.content)
        filter_node_list = []
        if group_id != '':
            cur_node = node_map[group_id]
            if cur_node:
                filter_node_list.append(cur_node)
                filter_node_list.extend(self.get_down_nodes(cur_node))
                filter_node_list.extend(self.get_up_nodes(cur_node))

        json_map = {"nodeList": [n.__dict__() for n in node_list], "edgeList": edge_list}
        if len(filter_node_list) > 0:
            json_map = {"nodeList": [n.__dict__() for n in node_list if n in filter_node_list],
                        "edgeList": [e for e in edge_list if node_map[e['srcNode']] in filter_node_list and node_map[e['targetNode']] in filter_node_list]
                        }
        cur.close()
        self.conn_util.put_dsp_conn(conn)
        return json.dumps(json_map)

    def get_group_job_list_json(self, group_id):
        if not re.match('^[0-9]+$', group_id) :
            return json.dumps([])
        period_id = self.get_period_id()
        conn = self.conn_util.get_dsp_conn()
        with conn.cursor() as cur:
            records = cur.execute(''' SELECT b.SRC_JOB_ORDER_ID, b.JOB_EN_NAME, b.JOB_SRC_DB_NAME, b.JOB_SRC_DB_IP, b.JOB_TAR_DB_NAME, b.JOB_TAR_DB_IP,
        b.JOB_TYPE_ID,
        c.PERIOD_ID, c.JOB_STATUS, to_char(c.START_TIME, 'yyyymmdd HH24:MI') as START_TIME, to_char(c.END_TIME, 'yyyymmdd HH24:MI') as END_TIME
        FROM DATASTAGE.OP_GROUP_JOB_INFO a 
        LEFT JOIN DATASTAGE.OP_JOB_STATIC_INFO b ON a.JOB_ID = b.JOB_ID
        LEFT JOIN DATASTAGE.OP_JOB_RUN_INFO c ON b.SRC_JOB_ID = c.SRC_JOB_ID
        WHERE PERIOD_ID = {2} and a.GROUP_ID in 
                        (SELECT a.child_group_id FROM DATASTAGE.op_group_group_info a 
        WHERE a.group_id = to_char({0})
        UNION ALL 
        SELECT '{1}' FROM dual)'''.format(group_id, group_id, period_id))

            j = json.dumps([ {
                "SRC_JOB_ORDER_ID": r[0],
                "JOB_EN_NAME": r[1],
                "JOB_SRC_DB_NAME": r[2],
                "JOB_SRC_DB_IP": r[3],
                "JOB_TAR_DB_NAME": r[4],
                "JOB_TAR_DB_IP": r[5],
                "JOB_TYPE_ID": r[6],
                "PERIOD_ID": r[7],
                "JOB_STATUS": r[8],
                "START_TIME": r[9],
                "END_TIME": r[10]
            } for r in records.fetchall()])
        self.conn_util.put_dsp_conn(conn)
        return j

    def get_dep_job_list(self, job_name):
        if job_name == 'NaN':
            return json.dumps([])

        period_id = self.get_period_id()
        conn = self.conn_util.get_dsp_conn()
        with conn.cursor() as cur:
            records = cur.execute('''SELECT T.dep_job_en_name,
               CASE WHEN T.job_type_cd='11' THEN 0
                    WHEN T.job_type_cd='15' THEN 1 
                    WHEN T.job_type_cd='73' THEN 2
               ELSE 1 END AS job_type_id,
           T.order_id, T1.db_en_name, T2.db_en_name,
            CASE WHEN REPLACE(T3.TXDATE, '-', '') = '{1}' THEN T3.TASKSTATUS
                            ELSE null END AS taskstatus,
           CASE WHEN REPLACE(T3.TXDATE, '-', '') = '{2}' THEN REPLACE(T3.TXDATE, '-', '')
                            ELSE null END AS txdate,
           CASE WHEN REPLACE(T3.TXDATE, '-', '')  = '{3}' THEN to_char(to_date(T3.STARTDATE||lpad(T3.STARTTIME,6,'0'), 'yyyymmddHH24MIss'), 'yyyymmdd HH24:MI') ELSE null end AS starttime, 
           CASE WHEN REPLACE(T3.TXDATE, '-', '')  = '{4}' THEN to_char(to_date(T3.ENDDATE || lpad(T3.ENDTIME, 6, '0'), 'yyyymmddHH24MIss'), 'yyyymmdd HH24:MI') ELSE null END AS endtime
        FROM (
        select  DISTINCT dep_job_en_name, SRC_CONNECTION_ID, tar_CONNECTION_ID, job_id, JOB_TYPE_CD,ORDER_ID
        from (SELECT T1.JOB_EN_NAME, T2.JOB_EN_NAME AS dep_job_en_name
        ,T2.SRC_CONNECTION_ID, T2.tar_CONNECTION_ID, T2.JOB_ID, T2.JOB_TYPE_CD, T2.ORDER_ID
        FROM 
        DSP.SERVICE_JOB_DEPENDENCY_RELA T  
        inner JOIN DSP.SERVICE_JOB_INFO T1 on T1.job_id = T.job_id
        inner join DSP.SERVICE_JOB_INFO T2  on T.dep_job_id = T2.job_id
        WHERE T1.IS_ACTIVE =1 AND T2.IS_ACTIVE=1) T
        start with T.JOB_EN_NAME = '{0}'
        connect by (prior dep_JOB_EN_NAME) = job_en_name
        ) T 
        LEFT JOIN dsp.META_DATABASE_INFO T1 ON T.SRC_CONNECTION_ID = T1.db_id
        LEFT JOIN dsp.META_DATABASE_INFO T2 ON T.tar_CONNECTION_ID = T2.db_id
        LEFT JOIN dsp.TRI_TASK T3 ON T.job_id = T3.JOBANDFLOWUID'''.format(job_name, period_id, period_id, period_id, period_id))

            j = json.dumps([ {
                "SRC_JOB_ORDER_ID": r[2],
                "JOB_EN_NAME": r[0],
                "JOB_SRC_DB_NAME": r[3],
                "JOB_TAR_DB_NAME": r[4],
                "JOB_TYPE_ID": r[1],
                "PERIOD_ID": r[6],
                "JOB_STATUS": r[5],
                "START_TIME": r[7],
                "END_TIME": r[8]
            } for r in records.fetchall()])
        self.conn_util.put_dsp_conn(conn)
        return j
