# _*_ coding: utf8 _*_

import sys
sys.path.append("..")

from flask import Flask, request
from data_service.util.data_util import DataUtil
from flask_cors import CORS
from threading import Timer
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_object('config.default')
app.config.from_envvar('APP_CONFIG_FILE')

if app.config["CUR_ENV"] == "PROD":
    os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.ZHS16GBK'

db = SQLAlchemy(app, use_native_unicode="utf-8")

CORS(app, supports_credentials=True)

data_util = DataUtil(app)

@app.route('/map', methods=['GET', 'POST'])
def data_map():
    return data_util.get_map_json()


@app.route('/job_list', methods=['GET'])
def group_job_list():
    group_id = request.args.get('group_id')
    return data_util.get_group_job_list_json(group_id)


@app.route('/sub_map', methods=['GET'])
def sub_map():
    group_id = request.args.get('group_id')
    return data_util.get_map_json(group_id)


@app.route('/job_dep_list', methods=['GET'])
def job_dep_list():
    return data_util.get_dep_job_list(request.args.get('job_name'))


def refresh():
    data_util.refresh_data()
    t = Timer(600, refresh)
    t.start()


if app.config['CUR_ENV'] == 'PROD':
    refresh()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
