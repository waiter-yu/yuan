onload = function () {
      setHTML();

      // 为了在pc端更好的去调试
      onresize = function () {
        setHTML();
      }
  
      function setHTML() {
        // 基础值
        var baseVal = 100;
        // 设计稿的宽度
        var pageWidth = 750;
        // 要适配的屏幕的宽度?
        var screenWidth = document.querySelector("html").offsetWidth;
        // 要设置的fontsize
        var fontsize = screenWidth * baseVal / pageWidth;
        // 设置到html标签的中
        document.querySelector("html").style.fontSize = fontsize + "px";
      }
    }