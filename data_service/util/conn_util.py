#from psycopg2.pool import SimpleConnectionPool
from cx_Oracle import SessionPool
import threading


class ConnUtil(object):
    _instance_lock = threading.Lock()
    def __init__(self, app):
        self.app = app
        try:
            #self.trinity_conn_pool = SimpleConnectionPool(3, 10, host = '168.8.66.61',user = 'dspreader', password = 'dspreader', dbname = 'trinity')
            self.dsp_conn_pool = SessionPool(self.app.config["DB_USER"], self.app.config["DB_PASS"], self.app.config["DB_URL"], min=3, max=10, increment=1, encoding="UTF-8")
            print('创建数据库连接池成功！')
        except Exception as e:
            print(e)
            print('连接数据库失败！')

    def __new__(cls, *args, **kwargs):
        if not hasattr(ConnUtil, "_instance"):
            with ConnUtil._instance_lock:
                if not hasattr(ConnUtil, "_instance"):
                    ConnUtil._instance = object.__new__(cls)
        return ConnUtil._instance

    def get_trinity_conn(self):
        try:
            return self.trinity_conn_pool.getconn()
        except Exception as e:
            print(e)
            print('无法连接Trinity数据库！')

    def put_trinity_conn(self, conn):
        self.trinity_conn_pool.putconn(conn)

    def get_dsp_conn(self):
        try:
            return self.dsp_conn_pool.acquire()
        except Exception as e:
            print(e)
            print('无法连接DSP数据库！')

    def put_dsp_conn(self, conn):
        self.dsp_conn_pool.release(conn)
