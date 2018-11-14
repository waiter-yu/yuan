$(function () {
    //密码显示与隐藏
    $('.show').on('click', function () {
        $('.show').hide()
        $('.hide').show()
        $('[name="code"]').attr('type', 'password')
    })
    $('.hide').on('click', function () {
        $('.show').show()
        $('.hide').hide()
        $('[name="code"]').attr('type', 'text')
    })
    //登录

    $('#btn').on('click', function () {
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="pwd"]').val();
        var authCode = $('[name="code"]').val();
        console.log(mobile, password, authCode);
        var data = {
            mobile: mobile,
            password: password,
            authCode: authCode
        }
        $.ajax({
            url: "http://192.168.2.218:8186/user/create",
            type: "post",
            dataType: "json",
            data:data,
            success: function (data) {
                console.log(data);
                
            }
        })
    })

})