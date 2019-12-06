import { isFunc, isArray, isObj, copy, isUndefined, getLabelByOption } from './util'

let FIELDS_MAP = {}
let FORM_MAP = {}

class FieldGenerator {
  constructor () {
    this.readonly = false
    this.emptyText = '-'
    this.methods = []
  }
  /**
   * get form item tag name
   * @param {String} name
   * @returns {String} input -> el-input
   */
  getTag (name) {
    let field = 'div'
    let config = FIELDS_MAP[name]
    if (FIELDS_MAP[name]) {
      field = config.tagName
    }
    return field
  }
  /**
   * get form item render function
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Object} config field config
   * @returns {Function} render function
   */
  getRender (h, { field, form, config }) {
    let { readonly, context } = this
    if (config) {
      // is readonly
      if (readonly || field.readonly) {
        return this._getReadonly(h, { field, form, config, context })
      } else if (isFunc(config.render)) {
        return config.render.call(this, h, { field, form, readonly, context, config })
      }
    }
  }
  /**
   * get form item readonly mode render function
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Object} config field config
   * @returns {Function} readonly render function
   */
  _getReadonly (h, { field, form, config }) {
    let { emptyText, context } = this
    if (isFunc(config.renderReadonly)) {
      return config.renderReadonly.call(this, h, { field, form, emptyText, context, config })
    } else if (config.readonlyType === 'disabled') {
      let props = { disabled: true }
      if (isFunc(config.render)) {
        return config.render.call(this, h, { field, form, readonly: this.readonly, props, emptyText, context, config })
      } else {
        return h(this.getTag(field.type), this.getOptions(h, { field, form, props, context }))
      }
    } else {
      return h('div', { class: 'form-readonly-text' }, form[field.key] || emptyText)
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
    let config = FIELDS_MAP[field.type] || {}
    let defaultProps = config.defaultProps
    let defaultAttrs = config.defaultAttrs
    let totalProps = {
      ...defaultProps,
      ...field.props,
      ...props,
      value: form[field.key]
    }
    let placeholder = totalProps.placeholder || ''
    placeholder = placeholder.replace(/@title/g, field.title)
    totalProps.placeholder = placeholder
    let totalAttrs = {
      placeholder: totalProps.placeholder,
      maxlength: totalProps.maxlength,
      ...defaultAttrs,
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
            let label = getLabelByOption(value, field.options)
            field.onChange(value, { field, label, form })
          }
        }
      }
    }
  }
  /**
   * get form item default value
   * @param {String} key filed key
   * @param {Object} field filed
   * @returns {Any} field default value
   */
  getDefaultValue (key, field, valueKey = 'key') {
    if (!isUndefined(field.defaultValue)) {
      return field.defaultValue
    }
    let config = FIELDS_MAP[key]
    let defaultValue = null
    if (config) {
      if (isUndefined(config.defaultValue)) {
        return defaultValue
      } else if (isObj(config.defaultValue)) {
        return copy(config.defaultValue)
      } else {
        return config.defaultValue
      }
    } else {
      return defaultValue
    }
  }
  getConfigByFiledType (key) {
    return FIELDS_MAP[key]
  }
  /**
   * get form item default value
   * @param {String} key filed key
   * @returns {Any} field default value
   */
  renderField (h, { field, form }) {
    let context = this.context
    let render = this.getRender(h, { field, form, context, config: FIELDS_MAP[field.type] })
    if (render) {
      return render
    } else {
      return h(this.getTag(field.type), this.getOptions(h, { field, form, context }))
    }
  }
  /**
   * render form item
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @returns {Function} form item render function
   */
  renderFormItem (h, { field, form, showTitle }) {
    if (isArray(field)) {
      return this.renderFormItemByArray(h, { field, form, showTitle })
    }
    let context = this.context
    let config = FORM_MAP['form-item']
    if (isFunc(field.render)) {
      return field.render.call(this, h, { field, form, context, showTitle })
    }
    if (config && config.render) {
      return config.render.call(this, h, { field, form, context, showTitle })
    }
  }
  renderFormItemByArray (h, { field, form, showTitle }) {
    let rowConfig = FORM_MAP['row']
    let colConfig = FORM_MAP['col']
    let len = field.length
    if (!field.length) {
      return ''
    }
    let children = field.map(item => {
      return h(
        colConfig.tagName,
        { props: { span: item.span || rowConfig.grid / len } },
        [ this.renderFormItem(h, { field: item, form, showTitle }) ]
      )
    })
    let tag = h(rowConfig.tagName, children)
    return tag
  }
  /**
   * render form
   * @param {Function} h $createElement
   * @param {Object} field
   * @param {Object} form
   * @param {Array<Object:Field>} renderFields
   * @param {Boolean} readonly
   * @param {String} emptyText
   * @param {Object} context vue-json-form context
   * @returns {Function} form render function
   */
  renderForm (h, { fields, form, renderFields, readonly, emptyText, context }) {
    this.readonly = readonly
    this.emptyText = emptyText
    this.context = context
    let config = FORM_MAP['form']
    if (config && config.render) {
      return config.render.call(this, h, { fields, form, renderFields, context, config })
    }
  }
  /**
   * register field
   * @param {Object} options
   */
  registerField (options) {
    FIELDS_MAP[options.type] = options
  }
  /**
   * register form item
   * @param {Object} options
   */
  registerFormItem (options) {
    FORM_MAP['form-item'] = options
  }
  /**
   * register form
   * @param {Object} options
   */
  registerForm (options) {
    FORM_MAP['form'] = options
  }
  /**
   * register grid
   * @param {Object} options
   */
  registerGrid (options) {
    FORM_MAP[options.type] = options
  }
  /**
   * register method
   * @param {Object} options
   */
  registerMethod (options) {
    this.methods.push(options)
  }
  installMethods (context) {
    this.methods.forEach(config => {
      config.method({ context, config })
    })
    this.methods = []
  }
}

export default FieldGenerator
