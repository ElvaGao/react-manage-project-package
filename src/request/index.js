/* 
 request([url],[config])
    + method:'GET' 请求方式
    + credentials:'include' 在CORS跨域中是否允许携带资源凭证 same-origin, *omit
    + cache:'no-cache' 是否设置缓存 default, reload, force-cache, only-if-cached
    + headers:{} 自定义请求头信息
    + body:null 设置请求主体信息,我们一般传递一个对象
    + params:null 基于URL问号传递的参数值
    + responseType:'json' 预设服务器返回的数据格式 text, arraybuffer, blob
 */
    import { isPlainObject } from './../utils/index';
    import qs from 'qs';
    
    let baseURL = '';
    /* let env = process.env.NODE_ENV || "development";
    switch (env) {
        case 'development':
            baseURL = 'http://127.0.0.1:9999';
            break;
        case 'test':
            baseURL = 'http://168.12.1.1:8080';
            break;
        case 'production':
            baseURL = 'http://api.zhufeng.cn';
            break;
    } */
    let defaultConfig = {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache',
            headers: {},
            body: null,
            params: null,
            responseType: 'json',
        }
    export function request(url, config) {
        // init params
        if (typeof url !== "string") throw new TypeError('url is not a string');
        if (!isPlainObject(config)) config = {};
        let {
            // method,
            // credentials,
            // cache,
            headers,
            data,
            // body,
            params,
            responseType
        } = {...defaultConfig, ...config};
        if (!isPlainObject(headers)) headers = {};
    
        // 处理URL：拼接baseURL & 问号传参
        if (!/http(s?):\/\//i.test(url)) url = baseURL + url;
        if (params) {
            if (isPlainObject(params)) params = qs.stringify(params);
            url += `${url.includes('?')?'&':'?'}${params}`;
        }
    
        // 处理请求主体信息「根据自己的后台要求处理」
        // if (isPlainObject(body)) body = qs.stringify(body);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if (data) {
            // 根据请求主体的数据格式，设置不同的Content-Type
            // if (body instanceof FormData) headers['Content-Type'] = 'multipart/form-data';
            headers['Content-Type'] = 'multipart/form-data';
        }
    
        // 类似于请求拦截器
        let token = sessionStorage.getItem('token');
        if (token) headers['Authorzation'] = token;
    
        // 基于FETCH发送请求
        config = {...config,headers}
        // {
            // method: method,
            // credentials,
            // cache,
            // headers
        // };
        // if (/^(POST|PUT|PATCH)$/i.test(method.toUpperCase) && body) config.body = body;
        // console.log(url, config)
        return fetch(url, config)
            .then(response => {
                // console.log(response)
                let {
                    status,
                    statusText
                } = response;
                if (status >= 200 && status < 400) {
                    let result;
                    switch (responseType.toUpperCase()) {
                        case 'JSON':
                            return response.json();
                        case 'TEXT':
                            return response.text();
                        case 'ARRAYBUFFER':
                            return response.arrayBuffer();
                        case 'BLOB':
                            return response.blob();
                        default:;
                    }
                    
                    // 输出转换失败原因
                    return result.then(null, reason => {
                        return Promise.reject({
                            code: 'format error',
                            reason
                        });
                    });
                }
                return Promise.reject({
                    code: "status error",
                    status,
                    statusText,
                });
            }).catch(reason => {
                // 失败统一处理
                if (reason && reason.code) {
                    if (reason.code === 'format error') {
                        console.log(`小主，服务器返回的数据格式化失败~~`);
                    }
                    if (reason.code === 'status error') {
                        switch (reason.status) {
                            case 403:
                                console.log(`小主，服务器拒绝了您的请求~~`);
                                break;
                            case 404:
                                console.log(`小主，您请求的地址是错误的~~`);
                                break;
                            case 500:
                                console.log(`小主，服务器开小差了，您稍后再试~~`);
                                break;
                            default:;
                        }
                    }
                } else {
                    console.log(`小主，当前网络繁忙，请稍后再试~~`);
                }
                return Promise.reject(reason);
            });
    };
    