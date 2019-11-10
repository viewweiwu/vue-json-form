export const install = (tg) => {
  tg.registerTag({ tagName: 'el-input', type: 'input', defaultValue: '' })
  tg.registerTag({ tagName: 'el-input-number', type: 'input-number', defaultValue: null })
  tg.registerTag({ tagName: 'el-switch', type: 'switch', defaultValue: false })
  tg.registerTag({ tagName: 'el-slider', type: 'slider', defaultValue: null })
  tg.registerTag({ tagName: 'el-rate', type: 'rate', defaultValue: null })
  tg.registerTag({ tagName: 'el-time-select', type: 'time-select', defaultValue: '' })
  tg.registerTag({ tagName: 'el-time-picker', type: 'time-picker', defaultValue: '' })
  tg.registerTag({ tagName: 'el-date-picker', type: 'date-picker', defaultValue: '' })
  tg.registerTag({ tagName: 'el-color-picker', type: 'color-picker', defaultValue: '' })
  tg.registerTag({ tagName: 'el-date-picker', type: 'date-range', defaultValue: [], defaultProps: { type: 'daterange' } })
  tg.registerTag({ tagName: 'el-date-picker', type: 'datetime-range', defaultValue: [], defaultProps: { type: 'datetimerange' } })
  tg.registerTag({
    tagName: 'el-select',
    type: 'select',
    defaultValue: null,
    render (h, { field, form }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h('el-option', {
          props: {
            label: option.label,
            key: option.key,
            value: option.value
          }
        }, option.label)
      })
      return h(this.getTag('select'), this.getOptions(h, { field, form }), optionsTag)
    }
  })
  tg.registerTag({
    tagName: 'el-checkbox',
    type: 'checkbox',
    defaultValue: false,
    render (h, { field, form }) {
      return h(this.getTag('checkbox'), this.getOptions(h, { field, form }), field.label)
    }
  })
  tg.registerTag({
    tagName: 'el-checkbox-group',
    type: 'checkbox-group',
    defaultValue: [],
    render (h, { field, form }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h('el-checkbox', {
          props: {
            label: option.value,
            key: option.key
          }
        }, option.label)
      })
      return h(this.getTag('checkbox-group'), this.getOptions(h, { field, form }), optionsTag)
    }
  })
  tg.registerTag({
    tagName: 'el-radio',
    type: 'radio',
    defaultValue: false,
    render (h, { field, form }) {
      return h(this.getTag('radio'), this.getOptions(h, { field, form }), field.label)
    }
  })
  tg.registerTag({
    tagName: 'el-radio-group',
    type: 'radio-group',
    defaultValue: [],
    render (h, { field, form }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h('el-radio', {
          props: {
            label: option.value,
            key: option.key
          }
        }, option.label)
      })
      return h(this.getTag('radio-group'), this.getOptions(h, { field, form }), optionsTag)
    }
  })
  tg.registerTag({
    tagName: 'el-cascader',
    type: 'cascader',
    defaultValue: [],
    render (h, { field, form }) {
      field.props ? field.props.options = field.options : field.props = { options: field.options }
      return h(this.getTag('cascader'), this.getOptions(h, { field, form }))
    }
  })
}
