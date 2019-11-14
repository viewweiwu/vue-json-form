import { isFunc,  isObj, copy, isUndefined } from './util'

let FIELDS_MAP = {}
let FORM_MAP = {}

class FieldGenerator {
  constructor () {
    this.readonly = false
    this.emptyText = '-'
  }
  getTag (name) {
    let field = 'div'
    let target = FIELDS_MAP[name]
    if (FIELDS_MAP[name]) {
      field = target.tagName
    }
    return field
  }
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
  _getReadonly (h, { field, form, target }) {
    let { emptyText } = this
    if (isFunc(target.renderReadonly)) {
      return target.renderReadonly.call(this, h, { field, form, emptyText })
    } else if (target.readonlyType === 'disabled') {
      if (isFunc(target.render)) {
        let props = {
          disabled: true
        }
        return target.render.call(this, h, { field, form, readonly: this.readonly, props, emptyText })
      } else {
        return h(this.getTag(field.type), this.getOptions(h, { field, form }))
      }
    } else {
      return h('div', { class: 'form-readonly-text' }, form[field.key] || emptyText )
    }
  }
  getOptions (h, { field, form, props }) {
    let defaultProps = FIELDS_MAP[field.type].defaultProps
    let totalProps = {
      ...defaultProps,
      value: form[field.key],
      ...field.props,
      ...props
    }
    return {
      key: form.key,
      props: totalProps,
      attrs: field.attrs,
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
  renderField (h, { field, form }) {
    let render = this.getRender(h, { field, form, target: FIELDS_MAP[field.type] })
    if (render) {
      return render
    } else {
      return h(this.getTag(field.type), this.getOptions(h, { field, form }))
    }
  }
  renderFormItem (h, { field, form }) {
    let target = FORM_MAP['form-item']
    if (target && target.render) {
      return target.render.call(this, h, { field, form })
    }
    // return this.getRender(h, { field, form, target: FORM_MAP['form-item'] })
  }
  renderForm (h, { fields, form, renderFields, readonly, emptyText }) {
    this.readonly = readonly
    this.emptyText = emptyText
    let target = FORM_MAP['form']
    if (target && target.render) {
      return target.render.call(this, h, { fields, form, renderFields })
    }
  }
  registerField (options) {
    return FIELDS_MAP[options.type] = options
  }
  registerFormItem (options) {
    return FORM_MAP['form-item'] = options
  }
  registerForm (options) {
    return FORM_MAP['form'] = options
  }
}

export default FieldGenerator
