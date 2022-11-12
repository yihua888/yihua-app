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
        label: '案例名称',
        placeholder: '请输入案例名称'
      },
      {
        field: 'typeId',
        type: 'input',
        label: '案例类型',
        placeholder: '请输入例类型'
      }
    ]
  },
  tableCol: [
    {
      prop: 'name', label: '组件代码', minWidth: '100'
    },
    {
      prop: 'type', label: '案例类型', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler'
    }
  ]
}
