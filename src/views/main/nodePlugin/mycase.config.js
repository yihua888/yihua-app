export default {
  formConfig: {
    labelWidth: '120px',
    itemStyle: {
      padding: '10px 40px'
    },
    colLayout: {
      span: 12
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '脚本名称',
        placeholder: '请输入案例脚本'
      },
      {
        field: 'info',
        type: 'input',
        label: '脚本介绍',
        placeholder: '请输入例类型'
      }
    ]
  },
  tableCol: [
    {
      prop: 'name', label: '脚本名称', minWidth: '100'
    },
    {
      prop: 'info', label: '脚本介绍', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler'
    }
  ]
}
