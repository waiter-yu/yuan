// import code from '/lib/code.json';
$.ajax({
    url: "../lib/code.json",
    type: "get",
    dataType: "json",
    success: function (data) {
        // console.log(data)
        let codeJson = data;
        var picker = new mui.PopPicker();
        picker.setData(codeJson);
        $('#quhao').on('click', function () {
            picker.show(function (selectItems) {
                   console.log(selectItems[0].text);
                   console.log(selectItems[0].value); 
                $('#quhao').html("+"+selectItems[0].value)
            })
        })
    }
})
var picker = new mui.PopPicker();
$('#aa').on('click', function () {
    picker.show(function (selectItems) {
        console.log(selectItems[0].text);
        console.log(selectItems[0].value);
        $('#aa').html("+"+selectItems[0].value)
    })
})

