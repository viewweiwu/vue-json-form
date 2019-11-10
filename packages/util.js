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
