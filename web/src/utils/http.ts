import axios from 'axios';

const instance = axios.create({
    timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        /*  if(response.status>=200 && response.status<300){
        return response;
    }else if(response.status>300 && response.status<400){
        return {}
    };
    */
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export const get = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .get(url, {params})
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err, 'error');
                reject(err);
            });
    });
};

export const post = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, {data})
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const del = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .delete(url, {params})
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err, 'error');
                reject(err);
            });
    });
};

export const put = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .put(url, {data})
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
