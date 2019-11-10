<template>
  <div>
    <vue-json-form :fields="fields" :form="form" />
  </div>
</template>
<script>

export default {
  name: 'app',
  data () {
    return {
      form: {},
      fields: [
        {
          title: '输入框',
          type: 'input',
          key: 'name'
        },
        {
          title: '数字输入框',
          type: 'input-number',
          key: 'age'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
