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