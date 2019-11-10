
import { renderForm, initDefaultValue } from './fields-renderer'

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
    }
  },
  render (h) {
    let { fields, form } = this
    return renderForm(h, { fields, form })
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