import request from '@/utils/request'

export function getStar(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function fetchArticle(pv) {
  return request({
    url: '/user/logout',
    method: 'GET',
    params: { pv }
  })
}
