import { formatTime, getLabelByOption, formatDate, formatFullDateTime, formatDateRangeText, isFunc, isArray, isObj, copy } from '../../util'

const getRule = (field, config) => {
  let rule = field.rule

  if (field.required) {
    if (isArray(rule)) {
      rule = [
        config.defaultRequiredRule,
        ...rule
      ]
    } else if (isObj(rule)) {
      rule = [
        config.defaultRequiredRule,
        rule
      ]
    } else {
      rule = [ config.defaultRequiredRule ]
    }
  }
  if (rule) {
    rule.forEach(r => {
      if (r.message) {
        r.message = r.message.replace(/@title/g, field.title)
      }
    })
  }
  return rule
}

export const install = (fg) => {
  fg.getOptions = function (h, { field, form, props }) {
    let config = this.FIELDS_MAP[field.type] || {}
    let defaultProps = config.defaultProps
    let defaultAttrs = config.defaultAttrs
    let totalProps = {
      ...defaultProps,
      ...field.props,
      ...props
    }
    let placeholder = totalProps.placeholder || ''
    if (isArray(placeholder)) {
      placeholder = placeholder.map(item => item.replace(/@title/g, field.title))
    } else {
      placeholder = placeholder.replace(/@title/g, field.title)
    }
    totalProps.placeholder = placeholder
    let totalAttrs = {
      placeholder: totalProps.placeholder,
      maxlength: totalProps.maxlength,
      ...defaultAttrs,
      ...field.attrs
    }

    let rule = getRule(field, config)

    let directives = [
      {
        name: 'decorator',
        value: [ field.key, { rules: rule } ]
      }
    ]
    return {
      key: form.key,
      props: totalProps,
      attrs: totalAttrs,
      directives,
      on: {
        input (value) {
          if (value instanceof InputEvent) {
            form[field.key] = value.target.value
          } else {
            form[field.key] = value
          }
          if (isFunc(field.onChange)) {
            let label = getLabelByOption(value, field.options)
            field.onChange(value, { field, label, form })
          }
        }
      }
    }
  }

  // register row
  fg.registerGrid({
    tagName: 'a-row',
    type: 'row',
    grid: 24
  })
  // register col
  fg.registerGrid({
    tagName: 'a-col',
    type: 'col'
  })

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
          ...context.$attrs
        }
      }
      let children = renderFields(h, { fields, form })

      // create antd form
      let aForm = context.aForm

      if (!aForm) {
        aForm = context.$form.createForm(context, { name: 'a-form' })
        context.aForm = aForm
      }

      options.props.form = aForm

      return h('a-form', options, children)
    }
  })

  // register form-item
  fg.registerFormItem({
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
    render (h, { field, form, config, showTitle = true }) {
      let classList = []
      if (this.readonly || field.readonly) {
        classList.push('readonly')
      }
      let options = {
        class: classList,
        props: {
          selfUpdate: true,
          labelCol: config.labelCol,
          wrapperCol: config.wrapperCol,
          label: showTitle ? field.title : ''
        }
      }

      let tag
      if (field.type === 'group') {
        tag = this.renderFormItemByArray(h, { field: field.groupList, form, showTitle: false })
      } else {
        tag = this.renderField(h, { field, form })
      }
      return h('a-form-item', options, [tag])
    }
  })

  // register input
  fg.registerField({
    tagName: 'a-input',
    type: 'input',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' },
    defaultProps: { placeholder: `请输入@title`, maxlength: 20, allowClear: true }
  })

  // register input
  fg.registerField({
    tagName: 'a-textarea',
    type: 'textarea',
    defaultValue: '',
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' },
    defaultProps: { placeholder: `请输入@title`, maxlength: 20, allowClear: true }
  })

  // register input-number
  fg.registerField({
    tagName: 'a-input-number',
    type: 'input-number',
    defaultValue: null,
    defaultRequiredRule: { required: true, message: '请输入@title', trigger: 'blur' }
  })

  // register switch
  fg.registerField({
    tagName: 'a-switch',
    type: 'switch',
    defaultValue: false,
    readonlyType: 'disabled',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register slider
  fg.registerField({
    tagName: 'a-slider',
    type: 'slider',
    defaultValue: null,
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register rate
  fg.registerField({
    tagName: 'a-rate',
    type: 'rate',
    defaultValue: null,
    readonlyType: 'disabled',
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' }
  })

  // register time-picker
  fg.registerField({
    tagName: 'a-time-picker',
    type: 'time-picker',
    defaultValue: '',
    defaultRequiredRule: { required: true, type: 'date', message: '请至少选择一个@title', trigger: 'change' },
    defaultProps: { placeholder: `请选择@title`, allowClear: true },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatTime(form[field.key]) || emptyText)
    }
  })
  // register date-picker
  fg.registerField({
    tagName: 'a-date-picker',
    type: 'date-picker',
    defaultValue: '',
    defaultRequiredRule: { required: true, type: 'date', message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: `请选择@title`, allowClear: true },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDate(form[field.key]) || emptyText)
    }
  })

  // register date-range
  fg.registerField({
    tagName: 'a-range-picker',
    type: 'date-range',
    defaultValue: [],
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: ['开始日期', '结束日期'], allowClear: true },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDateRangeText(form[field.key], formatDate, emptyText))
    }
  })

  // register datetime-range
  fg.registerField({
    tagName: 'a-range-picker',
    type: 'datetime-range',
    defaultValue: [],
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: ['开始日期', '结束日期'], format: 'YYYY-MM-DD HH:mm:ss', showTime: true, allowClear: true },
    renderReadonly (h, { field, form, emptyText }) {
      return h('div', { class: 'form-readonly-text' }, formatDateRangeText(form[field.key], formatFullDateTime, emptyText))
    }
  })

  // register select
  fg.registerField({
    tagName: 'a-select',
    type: 'select',
    defaultValue: null,
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    defaultProps: { placeholder: `请选择@title`, allowClear: true },
    render (h, { field, form }) {
      let options = field.options || []
      let optionsTag = options.map(option => {
        return h('a-select-option', {
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
    tagName: 'a-checkbox',
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
    tagName: 'a-checkbox-group',
    type: 'checkbox-group',
    defaultValue: [],
    defaultRequiredRule: { required: true, type: 'array', message: '请选择@title', trigger: 'change' },
    readonlyType: 'disabled',
    button: false,
    render (h, { field, form, props, config }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h(
          (field.button || config.button) ? 'a-checkbox-button' : 'a-checkbox',
          {
            props: {
              value: option.value,
              key: option.key,
              disabled: option.disabled
            }
          },
          option.label
        )
      })
      return h(this.getTag('checkbox-group'), this.getOptions(h, { field, form, props }), optionsTag)
    }
  })

  // register radio
  fg.registerField({
    tagName: 'a-radio',
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
    tagName: 'a-radio-group',
    type: 'radio-group',
    defaultValue: [],
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    readonlyType: 'disabled',
    button: false,
    render (h, { field, form, props, config }) {
      let options = field.options
      let optionsTag = options.map(option => {
        return h(
          (field.button || config.button) ? 'a-radio-button' : 'a-radio',
          {
            props: {
              value: option.value,
              key: option.key
            }
          },
          option.label
        )
      })
      return h(this.getTag('radio-group'), this.getOptions(h, { field, form, props }), optionsTag)
    }
  })

  // register cascader
  fg.registerField({
    tagName: 'a-cascader',
    type: 'cascader',
    defaultValue: [],
    defaultRequiredRule: { required: true, message: '请选择@title', trigger: 'change' },
    readonlyType: 'disabled',
    defaultProps: { placeholder: `请选择@title`, allowClear: true },
    render (h, { field, form, props }) {
      field.props
        ? field.props.options = field.options
        : field.props = { options: field.options }
      return h(this.getTag('cascader'), this.getOptions(h, { field, form, props }))
    }
  })

  fg.registerField({
    tagName: 'a-button',
    type: 'submit',
    render (h, { field, context }) {
      let options = {
        props: {
          type: 'primary'
        },
        on: {
          click: () => {
            if (isFunc(field.onSubmit)) {
              context.aForm.validateFields(valid => {
                field.onSubmit(copy(context.form), valid)
              })
            }
          }
        }
      }
      return h('div', [
        h('a-button', options, '提交')
      ])
    }
  })
}
