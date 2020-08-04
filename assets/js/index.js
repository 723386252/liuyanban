function release() {
    window.location.href = '/release'
}
let type = 'all'
  window.onload = function() {
    getblog(1,total=>{
      layui.use(['laypage', 'layer'], function(){
        let laypage = layui.laypage
        let layer = layui.layer;
        laypage.render({
        elem: 'demo2-2',
        count: total,
        limit:10,
        theme: '#80bd01',
        jump: function(obj, first){
        if(!first){
          getblog(obj.curr,res=>{})
            }
        }
        })})
    })
  }
  function getblog(page,success){
    $.ajax({
      type: "get",
      url: "/getbloglist",
      data: {
        tab:type,
        page
      },
      success: function (res) {
        if(res.success === 0){
          if(res.error_code === 103){
            console.log('数据库请求错误');
          }
        }
        else{
          success(res.total)
          document.querySelector('#blogbox').innerHTML = ''
          console.log( res.bloginfo);
          res.bloginfo.forEach(item=>{
            $('#blogbox').append(`<div class="contentitem">
            <div class="portrait">
              <img src="${item.portrait}" alt="${item.username}" class="portraitimg">
            </div>
            <span class="support">${item.collect}</span><span class="count">/${item.view}</span>
            <div class="${item.top === 1? 'typelight': 'typenormal'}" style="font-size: 12px;">${item.type_chinese}</div>
            <a class="content" href="/blogdetail?blogid=${item.blogid}">${item.blogtitle}</a>
            <span class="sbumittime">${item.pushtime}</span>
          </div>`);
          })
          
        }
      }
    });
  }
function tabchange(tab,index) {
  type = tab
  getblog(1,res=>{
    $('.tabbox').eq(0).children('div').removeClass('focustab')
    $('.tabbox').eq(0).children('div').eq(index).addClass('focustab')
  })

}