import TagGenerator from './tag-generator'
import { install } from './platform-element'
import { isUndefined } from './util'

const tg = new TagGenerator()

install(tg)

/**
 * init form default value
 * @param {Array} fields
 * @param {Object} form
 */
export const initDefaultValue = function ({ fields, form }) {
  fields.forEach(field => {
    if (isUndefined(form[field.key])) {
      this.$set(form, field.key, tg.getDefaultValue(field.type))
    }
  })
}

/**
 * render form
 * @param {Function} h
 * @param {Array} fields
 * @param {Object} form
 */
export const renderForm = (h, { fields, form }) => {
  let options = {
    class: 'vue-json-form'
  }
  let children = renderFields(h, { fields, form })
  return h(tg.getTag('form'), options, children)
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
  let tag = ''
  let type = field.type
  let options = {
    props: {
      label: field.title,
      prop: field.key
    }
  }
  tag = tg.renderTag(h, { field, form} )
  return h(tg.getTag('form-item'), options, [ tag ])
}
