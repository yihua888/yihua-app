export const createdReturn = (data, reslove, reject) => {
  if (data) {
    reslove({
      data,
      code: 200,
      msg: '请求成功'
    })
  }

  reject({
    data: null,
    msg: '请求失败',
    code: 400
  })
}
