import { formatTime, formatDate, formatFullDateTime, formatDateRangeText } from './util'

export const install = (fg) => {
  // register form
  fg.registerForm({
    render (h, { fields, form, renderFields }) {
      let options = {
        class: 'vue-json-form',
        props: {
          'label-width': '120px'
        }
      }
      let children = renderFields(h, { fields, form })
      return h('el-form', options, children)
    }
  })

  // register form-item
  fg.registerFormItem({
    render (h, { field, form }) {
      let options = {
        props: {
          label: field.title,
          prop: field.key
        }
      }
      let tag = this.renderField(h, { field, form} )
      return h('el-form-item', options, [ tag ])
    }
  })

  // register input
  fg.registerField({ tagName: 'el-input', type: 'input', defaultValue: '', defaultProps: { placeholder: `请输入@title` } })

  // register input-number
  fg.registerField({ tagName: 'el-input-number', type: 'input-number', defaultValue: null })

  // register switch
  fg.registerField({ tagName: 'el-switch', type: 'switch', defaultValue: false, readonlyType: 'disabled' })

  // register slider
  fg.registerField({ tagName: 'el-slider', type: 'slider', defaultValue: null })

  // register rate
  fg.registerField({ tagName: 'el-rate', type: 'rate', defaultValue: null, readonlyType: 'disabled' })

  // register time-select
  fg.registerField({ tagName: 'el-time-select', type: 'time-select', defaultValue: '', defaultProps: { placeholder: `请选择@title` } })

  // register time-picker
  fg.registerField({
    tagName: 'el-time-picker',
    type: 'time-picker',
    defaultValue: '',
    defaultProps: { placeholder: `请选择@title` },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatTime(form[field.key]) || emptyText)
    }
  })

  // register date-picker
  fg.registerField({
    tagName: 'el-date-picker',
    type: 'date-picker',
    defaultValue: '',
    defaultProps: { placeholder: `请选择@title` },
    renderReadonly (h, { field, form, emptyText}) {
      return h('div', { class: 'form-readonly-text' }, formatDate(form[field.key]) || emptyText)
    }
  })

  // register color-picker
  fg.registerField({ tagName: 'el-color-picker', type: 'color-picker', defaultValue: '' })

  // register time-select
  fg.registerField({
    tagName: 'el-date-picker',
    type: 'date-range',
    defaultValue: [],
    defaultProps: { type: 'daterange', 'start-placeholder': '开始日期', 'end-placeholder': '结束日期' },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDateRangeText(form[field.key], formatDate, emptyText))
    }
  })

  // register datetime-range
  fg.registerField({
    tagName: 'el-date-picker',
    type: 'datetime-range',
    defaultValue: [],
    defaultProps: { type: 'datetimerange', 'start-placeholder': '开始日期', 'end-placeholder': '结束日期' },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDateRangeText(form[field.key], formatFullDateTime, emptyText))
    }
  })

  // register select
  fg.registerField({
    tagName: 'el-select',
    type: 'select',
    defaultValue: null,
    defaultProps: { placeholder: `请选择@title` },
    render (h, { field, form }) {
      let options = field.options || []
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
    },
    renderReadonly (h, { field, form, emptyText }) {
      let options = field.options
      let option = options.find(option => option.value === form[field.key])
      return h('div', { class: 'form-readonly-text' }, option ? option.label : emptyText )
    }
  })

  // register checkbox
  fg.registerField({
    tagName: 'el-checkbox',
    type: 'checkbox',
    defaultValue: false,
    readonlyType: 'disabled',
    render (h, { field, form, props }) {
      return h(this.getTag('checkbox'), this.getOptions(h, { field, form, props }), field.label)
    }
  })

  // register checkbox
  fg.registerField({
    tagName: 'el-checkbox-group',
    type: 'checkbox-group',
    defaultValue: [],
    readonlyType: 'disabled',
    render (h, { field, form, props }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h('el-checkbox', {
          props: {
            label: option.value,
            key: option.key
          }
        }, option.label)
      })
      return h(this.getTag('checkbox-group'), this.getOptions(h, { field, form, props }), optionsTag)
    }
  })

  // register radio
  fg.registerField({
    tagName: 'el-radio',
    type: 'radio',
    defaultValue: false,
    readonlyType: 'disabled',
    render (h, { field, form, props }) {
      return h(this.getTag('radio'), this.getOptions(h, { field, form, props }), field.label)
    }
  })

  // register radio-group
  fg.registerField({
    tagName: 'el-radio-group',
    type: 'radio-group',
    defaultValue: [],
    readonlyType: 'disabled',
    render (h, { field, form, props }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h('el-radio', {
          props: {
            label: option.value,
            key: option.key
          }
        }, option.label)
      })
      return h(this.getTag('radio-group'), this.getOptions(h, { field, form, props }), optionsTag)
    }
  })
  
  // register cascader
  fg.registerField({
    tagName: 'el-cascader',
    type: 'cascader',
    defaultValue: [],
    readonlyType: 'disabled',
    defaultProps: { placeholder: `请选择@title` },
    render (h, { field, form, props }) {
      field.props ?
        field.props.options = field.options :
        field.props = { options: field.options }
      return h(this.getTag('cascader'), this.getOptions(h, { field, form, props }))
    }
  })
}
