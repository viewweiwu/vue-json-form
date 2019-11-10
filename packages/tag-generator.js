import { isFunc,  isObj, copy, isUndefined } from './util'

let TAGS_MAP = {}
class TagGenerator {
  constructor () {
    const ELEMENT_TAG = {
      'form': 'el-form',
      'form-item': 'el-form-item',
      'input-number': 'el-input-number'
    }
    this.ELEMENT_TAG = ELEMENT_TAG
    this.lib = 'element'
  }
  getTag (name) {
    let { lib, ELEMENT_TAG } = this
    let tag = 'div'
    let target = TAGS_MAP[name]
    if (TAGS_MAP[name]) {
      tag = target.tagName
    } else {
      switch (lib) {
        case 'element':
            tag = ELEMENT_TAG[name]
            break
      }
    }
    return tag
  }
  registerTag (options) {
    TAGS_MAP[options.type] = options
  }
  getRender (h, { field, form }) {
    let target = TAGS_MAP[field.type]
    if (target && target.render) {
      return target.render.call(this, h, { field, form })
    }
  }
  getOptions (h, { field, form }) {
    let defaultProps = TAGS_MAP[field.type]
    let props = {
      ...defaultProps,
      value: form[field.key],
      ...field.props
    }
    return {
      key: form.key,
      props,
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
    let target = TAGS_MAP[key]
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
  renderTag (h, { form, field }) {
    let render = this.getRender(h, { form, field })
    if (render) {
      return render
    } else {
      return h(this.getTag(field.type), this.getOptions(h, { field, form }))
    }
  }
}

export default TagGenerator
