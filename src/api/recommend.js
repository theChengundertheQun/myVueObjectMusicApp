import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'

  let rnd = (Math.random() + '').substring(2)
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: rnd,
    callback: 'GetRecomListCallback' + rnd,
    tpl: 'v12',
    page: 'other',
    notice: 0
  })
  let discOptions = options
  discOptions.prefix = 'GetRecomListCallback'
  discOptions.name = 'GetRecomListCallback' + rnd
  return jsonp(url, data, discOptions)
}
