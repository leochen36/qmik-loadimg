图片懒加载框架
依赖于[Qmik](https://github.com/leochen36/qmik)
使用:

<html>
<body>
    <img class="lazy" _src="http://xxx.com/a.png"/>
    <img class="lazy" _src="http://xxx.com/b.png"/>
    <img class="lazy" _src="http://xxx.com/b.png"/>
</body>
</html>

//说明:把需要懒加载的 img标签 的class 要包含 lazy, 包含_src图片地址
$.use("http://xxx.xxx/qmik-loadimg.js", function(Load){
    Load.load();
})
