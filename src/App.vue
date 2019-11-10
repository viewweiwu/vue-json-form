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
        },
        {
          title: '开关',
          type: 'switch',
          key: 'switchKey'
        },
        {
          title: '滑块',
          type: 'slider',
          key: 'sliderKey'
        },
        {
          title: '评分',
          type: 'rate',
          key: 'rateKey'
        },
        {
          title: '选择',
          type: 'select',
          key: 'selectKey',
          options: [
            { label: '标签1', value: 0 }
          ]
        },
        {
          title: '多选框',
          type: 'checkbox',
          key: 'checkboxKey',
          label: '是否同意'
        },
        {
          title: '多选框组',
          type: 'checkbox-group',
          key: 'checkboxGroupKey',
          options: [
            { label: '标签1', value: 0 },
            { label: '标签2', value: 1 }
          ]
        },
        {
          title: '单选框',
          type: 'radio',
          key: 'radioKey',
          label: '是否同意'
        },
        {

          title: '单选框组',
          type: 'radio-group',
          key: 'radioGroupKey',
          options: [
            { label: '标签1', value: 0 },
            { label: '标签2', value: 1 }
          ]
        },
        {
          title: '级连选择',
          type: 'cascader',
          key: 'cascaderKey',
          options: [
            { label: '北京', value: 0 },
            {
              label: '浙江',
              value: 1,
              children: [
                { label: '杭州', value: 0 }
              ]
            }
          ]
        },
        {
          title: '时间选择',
          type: 'time-select',
          key: 'timeSelectKey'
        },
        {
          title: '时间选择',
          type: 'time-picker',
          key: 'timePickerKey'
        },
        {
          title: '日期选择',
          type: 'date-picker',
          key: 'datePickertKey'
        },
        {
          title: '颜色选择',
          type: 'color-picker',
          key: 'colorPickertKey'
        },
        {
          title: '日期选择',
          type: 'date-range',
          key: 'dateRangeKey'
        },
        {
          title: '日期选择',
          type: 'datetime-range',
          key: 'datetimeRangeKey'
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
