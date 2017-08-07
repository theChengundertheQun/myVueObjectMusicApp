export default function (obj) {
  var defaults = {
    url: '#',
    type: 'get',
    async: true,
    data: {},
    dataType: 'text',
    success: function (data) {
      console.log(data)
    }
  }
  for (let key in obj) {
    defaults[key] = obj[key]
  }
  var xhr = new XMLHttpRequest()
  var param = ''
  for (let key in defaults.data) {
    param += `${key}=${defaults.data[key]}&`
  }
  if (param) {
    param = param.substring(0, param.length - 1)
  }
  if (defaults.type === 'get') {
    defaults.url += (defaults.url.indexOf('?') > 0 ? '&' : '?') + param
  }
  xhr.open(defaults.type, defaults.rul, defaults.async)
  var data = null
  if (defaults.type === 'post') {
    data = param
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  }
  xhr.send(data)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText)
        var data = (defaults.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText)
        defaults.success(data)
      }
    }
  }
}
