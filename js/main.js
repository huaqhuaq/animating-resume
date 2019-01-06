/* 把code */
function writeCode(prefix, code, fn){
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if(n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper > .content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if(n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}

var result = `/*
 * 面试官你好，我是华洁滢
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
  *{
    transition: all 1s;
  }
  html{
    background: rgb(222,222,222);
    font-size: 16px;
  }
  #code{
    border: 1px solid #aaa;
    padding: 16px;
  }
  /* 我需要一点代码高亮 */
  .token.selector{
    color: #690;
  }
  .token.property{
    color: #905;
  }
  .token.function{
    color: #dd4a68;
  }
  /* 加点 3D 效果 */
  #code{
    transform: rotate(360deg);
  }
  /* 不玩了，我来介绍一下自己吧 */
  /* 我需要一张白纸 */
  #code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
  }
  #paper{
    position: fixed;
    right:0;
    width: 50%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  #paper > .content{
    background: white;
    width: 100%;
    height: 100%;
  }
`
var result2 = `
  #paper{
  }
  /*
   * 接下来把 Markdown 变成 HTML - marked.js 
  */
`
var md = `
  # 自我介绍
  我叫华洁滢
  1993 年 2 月出生
  前端工作三年
  希望应聘前端开发岗位
  # 技能介绍
  熟悉 JavaScript CSS
  # 项目介绍
  1. 轮播
  2. 简历
  3. 画板
  # 联系方式
  - QQ 2131101
  - Email 2131101@qq.com
  - 手机 18921190709
`

// writeCode 是异步任务/函数，
// createPaper 是同步任务/函数

writeCode('', result, ()=> { // writeCode call the function
  createPaper(()=>{
    writeCode(result, result2, ()=>{
      writeMarkdown(md)
    })
  })
})

function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content markdown-body'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function writeMarkdown(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn
}