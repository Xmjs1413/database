import { get } from '../utils/http';

export const getCapacityData = (params?:object) => {
    return get('/operation/bkinflux/',params);
}

export const getTableVisitData = (params:object) => {
    return get('/operation/privilege/dbtables/',params)
}

export const getUserLimitData = (params:object) => {
    return get('/operation/privilege/users/',params)
}