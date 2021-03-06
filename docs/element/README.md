# element-ui 表单

::: demo
<el-button @click="readonly = !readonly">readonly</el-button>
<vue-json-form :fields="fields" :readonly="readonly" />

<script>
export default {
  name: 'app',
  data () {
    return {
      readonly: false,
      fields: [
        {
          title: '姓名',
          type: 'input',
          key: 'name'
        },
        {
          title: '个性签名',
          type: 'textarea',
          key: 'desc'
        },
        {
          title: '身高',
          type: 'input-number',
          key: 'age'
        },
        {
          title: '是否成年',
          type: 'switch',
          key: 'switchKey'
        },
        {
          title: '年龄',
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
          ],
          onChange: (value, { label }) => {
            console.log(value, label)
          }
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
  },
  mounted () {
  }
}
</script>

<style>
.form-readonly-text {
  min-height: 40px;
  line-height: 1em;
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ebeef5;
  box-sizing: border-box;
}
</style>
:::

## 基本参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| fields | 配置列 | Array | <a href="#field">Field</a> | - |
| form | 表单值 | Object | - | - |
| readonly | 只读 | Boolean | - | false |
| empty-text | 只读显示的文字 | String | - | '-' |

## Field
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| title | 标题 | String | - | - |
| type | 表单类型 | String | 'input'...| - |
| readonly | 只读 | Boolean | - | false |
| empty-text | 只读显示的文字 | String | - | '-' |
