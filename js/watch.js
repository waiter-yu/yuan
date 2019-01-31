$(function () {
    // 订单id
    // var orderId = location.search.substr(1);
    var orderId = GetQueryString("orderId");
    var dashiID = GetQueryString("id");
    // 查询聊天记录
    $.ajax({
        url: 'dialogue/getByOrderId',
        type: 'get',
        data: {
            orderId: orderId,
            pageNumber: 1,
        },
        success: function (res) {
            console.log(res);
            res.url = baseurl;
            res.data.content = res.data.content.reverse()
            res.data.content.forEach((v,i)=>{
                if(v.contentType===1){
                    v.content=gif(v.content)
                }
            })
            console.log(res);
            
            var html = template('list', { list: res })
            $('.view').append(html)
            ImgInfo()
            $('.view').scrollTop($('.view')[0].scrollHeight);

        }
    })

    //查询大师名字
    $.ajax({
        url: 'master/getMasterInfo/' + dashiID,
        type: 'get',
        success: function (data) {
            console.log(data);
            $('h1').text(data.data.nickname)
        }
    })
    // var orderId = 87;
    // 从永久储存获取用户id
    var config = localStorage.getItem("yuan_messige");
    var info = JSON.parse(config || '[]')
    console.log(info);

    if (info.length === 0 || info.code === "13") {
        // mui.toast("请先登录");
        setTimeout(function () {
            location.href = "../index.html"
        }, 2000)
        return
    }
    var userID = info.data.id
    // socket----------------------------------------------------------
    // var socket;
    // if (window.WebSocket) {
    //     socket = new WebSocket(watchurl);
    //     //当接收到信息时
    //     socket.onmessage = function (event) {
    //         var res = JSON.parse(event.data);
    //         console.log(res);
            
    //         if (res.code == "12") {
    //             socket.onclose();
    //             alert(res.msg)
    //             location.href="../index.html"
    //             return;
    //         }
    //         switch (res.snedType) {
    //             //通讯回复
    //             case 0: systenMsg(res); break;
    //             //私发
    //             case 1: privateMsg(res); break;
    //             //群发
    //             case 2: publicMsg(res); break;
    //             default:
    //                 alert("snedType非法")
    //                 return;
    //         }
    //     }
    //     socket.onopen = function (event) {
    //         // alert("连接成功");
    //         // console.log(watchurl);
    //     };
    //     //当客户端收到服务端发来的关闭连接
    //     socket.onclose = function (event) {
    //         // $('.prompt').show();
    //     };
    // } else {
    //     alert("Your browser does not support Websockets. (Use Chrome)");
    // }

    /*** 渲染*/
    function apply(temp){
        var html = template('watch', { content: temp })
        $('.view').append(html)
        $('.view').scrollTop($('.view')[0].scrollHeight);
        ImgInfo();
    }



    /***系统通讯*/
    function systenMsg(data) {
        if (data.code == "0" && data.data != null && data.data != undefined) {
            systemSuccessMsg(data.data);
        } else {
            systemErrorMsg(data);
        }
    }

    /***系统成功 */
    function systemSuccessMsg(data) {
        if (data.msgType === 3) {
            var temp = {
                url: baseurl,
                speaker: true,
                userId: data.sendId,
                sendType: 3,
                src: data.msg
            }
            apply(temp); 
        }else if(data.msgType === 2){
            var temp = {
                url: baseurl,
                speaker: true,
                userId: data.sendId,
                sendType: 2,
                src: data.msg
            }
            apply(temp);
        }
    }

    /***系统失败带code */
    function systemErrorMsg(res) {
        if(res.code == "1000"){
            $('.prompt').show();
        }else{
            var html = template('hiht', { res: res })
            $('.view').append(html)
            if(res.code == "11"){
                setTimeout(function () {
                    location.href = "../index.html"
                },2000) 
            }    
        }   
    }

    /**私人 */
    function privateMsg(data) {
        if (data.code == "0") {
            if(data.data.orderId != orderId){
                return;
            } 
            switch (data.data.msgType) {
                case 1: privateTextMsg(data.data); break;
                case 2: privateImgMsg(data.data); break;
                case 3: privateVoiceMsg(data.data); break;
                case 4: privateVideoMsg(data.data); break;
                default:
                    alert("未知消息类型.");
                    return;
            }
            return;
        }
        alert("不知道怎么回事发个失败的给我!")
    }


    /*** 私发文字 */
    function privateTextMsg(data) {
        let info=gif(data.msg)
        var temp = {
            url: baseurl,
            speaker: false,
            userId: data.sendId,
            msg: info,
            sendType: 1
        }
        var html = template('watch', { content: temp })
        console.log(html);
        $('.view').append(html)
        $('.view').scrollTop($('.view')[0].scrollHeight);
    }

    /*** 私发图片*/
    function privateImgMsg(data) {
        var temp = {
            url: baseurl,
            speaker: false,
            userId: data.sendId,
            sendType: 2,
            src: data.msg
        }
        apply(temp);
    }

    /*** 私发音频 */
    function privateVoiceMsg(data) {
        var temp = {
            url: baseurl,
            speaker: false,
            userId: data.sendId,
            sendType: 3,
            src: data.msg
        }
        apply(temp);
    }
    /*** 私发视频*/
    function privateVideoMsg(data) {
        alert("暂无视频消息.");
    }

    /**群发 */
    function publicMsg(data) {
        console.log(data);
    }



    // function send(message) {
    //     if (!window.WebSocket) {
    //         return;
    //     }
    //     if (socket.readyState == WebSocket.OPEN) {
    //         // socket.send(message);
    //     } else {
    //         alert("网络断开,请重新连接");

    //     }
    // }
    // --------------------------------------------------------------------

    // var orderId = GetQueryString("orderId");
    var pageNumber = 1;

    // 输入框回车事件
    $("#text").on('keypress', function (e) {    //#keyword为input文本框
        var keycode = e.keyCode;
        if (keycode == '13') {
            sendmsg()
            $('.view').scrollTop($('.view')[0].scrollHeight);
            $('.sendmsg').hide();
            $('.show').show();
        }
    });
    //点击发送
    $('.sendmsg').on('click', function () {
        sendmsg();
        $('.view').scrollTop($('.view')[0].scrollHeight);
        $('.sendmsg').hide();
        $('.show').show();
    })
    //焦点
    $('#text').focus(function () {
        $('.tool').hide();
        $('.imgs').hide();
    })
    //监听输入框，关系工具栏目
    $('#text').keyup(function () {
        console.log(1);

        var length = $('#text').val().length
        console.log(length);

        if (length >= 1) {
            $('.sendmsg').show();
            $('.show').hide();
        } else {
            $('.sendmsg').hide();
            $('.show').show();
        }

    })
    //失去焦点
    $('#text').blur(function () {
        // $('.show').show();
        //    setTimeout(function(){
        //         $('.sendmsg').hide();
        //    },1000)
    })
    //点击语音按钮切换
    $('.voice').on('click', function () {
        $(this).hide();
        $('.keyboard').show();
        $('.send').show();
        $('#text').hide();
        $('.tool').hide();
        $('.imgs').hide();
        $('sendmsg').hide();
    })
    $('.keyboard').on('click', function () {
        $(this).hide();
        $('.keyboard').hide();
        $('.send').hide();
        $('#text').show();
        $('.voice').show();
        $('.tool').hide();
        $('.imgs').hide();
    })
    //点击切换
    $('.show').on('click', function () {
        $('.tool').toggle()
        $('.imgs').hide()
    })
    // //点击语音
    $('.send').on('touchstart', function (e) {
        e.preventDefault();
        $(this).addClass("link")
        console.log("按下");
        $('.tool').hide();
        // 开始录音--------------------------
        wx.startRecord({
            cancel: function () {
                alert('拒绝授权录音');
            }
        });
    })
    //点击表情
    $('.face').on('click', function () {
        $('.imgs').toggle();
        $('.tool').hide();
        $('keyboard').show();
        $('#text').show();
        $('.send').hide();
        var length = $('#text').val().length
        console.log(length);

        if (length >= 1) {
            $('.show').hide()
        }
    })
    $('.imgs>ul>li>a').on('click', function () {
        var emm = $(this).attr('data-emoji_code')
        var text = $('#text').val();
        console.log(text + emm);
        $('#text').val(text + emm)
        $('#text').blur()
        console.log(emm);
        $('.show').hide();
        $('.sendmsg').show();
    })
    //手指从屏幕拿起的时候触发
    $('.send').on('touchend', function () {

        // 3 智能接口
        var voice = {
            localId: '',
            serverId: ''
        };
        $(this).removeClass("link")
        console.log("拿起");
        //停止录音
        wx.stopRecord({
            success: function (res) {
                voice.localId = res.localId;
                // alert(JSON.stringify(res));
                // 渲染页面部分------------------------------------------------
                var temp = {
                    url: baseurl,
                    speaker: true,
                    userId: userID,
                    sendType: 2
                }
                //上传语音
                wx.uploadVoice({
                    localId: voice.localId,
                    success: function (res) {
                        console.log(res);

                        var msg = res.serverId;
                        var data = {
                            msg: msg,
                            orderId: orderId,
                            msgType: 3,
                            os: 1
                        }
                        var d = JSON.stringify(data)
                        // send(d)
                        //上传图片id
                        // $.ajax({
                        //     url: "dialogue/weChat/sned", type: "post", data: data, success: function (res) {
                        //         alert(JSON.stringify(res))
                        //     }, error: function (res) {
                        //         alert(JSON.stringify(res))
                        //     }
                        // })
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });

    })

    // //点击照片
    $(".photo").on('click', function () {
        console.log(3);

        // 5 图片接口
        // 5.1 拍照、本地选图
        var images = {
            localId: [],
            serverId: []
        };
        wx.chooseImage({
            success: function (res) {
                $('.tool').hide();
                images.localId = res.localIds;
                alert('已选择 ' + res.localIds.length + ' 张图片');
                // 上传照片
                wx.uploadImage({
                    localId: images.localId[0],
                    success: function (res) {
                        var msg = res.serverId;
                        // alert(JSON.stringify(res));
                        var d = {
                            msg: msg,
                            orderId: orderId,
                            msgType: 2,
                            os: 1
                        }
                        var data = JSON.stringify(d)
                        send(data)
                        //上传图片id
                    },
                    fail: function (res) {
                        // document.write(JSON.stringify(res))
                        alert(JSON.stringify(res));
                    }
                });
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    })
    // $('.prompt').hide();
    //弹出框关闭
    $('#hide').on('click', function () {
        $('.prompt').hide();
        $('footer').hide();
    })
    //评价框
    $('#evaluate').on('click', function () {
        location.href = "user/evaluate.html?masterId=" + dashiID + "&orderId=" + orderId
    })
    //点击返回
    $('.mui-action-back').on('click', function () {
        var html = $('.view').html();
        localStorage.setItem(dashiID, html)
        location.href = "../index.html"
    })

    function ImgInfo() {
        $('.view').on('click', '.photos', function () {
            var nowImgurl = $(this).attr('src');
            var lgimg=nowImgurl.replace(/order/g, "original/order")
            $('#yl').attr("src", lgimg)
            $('#yl').removeClass('disno');
            $('#yl').on('click', function () {
                $(this).addClass('disno');
            })
        })
        var playing = false;
        $('.view').on('click', '.chat-r', function () {
            var audio = $(this).find("audio")[0]
            var imggif = $(this).find("img")
            if (playing) {
                playing = false;
                audio.pause();
                imggif.attr('src', '../images/cutterman/dialogbox_voice03@2x.png')
                return;
            }
            playing = true;
            audio.play();
            
            imggif.attr('src', '../images/cutterman/bf-r.gif')
            audio.onended = function () {
                imggif.attr('src', '../images/cutterman/dialogbox_voice03@2x.png')
            };
        })
        $('.view').on('click', '.chat-l', function () {
            var audio = $(this).find("audio")[0]
            var imggif = $(this).find("img")
            if (playing) {
                playing = false;
                audio.pause();
                imggif.attr('src', '../images/cutterman/dialogbox_voice03_3@3x.png')
                return;
            }
            playing = true;
            audio.play();
           
            imggif.attr('src', '../images/cutterman/bf-l.gif')
            audio.onended = function () {
                imggif.attr('src', '../images/cutterman/dialogbox_voice03_3@3x.png')
            };
        })
    }
    function sendmsg() {
        var info = $('#text').val().trim();
        if (info === "") {
            return
        }
        var g = gif(info)
        console.log(g);

        // let str = $(g)
        // console.log(str)
        var temp = {
            // url: baseurl,
            speaker: true,
            userId: userID,
            sendType: 1
        }
        var data = {
            msgType: 1,
            os: 1,
            orderId: orderId
        }
        // var data = {
        //     // msg: content,
        //     msgType: 2,
        //     os: 1,
        //     orderId: orderId
        // }
        //获取输入框内容
        var content = $("#text").val();
        data.msg = info
        // data.msg = "3Uzy5bCb-rGuOhe2jkpLGPjhtMIzBR2GITMliFJOuo2FdSIDzXV6eCTnpXpKVjll"
        var d = JSON.stringify(data)
        console.log(d);

        // send(d)
        // 渲染页面
        temp.msg = g;
        console.log(temp);
        
        var html = template("watch", { content: temp })
        $('.view').append(html)
        $('#text').val('')
    }
    $('.photos').on('click', function () {
        var nowImgurl = $(this).attr('src');
        $('#yl').attr("src", nowImgurl)
        $('#yl').removeClass('disno');
        $('#yl').on('click', function () {
            $(this).addClass('disno');
        })
    })
})

//获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function gif(str) {
    var regex = /\[\:(.+?)\]/g;
    var result;
    var arr = []
    while ((result = regex.exec(str)) != null) {
        arr.push(result[1])
    }
    // console.log(arr);
    arr.forEach(val => {
        str = str.replace(`[:${val}]`, `<img src="../images/qq/${val}.gif">`)
    })
    return str
}


