
# 典型表单
根据具体目标和制约因素，选择最佳的标签对齐方式。
::: demo
<el-radio-group v-model="labelPosition" size="small" style="margin-bottom: 20px;">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<vue-json-form :fields="fields" :label-position="labelPosition" />

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
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
        }
      ]
    }
  }
}
</script>
<style>
.vue-json-form.el-form .el-date-editor.el-input,
.vue-json-form.el-form .el-date-editor.el-input__inner,
.vue-json-form.el-form .el-select {
  width: 100%;
} 
</style>
:::
