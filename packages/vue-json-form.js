import { renderForm, initDefaultValue, installMethods } from './field-renderer'
import { copy } from './util'

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
  data () {
    return {
      copyForm: {}
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
      this.copyForm = copy(form)
    },
    clear () {
      this.$refs.form.clearValidate()
    }
  }
}
