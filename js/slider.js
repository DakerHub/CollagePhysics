jQuery(function($){
    window.slider = new Slider();
    function Slider(){
        var $container = $("#slideShow"),
            $parent = $container.parent(),
            wrapperW = $parent.width(),
            $imgs = $container.find(".imgList img"),
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
            var $firstLi = $lis.eq(0);
            var $lastLi = $lis.eq($lis.length-1);
            // 默认参数和用户参数合并
            this.opt = $.extend({},defaultOpt,option);
            $lastLi.clone().prependTo($ul);
            $firstLi.clone().appendTo($ul);
            $lis = $container.find("li");
            this.setPosition();
            this.bindEvent();
            window.onresize = (function(){
                var fun = null;
                if(typeof window.onresize == "function"){
                    fun = window.onresize;
                }else{
                    fun = function(){};
                }
                return function(){
                    fun();
                    $container.css("margin-left",parseInt(($("#slideShow").parent().width()-_this.opt.width)/2));
                }
            })();
        };
        this.setPosition = function(){
            var opt = this.opt;
            $container.width(opt.width).height(opt.height);
            $container.css("margin-left",parseInt((wrapperW-opt.width)/2));
            $lis.each(function(i){
                $(this).width(opt.width).height(opt.height);
            });
            $imgs.each(function(){
                $(this).width(opt.width).height(opt.height);
            });
            $ul.height(opt.height).width(opt.width*$lis.length).css("left",-opt.width);
            $(".slider-prev").css("margin-top",opt.height/2-32);
            $(".slider-next").css("margin-top",opt.height/2-32);
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
                    if($btn.hasClass("slider-prev")){
                    // 前一张
                        // 轮播动画处理
                        if(_this.curIdx == 0){//轮播图播到顶吗，切换到底
                            _this.curIdx = $lis.length - 3;
                            _this.slideAnimation(originLeft,"right",true);
                        }else{
                            _this.curIdx--;
                            _this.slideAnimation(originLeft,"right",false);
                        }
                    }else{
                    // 后一张
                        // 轮播动画处理
                        if(_this.curIdx == $lis.length - 3){//轮播图播到底，切换到顶
                            _this.curIdx = 0;
                            _this.slideAnimation(originLeft,"left",true);
                        }else{
                            _this.curIdx++;
                            _this.slideAnimation(originLeft,"left",false);
                        }
                    }
                }
            });
        };
        /**
         * 轮播图动画控制
         * @param {int} originLeft 初始ul的left值
         * @param {string} dir 轮播方向
         * @param {boolean} isEdge 是否是边界
         */
        this.slideAnimation = function(originLeft,dir,isEdge){
            var _this = this;
            var opt = this.opt;
            var curLeft = parseInt($ul.css("left"));
            var step = 0;
            var diff = 0;
            var curIdx = _this.curIdx;
            setTimeout(function(){
                if(dir == "left"){
                    step = -30;
                    diff = -opt.width;
                    if(isEdge){
                        curIdx = $lis.length - 2;
                    }
                    $lis.eq(curIdx).css({"opacity":"0","transition":"opacity .5s"});
                }else{
                    step = 30;
                    diff = opt.width;
                    if(isEdge){
                        curIdx = -1;
                    }
                    $lis.eq(curIdx+2).css({"opacity":"0","transition":"opacity .5s"});
                };
                $ul.css("left",curLeft + step);
                if(Math.abs(curLeft - originLeft - diff) <= Math.abs(step)){
                    setTimeout(function(){
                        if(isEdge){
                            if(dir == "left"){
                                $ul.css("left",-opt.width);
                            }else{
                                $ul.css("left",-opt.width*($lis.length-2));
                            }
                        }else{
                            $ul.css("left",originLeft + diff);
                        };
                        $lis.each(function(){
                            $(this).css({"opacity":1,"transition-duration":0});
                        });
                        lock = false;
                    },20);
                }else{
                    _this.slideAnimation(originLeft,dir,isEdge);
                }
            },20);
        }
    }
    
    
})