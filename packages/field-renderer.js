import FieldGenerator from './field-generator'
import { install } from './platform-element'
import { isUndefined } from './util'

const fg = new FieldGenerator()

install(fg)

/**
 * init form default value
 * @param {Array} fields
 * @param {Object} form
 */
export const initDefaultValue = function ({ fields, form }) {
  fields.forEach(field => {
    if (isUndefined(form[field.key])) {
      this.$set(form, field.key, fg.getDefaultValue(field.type))
    }
  })
}

/**
 * render form
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
export const renderForm = (h, { fields, form, readonly, emptyText }) => {
  return fg.renderForm(h, { fields, form, renderFields, readonly, emptyText })
}

/**
 * render fields
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
const renderFields= (h, { fields, form }) => {
  let children = []
  fields.forEach(field => {
    if (field.type) {
      children.push(renderFormItem(h, { field, form }))
    }
  })
  return children
}

/**
 * render form-item
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
const renderFormItem = (h, { field, form }) => {
  return fg.renderFormItem(h, { field, form })
}