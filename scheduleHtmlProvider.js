function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

  let sch = document.querySelector(".course-wrap")
  if (!sch) {
    alert(`没有获取到课表哦
            导入流程：
             >> 登录多彩洛职账号
             >> 等课表加载出来，一键导入
            `)
  }

  return sch.outerHTML.replace(/<img.*?(?:>|\/>)/gi, "")
}