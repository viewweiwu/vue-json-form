import { isFunc } from './util'

let TAGS_MAP = {}
let TAGS_DEFUALT_VALUE_MAP = {}

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
    if (TAGS_MAP[name]) {
      tag = TAGS_MAP[name]
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
    let { tagName, type, defaultValue } = options
    TAGS_MAP[type] = tagName
    TAGS_DEFUALT_VALUE_MAP[type] = defaultValue
  }
  getRenderItem (h, { form, field }) {
    return {
      props: {
        value: form[field.key]
      },
      on: {
        input (value) {
          form[field.key] = value || null
          if (isFunc(field.onChange)) {
            field.onChange(value, { field, form })
          }
        }
      }
    }
  }
  getDefaultValue (key) {
    return TAGS_DEFUALT_VALUE_MAP[key] || ''
  }
}

export default TagGenerator
