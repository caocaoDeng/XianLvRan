import request from '@/utils/request'

// 信息查询
export const queryProducts = (params: any) => {
  return request.post('/productList', params)
}

// 信息查询
export const createProducts = (params: any) => {
  return request.post('/createProduct', params)
}