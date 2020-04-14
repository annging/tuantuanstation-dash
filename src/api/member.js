import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/member/list',
    method: 'get',
    params: query
  })
}

export function fetchMember(id) {
  return request({
    url: '/api/member/detail',
    method: 'get',
    params: { id }
  })
}


export function updateMember(data) {
  return request({
    url: '/api/member/update',
    method: 'post',
    data
  })
}

export function fetchLevelList(query) {
  return request({
    url: '/api/member/level/list',
    method: 'get',
    params: query
  })
}