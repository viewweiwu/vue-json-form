module.exports = {
  title: 'vue-json-form',  // 设置网站标题
  dest: './dist',   // 设置输出目录
  plugins: ['demo-code'],
  // base: '/vue-json-form/',// 设置站点根路径
  repo: 'https://github.com/viewweiwu/vue-json-form', // 添加 github 链接
  themeConfig: {
    sidebar: [
      {
        title: 'element-ui form 复刻',
        sidebarDepth: 2,
        children: [
          ['/element/', '配置'],
          ['/element/default', '典型表单'],
          ['/element/inline', '行内表单'],
          ['/element/position', '对齐方式'],
          ['/element/validate', '表单验证'],
          ['/element/custom', '自定义校验规则'],
          ['/element/size', '表单内组件尺寸控制']
        ]
      }
    ]
  }
}