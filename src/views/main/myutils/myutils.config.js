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
        label: '工具名称',
        placeholder: '请输入工具名称'
      }
    ]
  },
  tableCol: [
    {
      prop: 'name', label: '工具名称', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler'
    }
  ]
}
