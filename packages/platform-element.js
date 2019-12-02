import { formatTime, formatDate, formatFullDateTime, formatDateRangeText, isFunc } from './util'

const getRules = (fields, context, getConfigByFiledType) => {
  if (context.rules) {
    return context.rules
  }
  let rules = {}
  fields.forEach(field => {
    let rule = field.rule
    if (field.required) {
      rule = getRequiredRule(rule, field, getConfigByFiledType)
    }
    if (rule) {
      rules[field.key] = rule
    }
  })
  context.rules = rules
  return context.rules
}

const getRequiredRule = (rule, field, getConfigByFiledType) => {
  let requiredRule = getConfigByFiledType(field.type).defaultRequiredRule
  if (requiredRule) {
    requiredRule.message = requiredRule.message.replace(/@title/g, field.title)
  }

  return requiredRule
}

export const install = (fg) => {
  // register form
  fg.registerForm({
    render (h, { fields, form, renderFields, context }) {
      let classList = ['vue-json-form']
      if (this.readonly) {
        classList.push('readonly')
      }
      let options = {
        ref: 'form',
        class: classList,
        props: {
          'label-width': '120px',
          model: form,
          rules: getRules(fields, context, fg.getConfigByFiledType)
        }
      }
      let children = renderFields(h, { fields, form })

      return h('el-form', options, children)
    }
  })

  // register form-item
  fg.registerFormItem({
    render (h, { field, form }) {
      let classList = []
      if (this.readonly || field.readonly) {
        classList.push('readonly')
      }
      let options = {
        class: classList,
        props: {
          label: field.title,
          prop: field.key
        }
      }
      let tag = this.renderField(h, { field, form })
      return h('el-form-item', options, [ tag ])
    }
  })

  // register input
  fg.registerField({
    tagName: 'el-input',
    type: 'input',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' },
    defaultProps: { placeholder: `请输入@title`, maxlength: 20 }
  })

  // register textarea
  fg.registerField({
    tagName: 'el-input',
    type: 'textarea',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' },
    defaultProps: { placeholder: `请输入@title`, type: 'textarea', maxlength: 256 }
  })

  // register input-number
  fg.registerField({
    tagName: 'el-input-number',
    type: 'input-number',
    defaultValue: null,
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' }
  })

  // register switch
  fg.registerField({
    tagName: 'el-switch',
    type: 'switch',
    defaultValue: false,
    readonlyType: 'disabled',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register slider
  fg.registerField({
    tagName: 'el-slider',
    type: 'slider',
    defaultValue: null,
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register rate
  fg.registerField({
    tagName: 'el-rate',
    type: 'rate',
    defaultValue: null,
    readonlyType: 'disabled',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register time-select
  fg.registerField({
    tagName: 'el-time-select',
    type: 'time-select',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: `请选择@title` }
  })

  // register time-picker
  fg.registerField({
    tagName: 'el-time-picker',
    type: 'time-picker',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请至少选择一个@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: `请选择@title` },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDate(form[field.key]) || emptyText)
    }
  })

  // register color-picker
  fg.registerField({
    tagName: 'el-color-picker',
    type: 'color-picker',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register time-select
  fg.registerField({
    tagName: 'el-date-picker',
    type: 'date-range',
    defaultValue: [],
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
      return h('div', { class: 'form-readonly-text' }, option ? option.label : emptyText)
    }
  })

  // register checkbox
  fg.registerField({
    tagName: 'el-checkbox',
    type: 'checkbox',
    defaultValue: false,
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
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
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    readonlyType: 'disabled',
    defaultProps: { placeholder: `请选择@title` },
    render (h, { field, form, props }) {
      field.props
        ? field.props.options = field.options
        : field.props = { options: field.options }
      return h(this.getTag('cascader'), this.getOptions(h, { field, form, props }))
    }
  })

  fg.registerField({
    tagName: 'el-button',
    type: 'submit',
    render (h, { field, context }) {
      let options = {
        props: {
          type: 'primary'
        },
        on: {
          click: () => {
            if (isFunc(field.onSubmit)) {
              context.$refs.form.validate(valid => {
                field.onSubmit(valid)
              })
            }
          }
        }
      }
      return h('div', [
        h('el-button', options, '提交')
      ])
    }
  })
}
