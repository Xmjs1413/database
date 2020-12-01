# _*_ coding: utf8 _*_

import sys
sys.path.append("..")
from run import db


class ProjectStaticInfo(db.Model):
    __tablename__ = 'op_project_static_info'
    __table_args__ = {'schema': 'datastage'}
    project_id = db.Column(db.String(200), primary_key=True)
    title = db.Column(db.String(200))
    groups = db.relationship("ProjectGroupInfo", backref="project")


class ProjectGroupInfo(db.Model):
    __tablename__ = 'op_project_group_info'
    __table_args__ = {'schema': 'datastage'}
    project_id = db.Column(db.String(200), db.ForeignKey('datastage.op_project_static_info.project_id'), primary_key=True)
    group_id = db.Column(db.String(200), db.ForeignKey('datastage.op_group_static_info.group_id'), primary_key=True)
    group_static_info = db.relationship("GroupStaticInfo", backref="project_group_info")


class GroupStaticInfo(db.Model):
    __tablename__ = 'op_group_static_info'
    __table_args__ = {'schema': 'datastage'}
    group_id = db.Column(db.String(200), primary_key=True)
    title = db.Column(db.String(200))
    remark = db.Column(db.String(200))
    group_type = db.Column(db.String(20))
    operator_id = db.Column(db.String(10))
    status = db.Column(db.String(5))
    group_level = db.Column(db.INT)
    group_run_infos = db.relationship("GroupRunInfo", backref="group_static_info")


class GroupRunInfo(db.Model):
    __tablename__ = 'op_group_run_info'
    __table_args__ = {'schema': 'datastage'}
    group_id = db.Column(db.String(200), db.ForeignKey('datastage.op_group_static_info.group_id'), primary_key=True)
    period_id = db.Column(db.INT, primary_key=True)
    status = db.Column(db.String(5))
    job_total_num = db.Column(db.INT)
    success_job = db.Column(db.INT)
    run_job = db.Column(db.INT)
    fail_job = db.Column(db.INT)
    wait_job = db.Column(db.INT)
    start_time = db.Column(db.DATETIME)
    end_time = db.Column(db.DATETIME)
    expect_time = db.Column(db.INT)
    project_id = db.Column(db.String(200))

    def __repr__(self):
        return "<GroupRunInfo(group_id='%s', period_id='%s', status='%s', job_total_num='%s', success_job='%s', run_job='%s'" \
               ", fail_job='%s', wait_job='%s', start_time='%s', end_time='%s', expect_time='%s')>" % (
            self.group_id, self.period_id, self.status, self.job_total_num, self.success_job, self.run_job, self.fail_job,
        self.wait_job, self.start_time, self.end_time, self.expect_time)


class ProjectGroupDependInfo(db.Model):
    __tablename__ = 'op_project_group_depend_info'
    __table_args__ = {'schema': 'datastage'}
    project_id = db.Column(db.String(200), primary_key=True)
    group_id = db.Column(db.String(200), db.ForeignKey('datastage.op_group_static_info.group_id'), primary_key=True)
    p_group_id = db.Column(db.String(200), db.ForeignKey('datastage.op_group_static_info.group_id'), primary_key=True)

    group = db.relationship("GroupStaticInfo", backref="parent_group_depends", foreign_keys=[group_id])
    parent_group = db.relationship("GroupStaticInfo", backref="child_group_depends", foreign_keys=[p_group_id])


if __name__ == '__main__':
    p = ProjectStaticInfo.query.filter_by(project_id=9).one()
    print(p)