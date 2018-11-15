// import code from '/lib/code.json';
$.ajax({
    url: "../lib/code.json",
    type: "get",
    dataType: "json",
    success: function (data) {
        $('#quhao').on('click', function () {
            $('.bj').removeClass('disno');
            var html = template('region', { arr: data })
            $('#regions').html(html)  
        })
    
    }
})

// 点击选择区号
$('#regions').on('click','li',function(){
    $('#quhao').text('+'+$(this).children("span:last-child").text())
    $('.bj').addClass('disno')
 })








// var picker = new mui.PopPicker();
// $('#aa').on('click', function () {
//     picker.show(function (selectItems) {
//         console.log(selectItems[0].text);
//         console.log(selectItems[0].value);
//         $('#aa').html("+" + selectItems[0].value)
//     })
// })

