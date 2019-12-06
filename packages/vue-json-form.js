import { renderForm, initDefaultValue, installMethods } from './field-renderer'

export default {
  name: 'vue-json-form',
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'hello'
    }
  },
  render (h) {
    let { fields, form, readonly, emptyText } = this
    return renderForm(h, { fields, form, readonly, emptyText, context: this })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let { fields, form } = this
      initDefaultValue.call(this, { fields, form })
      installMethods(this)
    },
    clear () {
      this.$refs.form.clearValidate()
    }
  }
}
