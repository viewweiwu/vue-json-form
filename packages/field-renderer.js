import FieldGenerator from './field-generator'
import { install } from './platform/element-ui/platform-element'
// import { install } from './platform/ant-design/platform-antd'
import { isUndefined, isArray } from './util'

const fg = new FieldGenerator()

install(fg)

export const installMethods = function (context) {
  fg.installMethods(context)
}

/**
 * init form default value
 * @param {Array} fields
 * @param {Object} form
 */
export const initDefaultValue = function ({ fields, form }) {
  fields.forEach(field => {
    if (isArray(field)) {
      initDefaultValue.call(this, { fields: field, form })
    } else if (!isUndefined(field.key) && isUndefined(form[field.key])) {
      this.$set(form, field.key, fg.getDefaultValue(field.type, field))
    } else if (field.type === 'group') {
      initDefaultValue.call(this, { fields: field.groupList || [], form })
    }
  })
}

/**
 * render form
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
export const renderForm = (h, { fields, form, context }) => {
  return fg.renderForm(h, { fields, form, renderFields, context })
}

/**
 * render fields
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
const renderFields = (h, { fields, form }) => {
  let children = []
  fields.forEach(field => {
    if (isArray(field)) {
      children.push(fg.renderFormItemByArray(h, { field, form }))
    } else if (field.type) {
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
