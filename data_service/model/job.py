class Job:

    def __init__(self, id, dsp_id, group_id, status='', starttime='', endtime=''):
        self.id = id
        self.dsp_id = dsp_id
        self.group_id = group_id
        self.status = status
        self.starttime = starttime
        self.endtime = endtime
