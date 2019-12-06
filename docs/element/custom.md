
# 自定义校验规则
这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

::: demo
<vue-json-form ref="form" :fields="fields" :form="form" />

<script>
export default {
  data() {
    const validateAge = (rule, value, callback) => {
      if (value === null) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (value < 18) {
          callback(new Error('必须年满18岁'));
        } else {
          callback()
        }
      }, 1000);
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('repassword')
        }
        callback()
      }
    }
    const validateRepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      fields: [
        {
          title: '密码',
          key: 'password',
          type: 'input',
          rule: { required: true, validator: validatePassword, trigger: 'blur' }
        },
        {
          title: '确认密码',
          type: 'input',
          key: 'repassword',
          rule: { required: true, validator: validateRepassword, trigger: 'blur' }
        },
        {
          title: '年龄',
          key: 'age',
          type: 'input-number',
          rule: { required: true, validator: validateAge, trigger: 'change' }
        }
      ]
    }
  }
}
</script>
:::