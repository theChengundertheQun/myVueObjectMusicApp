import originJSONP from 'jsonp'

export default function (url, data, option) {
  return new Promise((resolve, reject) => {
    url += (url.indexOf('?') > 0 ? '&' : '?') + param(data)
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let params = ''
  for (let key in data) {
    let value = data[key] === undefined ? '' : data[key]
    params += `${key}=${encodeURIComponent(value)}&`
  }
  return params ? params.substring(0, params.length - 1) : ''
}
