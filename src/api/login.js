import { request } from "./../request"

export const login = data => {
    return request('/login',{
        method: 'POST',
        data
    });
};