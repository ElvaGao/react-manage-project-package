import fetchMock from 'fetch-mock'
//格式： Mock.mock( url, post/get , 返回的数据)；
fetchMock.mock('/login', require('./apis/login'));