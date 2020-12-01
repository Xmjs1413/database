# _*_ coding:utf8 _*_
# gunicorn_config.py
import gevent.monkey
gevent.monkey.patch_all()

import multiprocessing

# debug = True
loglevel = 'debug'
bind = "0.0.0.0:5000"
pidfile = "log/gunicorn.pid"
accesslog = "log/access.log"
errorlog = "log/debug.log"
daemon = True

# 启动的进程数
workers = int(multiprocessing.cpu_count()/2)+1
worker_class = 'gevent'
x_forwarded_for_header = 'X-FORWARDED-FOR'