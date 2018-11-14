$(function(){
        //获取验证码
        $('#code').on('click', function () {
            var phone_txt = $("[name='mobile']").val().trim();
            console.log(phone_txt);
            
            // var quhao= $('select').val()
             if (!checkPhone(phone_txt,/^1[34578]\d{9}$/)) {
                 // mui 提示框
                 mui.toast("手机非法");
                 return;
             } else {
                 $("#code").attr("disabled", "disabled");
                 // 要到计的时间
                 var times = 5;
                 mui.toast("发送验证码成功");
                 // 开启倒计时
                 var timeId = setInterval(function () {
                     times--;
                     $("#code").text(times + "s重新发送");
     
                     // 时间到了
                     if (times == 0) {
                         clearInterval(timeId);
                         $("#code").text("获取验证码");
                         $("#code").removeAttr("disabled");
                     }
                 }, 1000);
             }
         })
})
//验证手机号码合法性
function checkPhone(phone,expression) {
    if (!(expression.test(phone))) {
        return false;
    } else {
        return true;
    }
}