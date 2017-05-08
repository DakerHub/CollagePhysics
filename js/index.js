jQuery(function($){
    window.util = new Util();
    function Util(){
        var $navTags = $(".nav-tag"),
            $container = $(".container"),
            $wpcontainer = $(".wp-container"),
            $wpheader = $(".wp-header"),
            $wpfooter = $(".wp-footer"),
            _this = this;
        this.init = function(){
            this.bindEvent();
            // this.setFooterPosition();
        };
        /**
         * 设置footer的位置，保证页面撑满窗口
         */
        this.setFooterPosition = function(){
            var headerH = $wpheader.height(),
                containerH = $wpcontainer.height(),
                footerH = $wpfooter.height(),
                windowH = $(window).height();
            if(windowH > (headerH+containerH+footerH)){
                $wpfooter.css("margin-top",windowH-headerH-footerH-containerH);
            }else{
                $wpfooter.css("margin-top",0);
            }
        };
        /**
         * 事件绑定统一入口
         */
        this.bindEvent = function(){
            var _this = this;
            // 窗口重置事件
            window.onresize = function(){
                _this.setFooterPosition();
            }

            // 导航切换时间
            $navTags.click(function(e){
                e.preventDefault();
                // 改变内容区域的src属性
                var $this = $(this);
                var src = $this.attr("href");
                $container.attr("src",src);
                // 改变导航标签的样式
                $(".nav-tag.active").removeClass("active");
                $this.addClass("active");
            })
        };
        // 构造函数
        (function(){
            _this.init();
        })();
    }
});
function iFrameHeight() {   
    var ifm = document.getElementById("iframepage");   
    var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;   
    if(ifm != null && subWeb != null) {
        ifm.height = subWeb.body.scrollHeight;
    }
    util.setFooterPosition();
}  