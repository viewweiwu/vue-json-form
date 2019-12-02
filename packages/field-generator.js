import { isFunc, isArray, isObj, copy, isUndefined, getLabelByOption } from './util'

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
    let { readonly, context } = this
    if (target) {
      // is readonly
      if (readonly || field.readonly) {
        return this._getReadonly(h, { field, form, target, context })
      } else if (isFunc(target.render)) {
        return target.render.call(this, h, { field, form, readonly, context })
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
    let { emptyText, context } = this
    if (isFunc(target.renderReadonly)) {
      return target.renderReadonly.call(this, h, { field, form, emptyText, context })
    } else if (target.readonlyType === 'disabled') {
      let props = { disabled: true }
      if (isFunc(target.render)) {
        return target.render.call(this, h, { field, form, readonly: this.readonly, props, emptyText, context })
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
    let config = FIELDS_MAP[field.type]
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
  getDefaultValue (key, field) {
    if (!isUndefined(field.defaultValue)) {
      return field.defaultValue
    }
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
    let render = this.getRender(h, { field, form, context, target: FIELDS_MAP[field.type] })
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
  renderFormItem (h, { field, form }) {
    if (isArray(field)) {
      return this.renderFormItemByArray(h, { field, form })
    }
    let context = this.context
    let target = FORM_MAP['form-item']
    if (target && target.render) {
      return target.render.call(this, h, { field, form, context })
    }
  }
  renderFormItemByArray (h, { field, form }) {
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
        [ this.renderFormItem(h, { field: item, form }) ]
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
    let target = FORM_MAP['form']
    if (target && target.render) {
      return target.render.call(this, h, { fields, form, renderFields, context })
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
}

export default FieldGenerator
