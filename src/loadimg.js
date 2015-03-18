/**
 *图片懒加载模块
 * 依赖Qmik版本:2.1
 */
(function ($) {
    var win = window,
        interval = 50;//时间间隔
    if (!$.isQmik) {
        console.error("没有引入依赖框架Qmik,请引入Qmik2.1以上的版本")
    }
    if (parseFloat($.version) < 2.1) {
        console.error("依赖Qmik版本2.1")
    }
    function initScroll() {
        var loadIndex = 0;
        var prevTime = new Date().getTime();

        function handle(e) {
            var curTime = new Date().getTime();
            if (curTime - prevTime < interval) {
                return;
            }
            prevTime = curTime;
            noCheckLoad();
        }
        function noCheckLoad(){
            var oldIndex = loadIndex;
            loadIndex++;

            var lazys = document.querySelectorAll('img.lazy');
            var length = lazys.length;
            for (var i = 0; i < length; i++) {
                if (oldIndex + 1 != loadIndex) {
                    break;
                }
                var zlazy = $(lazys[i]);
                if (zlazy.inViewport()) {
                    load(zlazy);
                }
            }
        }
        $(win).on({
            scroll: handle,
            viewport: noCheckLoad
        })
    }


    function load(mimg) {
        if (mimg.attr('loaded')) return;
        var img = new Image(),
            url = $.trim(mimg.attr('_src'));
        if (!/^\w+/.test(url)) {
            return
        }
        img.onload = function () {
            mimg.attr('src', url).rmClass('lazy').rmClass("loading").rmAttr("_src");
            delete img;
        };
        img.onerror = function () {
            mimg.rmClass('lazy').rmClass("loading").rmAttr("_src");
            delete img;
        };
        img.src = url;
        mimg.attr('loaded', true);
    }

    var Load = {
        load: function () { //开始懒加载图片
            $.delay(function () {
                $(win).emit("scroll");
            }, interval + 10);
        }
    };
    $(win).on({
        DOMNodeInserted: function (e) {
            var dom = e.target;
            if (dom.tagName == "IMG") {
                var zlazy = $(dom);
                if (zlazy.hasClass("lazy") && zlazy.inViewport()) {
                    load(zlazy);
                }
            }
        }
    });
    $(function () {
        initScroll();
        $.delay(Load.load, 100);
        $.delay(Load.load, 1600);
    });

    $.define("qmik/loadimg", function (require, exports, module) {
        module.exports = Load;
    });
})(Qmik);