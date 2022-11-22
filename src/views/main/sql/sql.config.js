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
          field: 'info',
          type: 'input',
          label: '说明',
          placeholder: '请输说明'
        }
      ]
    },
    tableCol: [
      {
        prop: 'info', label: '说明', minWidth: '100'
      },
      {
        label: '操作', minWidth: '100',  slotName: 'handler',   align: 'center'
      }
    ]
  }
  