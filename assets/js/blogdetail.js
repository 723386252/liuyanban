function newreply() {
    document.querySelector('.replybox').style.display = 'block'
}
function closereply() {
    document.querySelector('.replybox').style.display = 'none'
}
function deletecomment(event) {
    console.log(event);
$.ajax({
    type: "get",
    url: "/commentdelete",
    data: {
        blogid:$('#blogid')[0].value,
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