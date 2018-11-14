$(function () {
    //搜索框获取焦点
    $('#search').focus(function () {
        $('.my-scroll').hide();
        $('.screen').hide();
        $('.list').hide();
        $('#close').show();
        $('.history').show();
        //获取本地储存，搜索记录
        var history2 = JSON.parse(localStorage.getItem('y_history'))
        // 记录长度限制20条
        if (history2.length > 20) {
            history2.splice(-1, 1);
        }
        var html = template('history', { arr: history2 })
        // console.log(html);

        $('.jilu').html(html)

    })
    // 点击关闭搜索框
    $('#close').on('click', function () {
        $('#search').val('')
        $('.my-scroll').show();
        $('.screen').show();
        $('.list').show();
        $('#close').hide();
        $('.history').hide();
    })
    // 输入框回车事件
    var History = [];
    $("#search").on('keypress', function (e) {    //#keyword为input文本框
        var keycode = e.keyCode;
        // var arr = [];
        if (keycode == '13') {
            submit();
        }
    });
    //点击清空历史记录
    $('.clear').on('click', function () {
        console.log(123);
        localStorage.clear('y_history')
        $('.jilu').html('')
    })
    //历史记录点击
    $('.jilu').on('click', 'span', function () {
        var content = $(this).html()
        $('#search').val(content)
        submit();
    })
    //综合排序
    $('#zonghe').on('click',function(){
        if($('#zonghe>i').hasClass('icon-paixujiantouxia')){
            $("#zonghe>i").addClass("icon-paixujiantoushang");
            $("#zonghe>i").removeClass("icon-paixujiantouxia");
        }else{
            $("#zonghe>i").removeClass("icon-paixujiantoushang");
            $("#zonghe>i").addClass("icon-paixujiantouxia");
        }
    })
    //价格排序点击
    $('#pic').on('click',function(){
        if($('#pic>i').hasClass('icon-paixujiantouxia')){
            $("#pic>i").addClass("icon-paixujiantoushang");
            $("#pic>i").removeClass("icon-paixujiantouxia");
        }else{
            $("#pic>i").removeClass("icon-paixujiantoushang");
            $("#pic>i").addClass("icon-paixujiantouxia");
        }
    })
       //服务量排序
    $('#fuwu').on('click',function(){
        if($('#fuwu>i').hasClass('icon-paixujiantouxia')){
            $("#fuwu>i").addClass("icon-paixujiantoushang");
            $("#fuwu>i").removeClass("icon-paixujiantouxia");
        }else{
            $("#fuwu>i").removeClass("icon-paixujiantoushang");
            $("#fuwu>i").addClass("icon-paixujiantouxia");
        }
    })
})
// 回车处理函数
function submit() {
    //获取本地储存
    var his = localStorage.getItem('y_history')
    var temp = JSON.parse(his || '[]')
    //获取输入的内容
    var searchName = $('#search').val();
    //当输入的内容不为空时，才添加历史记录
    if(searchName!==''){
        temp.unshift(searchName)
    }
   
    // 记录长度限制20条
    if (temp.length > 20) {
        console.log('大于20');
        
        temp.pop();
    }
    var arr=dedupe(temp)
    localStorage.setItem('y_history', JSON.stringify(arr))
    //   $('#search').val('')
    $('.my-scroll').show();
    $('.screen').show();
    $('.list').show();
    $('#close').hide();
    $('.history').hide();
    //使input失去焦点
    $("#search").blur()
}
//数组去重
function dedupe(array){
    return Array.from(new Set(array));
   }