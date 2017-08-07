export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.className = `${el.className} ${className}`
}

export function hasClass(el, className) {
  if (' ' + el.className + ' '.indexOf(' ' + className + ' ') > 0) {
    return true
  }
  return false
}
