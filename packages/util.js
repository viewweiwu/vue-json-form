import dayjs from 'dayjs'

/**
 * is Object
 * @param {Object} obj 
 */
export const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * is Function
 * @param {Function} func 
 */
export const isFunc = (func) => {
  return typeof func === 'function'
}

/**
 * is undefiend
 * @param {undefined} value 
 */
export const isUndefined = (value) => {
  return typeof value === 'undefined'
}

/**
 * copy data
 * @param {Object} data 
 */
export const copy = (data) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * format date
 * @param {Date} value 
 * @param {String} format 
 */
export const formatDate = (value, format = 'YYYY-MM-DD') => {
  if (value) {
      let date = new Date(value)
      return dayjs(date).format(format)
  } else {
    return ''
  }
}

/**
 * format date
 * @param {Date} value 
 * @param {String} format 
 */
export const formatTime = (value, format = 'HH:mm:ss') => {
  return formatDate(value, format)
}

/**
 * format date
 * @param {Date} value 
 * @param {String} format 
 */
export const formatDateTime = (value, format = 'YYYY-MM-DD HH:mm') => {
  return formatDate(value, format)
}

/**
 * format date
 * @param {Date} value 
 * @param {String} format 
 */
export const formatFullDateTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return formatDate(value, format)
}

/**
 * format daterange text
 * @param {Array} date
 * @param {Function} formatter
 * @param {String} emptyText
 */
export const formatDateRangeText = (date = [], formatter, emptyText) => {
  if (!date[0]) {
    return emptyText
  } else {
    return formatter(date[0]) + ' ~ ' + formatter(date[1])
  }
}