
# 典型表单
包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。
::: demo
<vue-json-form :fields="fields" />

<script>
export default {
  data() {
    return {
      fields: [
        {
          title: '活动名称',
          key: 'name',
          type: 'input'
        },
        {
          title: '活动区域',
          key: 'region',
          type: 'select',
          options: [
            { label: '区域1', value: 1 },
            { label: '区域2', value: 2 }
          ]
        },
        {
          title: '活动时间',
          type: 'group',
          groupList: [
            {
              title: '日期',
              type: 'date-picker',
              key: 'date',
              span: 11
            },
            {
              span: 2,
              render: (h) => {
                return h('div', { style: 'text-align: center' }, '-')
              }
            },
            {
              title: '时间',
              type: 'time-picker',
              key: 'time',
              span: 11
            }
          ]
        },
        {
          title: '即时配送',
          type: 'switch',
          key: 'delivery'
        },
        {
          title: '活动性质',
          key: 'type',
          type: 'checkbox-group',
          options: [
            { label: '美食/餐厅线上活动', value: 1 },
            { label: '地推活动', value: 2 },
            { label: '线下主题活动', value: 3 },
            { label: '单纯品牌曝光', value: 4 }
          ]
        },
        {
          title: '特殊资源',
          type: 'radio-group',
          key: 'resource',
          options: [
            { label: '线上品牌商赞助', value: 1 },
            { label: '线下场地免费', value: 2 }
          ]
        },
        {
          title: '活动形式',
          type: 'textarea',
          key: 'desc'
        },
        {
          type: 'submit',
          onSubmit: (form) => {
            console.log(form)
          }
        }
      ]
    }
  }
}
</script>
<style>
.el-form .el-date-editor.el-input,
.el-form .el-date-editor.el-input__inner,
.el-form .el-select {
  width: 100%;
}
</style>
:::
