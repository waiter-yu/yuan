// $(function () {

//     var BaseUrl = "url";
//     // 导入模板变量
//     template.defaults.imports.iconUrl = BaseUrl;
   
  
//     // 发送请求的个数
//     var ajaxNums = 0;
//     $.ajaxSettings.beforeSend = function (xhr, obj) {
//       obj.url = BaseUrl + "api/public/v1/" + obj.url;
//       ajaxNums++;
//     }
  
//     // 获得返回值之后会调用一次
//     $.ajaxSettings.complete = function () {
//       ajaxNums--;
//       if (ajaxNums == 0) {
//         // 最后一个请求了!!!
//       }
//     }
//   })