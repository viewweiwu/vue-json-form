import VueJsonForm from './vue-json-form'

VueJsonForm.install = function (Vue) {
  if (VueJsonForm.install.installed) return
  Vue.component(VueJsonForm.name, VueJsonForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  VueJsonForm.install(window.Vue)
}

export default VueJsonForm