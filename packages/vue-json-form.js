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
    },
    autoInitPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  render (h) {
    let { fields, form, readonly, emptyText, autoInitPlaceholder } = this
    let config = {
      readonly
    }
    return renderForm(h, { fields, form, readonly, emptyText, autoInitPlaceholder })
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