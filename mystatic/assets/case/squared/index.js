const handleImg = (ctx, w, h, img, cw, ch , top , bottom , right, left) => {
  // 第一块
  ctx.drawImage(img, 0, 0, left, top, 0, 0, left, top)
  // 第二块
  ctx.drawImage(img, left, 0, w - right - left, top, left, 0, cw - right - left, top)
  // 第三块
  ctx.drawImage(img, w - right, 0, right, top, cw - right, 0, right, top)
  // 第四块
  ctx.drawImage(img, 0, top, left, h - top - bottom , 0, top, left, ch - bottom - top)
  // 第五块
  ctx.drawImage(img, left, top, w - right - left, h - top - bottom, left, top, cw - left - right, ch - top - bottom)
  // 第六块
  ctx.drawImage(img, w - right, top, right, h - top - bottom, cw - right, top, right, ch - top - bottom)
  // 第七块
  ctx.drawImage(img, 0, h - bottom, left, bottom, 0, ch - bottom, left, bottom)
  // 第八块
  ctx.drawImage(img, left, h - bottom, w - right - left, bottom, left, ch - bottom, cw - left - right, bottom)
  // 第九块
  ctx.drawImage(img, w - right, h - bottom, right, bottom, cw - right, ch - bottom, right, bottom)
}

export default (originUrl, cWidth, cHeight, top , bottom , right, left) => new Promise((reslove, reject) => {
  const DOM = document.createElement('canvas')
  DOM.width = cWidth
  DOM.height = cHeight
  const ctx = DOM.getContext('2d')
  const img = document.createElement('img')
  img.src = originUrl
  img.onload = () => {
    handleImg(ctx, img.naturalWidth, img.naturalHeight, img, cWidth, cHeight, top , bottom , right, left)
    reslove(DOM.toDataURL('image/png'))
  }
  img.onerror = (err) => reject(err)
})
