
# 表单验证
在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

::: tip 注意
只需要在需要的项目里设置 *required: true* 即可添加默认校验。
:::

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
          type: 'input',
          required: true
        },
        {
          title: '活动区域',
          key: 'region',
          type: 'select',
          required: true,
          options: [
            { label: '区域1', value: 1 },
            { label: '区域2', value: 2 }
          ]
        },
        {
          title: '活动时间',
          type: 'group',
          required: true,
          groupList: [
            {
              title: '日期',
              type: 'date-picker',
              key: 'date',
              span: 11,
              required: true
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
              span: 11,
              required: true
            }
          ]
        },
        {
          title: '即时配送',
          type: 'switch',
          key: 'delivery',
          required: true
        },
        {
          title: '活动性质',
          key: 'type',
          type: 'checkbox-group',
          required: true,
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
          required: true,
          options: [
            { label: '线上品牌商赞助', value: 1 },
            { label: '线下场地免费', value: 2 }
          ]
        },
        {
          title: '活动形式',
          type: 'textarea',
          key: 'desc',
          required: true
        },
        {
          type: 'submit',
          onSubmit: (form, valid) => {
            console.log(form, valid)
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
