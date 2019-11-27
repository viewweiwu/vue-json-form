import { isFunc,  isObj, copy, isUndefined } from './util'

let FIELDS_MAP = {}
let FORM_MAP = {}

class FieldGenerator {
  constructor () {
    this.readonly = false
    this.emptyText = '-'
  }
  /**
   * get form item tag name
   * @param {String} name
   * @returns {String} input -> el-input
   */
  getTag (name) {
    let field = 'div'
    let target = FIELDS_MAP[name]
    if (FIELDS_MAP[name]) {
      field = target.tagName
    }
    return field
  }
  /**
   * get form item render function
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Object} target field config
   * @returns {Function} render function
   */
  getRender (h, { field, form, target }) {
    let { readonly } = this
    if (target) {
      // is readonly
      if (readonly) {
        return this._getReadonly(h, { field, form, target })
      } else if (isFunc(target.render)) {
        return target.render.call(this, h, { field, form, readonly })
      }
    }
  }
  /**
   * get form item readonly mode render function
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Object} target field config
   * @returns {Function} readonly render function
   */
  _getReadonly (h, { field, form, target }) {
    let { emptyText } = this
    if (isFunc(target.renderReadonly)) {
      return target.renderReadonly.call(this, h, { field, form, emptyText })
    } else if (target.readonlyType === 'disabled') {
      let props = { disabled: true }
      if (isFunc(target.render)) {
        return target.render.call(this, h, { field, form, readonly: this.readonly, props, emptyText })
      } else {
        return h(this.getTag(field.type), this.getOptions(h, { field, form, props }))
      }
    } else {
      return h('div', { class: 'form-readonly-text' }, form[field.key] || emptyText )
    }
  }
  /**
   * get form item render function
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Object} props field props
   * @returns {Object} render function options object
   */
  getOptions (h, { field, form, props }) {
    let defaultProps = FIELDS_MAP[field.type].defaultProps
    let totalProps = {
      ...defaultProps,
      value: form[field.key],
      ...field.props,
      ...props
    }
    let placeholder = totalProps.placeholder || ''
    placeholder = placeholder.replace(/@title/g, field.title)
    totalProps.placeholder = placeholder
    let totalAttrs = {
      placeholder: totalProps.placeholder,
      ...field.attrs
    }
    return {
      key: form.key,
      props: totalProps,
      attrs: totalAttrs,
      on: {
        input (value) {
          form[field.key] = value
          if (isFunc(field.onChange)) {
            field.onChange(value, { field, form })
          }
        }
      }
    }
  }
  /**
   * get form item default value
   * @param {String} key filed key
   * @returns {Any} field default value
   */
  getDefaultValue (key) {
    let target = FIELDS_MAP[key]
    let defaultValue = null
    if (target) {
      if (isUndefined(target.defaultValue)) {
        return defaultValue
      } else if (isObj(target.defaultValue)) {
        return copy(target.defaultValue)
      } else {
        return target.defaultValue
      }
    } else {
      return defaultValue
    }
  }
  /**
   * get form item default value
   * @param {String} key filed key
   * @returns {Any} field default value
   */
  renderField (h, { field, form }) {
    let render = this.getRender(h, { field, form, target: FIELDS_MAP[field.type] })
    if (render) {
      return render
    } else {
      return h(this.getTag(field.type), this.getOptions(h, { field, form }))
    }
  }
  /**
   * render form item
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @returns {Function} form item render function
   */
  renderFormItem (h, { field, form }) {
    let target = FORM_MAP['form-item']
    if (target && target.render) {
      return target.render.call(this, h, { field, form })
    }
  }
  /**
   * render form
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Array<Object:Field>} renderFields
   * @param {Boolean} readonly
   * @param {String} emptyText
   * @returns {Function} form render function
   */
  renderForm (h, { fields, form, renderFields, readonly, emptyText }) {
    this.readonly = readonly
    this.emptyText = emptyText
    let target = FORM_MAP['form']
    if (target && target.render) {
      return target.render.call(this, h, { fields, form, renderFields })
    }
  }
  /**
   * register field
   * @param {Object} options
   * @returns {Object} options
   */
  registerField (options) {
    return FIELDS_MAP[options.type] = options
  }
  /**
   * register form item
   * @param {Object} options
   * @returns {Object} options
   */
  registerFormItem (options) {
    return FORM_MAP['form-item'] = options
  }
  /**
   * register form
   * @param {Object} options
   * @returns {Object} options
   */
  registerForm (options) {
    return FORM_MAP['form'] = options
  }
}

export default FieldGenerator
