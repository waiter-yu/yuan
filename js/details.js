$(function(){
    $('#attention').on('click',function(){
        mui.toast("关注成功");
        $(this).find('img').attr('src','../images/cutterman/introduction_icon_alreadypaidattentionto@2x.png')
    })
})