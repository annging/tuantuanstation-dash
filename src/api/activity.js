import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/activity/list',
    method: 'get',
    params: query
  })
}

export function fetchActivity(id) {
  return request({
    url: '/api/activity',
    method: 'get',
    params: { id }
  })
}


export function updateActivity(data) {
  return request({
    url: '/api/activity/update',
    method: 'post',
    data
  })
}

export function fetchActivtyFenxiao(id) {
  return request({
    url: '/api/activity/detail/fenxiao',
    method: 'get',
    params: { id }
  })
}

