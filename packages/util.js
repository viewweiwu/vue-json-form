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