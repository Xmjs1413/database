import { post } from '../utils/http';
import { BASEURL } from '../constants/AxiosPrefix';

export const getKnowledgeContent = (params?: object) => {
    return post(BASEURL+'/knowledge/factor_tree_table', params);
};
export const getKnowledgeSide = (params?: object) => {
    return post(BASEURL+'/knowledge/factor_tree_data', params);
};

