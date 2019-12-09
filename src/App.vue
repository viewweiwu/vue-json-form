<template>
  <div>
    <!-- <a-button type="primary" @click="readonly = !readonly">readonly</a-button> -->
    <vue-json-form :fields="fields" />
    <a-button @click="fields[0].title='----'">333</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readonly: true,
      emptyText: '---',
      fields: [
        {
          title: '姓名',
          type: 'input',
          key: 'name',
          required: true
        },
        {
          title: '个性签名',
          type: 'textarea',
          key: 'desc',
          required: true
        },
        {
          title: '身高',
          type: 'input-number',
          key: 'age',
          required: true
        },
        {
          title: '是否成年',
          type: 'switch',
          key: 'switchKey',
          required: true
        },
        {
          title: '年龄',
          type: 'slider',
          key: 'sliderKey',
          required: true
        },
        {
          title: '评分',
          type: 'rate',
          key: 'rateKey',
          required: true
        },
        {
          title: '选择',
          type: 'select',
          key: 'selectKey',
          required: true,
          options: [
            { label: '标签1', value: 0 },
            { label: '标签2', value: 1 }
          ]
        },
        {
          title: '多选框',
          type: 'checkbox',
          key: 'checkboxKey',
          label: '是否同意',
          required: true
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
          title: '时间',
          type: 'time-picker',
          key: 'timePickerKey'
        },
        {
          title: '日期选择',
          type: 'date-picker',
          key: 'datePickertKey'
        },
        {
          title: '日期选择',
          type: 'date-range',
          key: 'dateRangeKey',
          onChange: (value, { label }) => {
            console.log(value, label)
          }
        },
        {
          title: '日期选择',
          type: 'datetime-range',
          key: 'datetimeRangeKey'
        },
        {
          type: 'submit',
          onSubmit: (valid) => {
            console.log(valid)
          }
        }
      ]
    }
  }
}
</script>

<style>
.form-readonly-text {
  min-height: 32px;
  line-height: 1em;
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ebeef5;
  box-sizing: border-box;
}
</style>
