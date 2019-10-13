import axios from 'axios'

const ajax = (url = '', params = {}, type = 'GET') => {
    let promise;

    return new Promise((resolve, reject) => {
        if (type.toLowerCase() === 'get') {
            promise = axios.get(url, {
                params: params,
            })
        } else if (type.toLowerCase() === 'post') {
            promise = axios.post(url, params)
        }

        //处理返回数据

        promise.then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error);
        })
    })
};

export default ajax;