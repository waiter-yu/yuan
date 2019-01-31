$(function () {
    console.log($('select').val());
    $("body").parent().css("overflow-y","hidden");
    //获取验证码
    $('.btncode').on('click', function () {
        var phone_txt = $("#phone").val().trim();
        var quhao = $('select').val()
        if (!checkPhone(phone_txt, /^1[34578]\d{9}$/)) {
            // mui 提示框
            mui.toast("手机非法");
            return;
        } else {
            $(".btncode").attr("disabled", "disabled");
            // 要到计的时间
            var times = 5;
            // 开启倒计时
            var timeId = setInterval(function () {
                times--;
                $(".btncode").text(times + "s重新发送");

                // 时间到了
                if (times == 0) {
                    clearInterval(timeId);
                    $(".btncode").text("获取验证码");
                    $(".btncode").removeAttr("disabled");
                }
            }, 1000);
        }
    })
    //点击支付
    $('.submit').on('click', function () {
        var name_txt = $("[name='username']").val().trim();
        var sex_txt = $("[name='sex']").val().trim();
        var time_txt = $("#result").html().trim();
        var code_txt = $("[name='code']").val().trim();
        var phone_txt = $("#phone").val().trim();
        if (name_txt == '') {
            // mui 提示框
            mui.toast("请输入姓名");
            return;
        }
        if (time_txt == '请输入你的出生日期') {
            // mui 提示框
            mui.toast("请选择你的出生日期");
            return;
        }
        // 判断验证码
        if (code_txt == '') {
            // mui 提示框
            mui.toast("请输入正确的验证码");
            return;
        }
        location.href="./watch.html"
    })


})
//验证手机号码合法性
function checkPhone(phone, expression) {
    if (!(expression.test(phone))) {
        return false;
    } else {
        return true;
    }
}

var CalendarData = new Array(100);
console.log(CalendarData);
var madd = new Array(12);
console.log(madd)
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
    return (m >> n) & 1;
}
function e2c() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }

    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true; break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}
// 月日
function GetcDateString() {
    var tmp = "";
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {

        tmp += monString.charAt(cMonth - 1);
    }

    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }
}





$(".btnTime").click(function () {
    $(".date").addClass("bg");
    $(".date").fadeIn();


})


$('.cancel').click(function () {
    $(".date").fadeOut();
    $(".date").removeClass("bg");

})

let getMonth = $('.getMonth').text();
let getDate = $('.getDate').text();
$('.navs li').click(function () {

    index = $(this).index();
    if (index == 1) {
       
        let MM = parseInt(getMonth);
        let DD = parseInt(getDate);
        console.log(MM,DD)
        var D = new Date();
        var yy = D.getFullYear();
       let time = GetLunarDay(yy, MM, DD)
      
       let m = time.substr(0,2);
        $('.getMonth').text(m);
        let d =time.substr(2)
        $('.getDate').text(d)
        $(this).addClass('dd').siblings().removeClass("dd");
    } else {
        console.log(getMonth,getDate)
        $('.getMonth').text(getMonth);
        $('.getDate').text(getDate)
        $(this).addClass('dd').siblings().removeClass("dd");
    }
})


// var D = new Date();
// var yy = D.getFullYear();

// var mm = D.getMonth() + 1;
// var dd = D.getDate();
// console.log(yy, mm, dd)
// var ww = D.getDay();
// var ss = parseInt(D.getTime() / 1000);
// if (yy < 100) yy = "19" + yy;
// console.log(GetLunarDay(2017, 2, 12))