jQuery(function($){
    window.slider = new Slider();
    function Slider(){
        var $container = $("#slideShow"),
            $parent = $container.parent(),
            wrapperW = $parent.width(),
            $imgs = $container.find("img"),
            $lis = $container.find("li"),
            $firstImg = $imgs.eq(0),
            $lastImg = $imgs.eq($imgs.length-1),
            $prev = $(".slidePrev"),
            $next = $(".slideNext"),
            $ul = $container.find(".imgList"),
            defaultOpt = {
                width: $firstImg.width(),
                height: $firstImg.height(),
                auto: true,
                duration: 500
            };
        this.curIdx = 0;
        this.opt = null;
        this.init = function(option){
            var _this = this;
            // 默认参数和用户参数合并
            this.opt = $.extend({},defaultOpt,option);
            this.setPosition();
            this.bindEvent();
        };
        this.setPosition = function(){
            var opt = this.opt;
            $container.width(opt.width).height(opt.height);
            $lis.each(function(i){
                $(this).width(opt.width).height(opt.height);
            });
            $ul.height(opt.height).width(opt.width*$lis.length);
            $container.css("margin-left",parseInt((wrapperW-opt.width)/2));
            $prev.css({
                left: 0,
                top: opt.height/2 - 10,
                width: 40,
                height: 40
            })
            $next.css({
                right: 0,
                top: opt.height/2 - 10,
                width: 40,
                height: 40
            })
        };
        var lock = false;
        this.bindEvent = function(){
            var _this = this;
            $(".slidebtn").click(function(e){
                e.preventDefault();
                if(!lock){
                    lock = true;
                    var $btn = $(this);
                    var originLeft = parseInt($ul.css("left"));
                    if($btn.hasClass("slidePrev")){
                        // 前一张
                        if(originLeft == 0){
                            lock = false;
                        }else{
                            _this.slideAnimation(originLeft,"right");
                        }
                    }else{
                        // 后一张
                        if(originLeft == -_this.opt.width*($lis.length-1)){
                            lock = false;
                        }else{
                            _this.slideAnimation(originLeft,"left");
                        }
                    }
                }
            });
        };
        this.slideAnimation = function(originLeft,dir){
            var _this = this;
            var opt = this.opt;
            var curLeft = parseInt($ul.css("left"));
            var step = 0;
            var diff = 0;
            setTimeout(function(){
                if(dir == "left"){
                    step = -30;
                    diff = -opt.width;
                }else{
                    step = 30;
                    diff = opt.width;
                };
                $ul.css("left",curLeft + step);
                if(Math.abs(curLeft - originLeft - diff) <= Math.abs(step)){
                    setTimeout(function(){
                        $ul.css("left",originLeft + diff);
                        lock = false;
                    },20);
                }else{
                    _this.slideAnimation(originLeft,dir);
                }
            },20);
        }
    }
    
    
})