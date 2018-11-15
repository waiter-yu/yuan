$(function(){
    $('.xin').raty({ score: 5 });
    //计算字数
    $("[name='evaluate']").keyup(function() {
        console.log(1);
        
        //    var val=$('#note2').val();
        //    var len=val.length;
        var len=this.value.length;
        $('.at').text(len);

        })
})

  