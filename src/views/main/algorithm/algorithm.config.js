export default {
  formConfig: {
    labelWidth: '120px',
    itemStyle: {
      padding: '10px 40px'
    },
    colLayout: {
      span: 6
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: 'code',
        placeholder: 'code'
      },
      {
        field: 'label',
        type: 'input',
        label: '名称',
        placeholder: '名称'
      },
      {
        field: 'type',
        type: 'input',
        label: '类型代码',
        placeholder: '请输入类型代码'
      },
      {
        field: 'typeName',
        type: 'input',
        label: '类型名称',
        placeholder: '请输入类型名称'
      }
    ]
  },
  tableCol: [
    {
      prop: 'name', label: 'code', minWidth: '100'
    },
    {
      prop: 'label', label: '名称', minWidth: '100'
    },
    {
      prop: 'type', label: '类型代码', minWidth: '100'
    },
    {
      prop: 'typeName', label: '类型名称', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',  align: 'center'
    }
  ]
}
