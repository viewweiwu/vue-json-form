
# 行内表单
当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

::: demo
<vue-json-form inline label-width="unset" :fields="fields" />

<script>
export default {
  data() {
    return {
      fields: [
        {
          title: '审批人',
          key: 'user',
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
:::