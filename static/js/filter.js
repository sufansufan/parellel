/**
 * 将姓别显示成汉字
 * @param value
 * @returns {*}
 */
export const sexShow = value => {
  if (value === true) {
    return '男'
  } else if (value === false) {
    return '女'
  } else {
    return ' '
  }
}
/* let priceFix = value => value.toFixed(2); */

export const timeFix = (num, fn, spacer) => {
  let time = num
  if (!isNaN(+num)) {
    time = fn(new Date(num).getTime(), 'ymd')
    time = spacer ? time.replace(/\-/g, spacer) : time
  }
  return time
}
