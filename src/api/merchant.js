import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/merchant/list',
    method: 'get',
    params: query
  })
}

export function fetchMerchantRzList(query) {
  return request({
    url: '/api/merchantrz/list',
    method: 'get',
    params: query
  })
}

export function fetchMerchant(id) {
  return request({
    url: '/api/merchant/detail',
    method: 'get',
    params: { id }
  })
}
