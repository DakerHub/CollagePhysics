jQuery(function($){
    var util = new Util();
    function Util(){
        var $navTags = $(".nav-tag"),
            $container = $(".container");
        this.init = function(){
            this.bindEvent();
        };
        this.bindEvent = function(){
            $navTags.click(function(e){
                e.preventDefault();
                // 改变内容区域的src属性
                var $this = $(this);
                var src = $this.attr("herf");
                $container.attr("src",src);
                // 改变导航标签的样式
                $(".nav-tag.active").removeClass("active");
                $this.addClass("active");
            })
        }
    }
});