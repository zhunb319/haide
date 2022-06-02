import request from '@/utils/request'

export function fetchSvg(query) {
  return request({
    url: '/api-svg/EFI-600-016-00.svg',
    method: 'get',
    params: query
  })
}