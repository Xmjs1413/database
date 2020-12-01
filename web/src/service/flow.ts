import { get } from '../utils/http';
import { BASEURL } from '../constants/AxiosPrefix';

export const getFlowChartData = (params?: object) => {
    return get(BASEURL+'/map', params);
};

export const getFlowLinkChartData = (params?:object) => {
    return get(BASEURL+'/sub_map',params);
}

export const getDependList = (params:object)=>{
    return get(BASEURL+'/job_list',params); 
}

export const getSubDependList = (params:object) => {
    return get(BASEURL+'/job_dep_list',params);     
}