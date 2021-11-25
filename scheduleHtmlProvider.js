function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

  let sch = document.querySelectorAll(".common-item")

  if (!sch) {
    alert(`没有获取到课表哦
            导入流程：
             >> 登录多彩洛职账号
             >> 打开全部课表页面，如果有折叠的课程点击展开
             >> 然后一键导入
            `)
  }

  let str = '<div class="moe">'
  sch.forEach((item) => {
    str += item.outerHTML
  })
  str+="</div>"
  
  return str
}
