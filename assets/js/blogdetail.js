let query = {}
window.location.search.split('?')[1].split('&').forEach(item=>{
    query[item.split('=')[0]] = item.split('=')[1]
})
window.onload = function(){
    getcomment(1,res=>{
        console.log(res);
        layui.use(['laypage', 'layer'], function(){
            let laypage = layui.laypage
            let layer = layui.layer;
            laypage.render({
            elem: 'demo2-2',
            count: res[1][0].total,
            limit:6,
            theme: '#80bd01',
            jump: function(obj, first){
            if(!first){
                getcomment(obj.curr,result=>{})
                }
            }
            })})
    })
}
function newreply() {
    document.querySelector('.replybox').style.display = 'block'
}
function closereply() {
    document.querySelector('.replybox').style.display = 'none'
}
function deletecomment(event) {
$.ajax({
    type: "get",
    url: "/commentdelete",
    data: {
        blogid:query.blogid,
        commentid:event.target.dataset.commentid
    },
    success(res){
        if(res.success===0){
            if(res.error_code === 100){
                alert('还未登陆')
                location.href = '/login'
            }
            else if(res.error_code === 101){
                alert('删除失败')
                location.href = '/blogdetail?blogid='+$('#blogid')[0].value
            }
        }
        else if(res.success === 1){
            location.href = '/blogdetail?blogid='+$('#blogid')[0].value
        }
        else{
            location.href = '/?tab=all'
        }
        console.log(res);
    }
});
}
function support() {
    new Promise((resolve,reject)=>{
        $.ajax({
            type: "get",
            url: "/iscollect",
            data: {
            blogid:$('#blogid')[0].value
        },
        success(res){
            // console.log(res);
            if(res.success === 0){
                if(res.error_code === 103){
                    console.log('查询错误');
                }
                else if(res.error_code === 104){
                    location.href='/login'
                }
            }
            else{
                if(!res.iscollect){
                    resolve()
                }
            }
        }})
    }).then((data)=>{
        $.ajax({
            type: "get",
            url: "/addcollect",
            data: {
            blogid:$('#blogid')[0].value,
            collect:parseInt($('#collect')[0].textContent)
        },
        success(res){
            console.log(res);
            if(res.success === 0){
                if(res.error_code === 104){
                    location.href='/login'
                }
                else if(res.error_code === 105){
                    console.log('未知错误');
                }
            }
            else{
                $('#collect')[0].textContent=parseInt($('#collect')[0].textContent)+1
                $('.supportimg')[0].src = '/assets/imgs/icons/support_light.png'
            }
        }
    })
    
  })}
  function getcomment(page,callback){
    $.ajax({
        type: "get",
        url: "/getcomment",
        data: {
            blogid:query.blogid,
            page
        },
        success: function (result) {
            let res = result.results
            callback(res)
            document.querySelector('.commentbox').innerHTML = ''
            $('#replynum')[0].textContent = res[1][0].total + '回复'
            res[0].forEach((item,index)=>{
                $('.commentbox').append(`
                <div class="commentitem clearfix">
                    <a href="" class = "portraitbox">
                        <img class="portrait" src="${item.portrait}" alt="头像">
                    </a>
                    <div class="commentbody">
                        <div>
                            <span style="font-size: 12px;font-weight: 700;color: #666;text-decoration: none;">${item.username}</span>
                            <span style="font-size: 11px;text-decoration: none;color: #666;">${((page - 1) *6) + (index + 1)}楼</span>
                            <span style="font-size: 11px;text-decoration: none;color: #666;">${item.comment_time}</span>
                        </div>
                        <div>
                            <p>${item.comment_content}</p>
                        </div>
                    </div>
                    <div class="delete" style="display: ${item.showdelete ? 'block' : 'none'}" data-commentid="${item.commentid}" onclick="deletecomment(event)">删除</div>
                </div>
                `)
            })
            

        }
    });
}