import { renderForm, initDefaultValue } from './field-renderer'

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
      default: '-'
    }
  },
  render (h) {
    let { fields, form, readonly, emptyText } = this
    let config = {
      readonly
    }
    return renderForm(h, { fields, form, readonly, emptyText })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let { fields, form } = this
      initDefaultValue.call(this, { fields, form })
    }
  }
}