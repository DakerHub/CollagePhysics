<?php
include("../../../wp-load.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/slider.css">
    <link rel="stylesheet" href="css/home.css">
    <title>Home</title>
</head>
<body>
    <!--轮播图开始-->
    <div id="slideShow">
        <ul class="imgList">
    <?php
        $args = array( 'category_name' => 'news');
        $pages = get_posts($args);
        foreach($pages as $page):?>
            <?php if(!empty($page-> ID)): ?>
                <li><img src="<?php echo get_post_meta($page-> ID,"cover",true) ?>" alt=""><a href="#" class="slider-tilte"><?php echo $page-> post_title ?></a></li>
            <?php endif ?>
    <?php endforeach ?>
        </ul>
        <img src="images/toleft.png" alt="" class="slidebtn slider-prev">
        <img src="images/toright.png" alt="" class="slidebtn slider-next">
    </div>
    <!--轮播图结束-->
    <!--资源更新开始-->
    <div class="wp-resource">
        <div class="resource-title">Resources</div>
        <a href="#" class="resource-more">more...</a>
        <div class="resources">
        <?php
            $args = array( 'category_name' => 'resource','posts_per_page' => 6);
            $resources = get_posts($args);
            foreach($resources as $resource):?>
                <a href="#" data-id="<?php echo $resource-> ID ?>"><?php echo $resource-> post_title ?></a>
        <?php endforeach ?>
        </div>
    </div>
    <!--资源更新结束-->
    <!--教学通知开始-->
    <div class="wp-announcement">
        <div class="announcement-title">Announcement</div>
        <a href="#" class="announcement-more">more...</a>
        <div class="announcements">
        <?php
            $args = array( 'category_name' => 'announcement','posts_per_page' => 6);
            $announcements = get_posts($args);
            foreach($announcements as $announcement):?>
            <a href="#" data-id="<?php echo $resource-> ID ?>"><?php echo $announcement-> post_title ?></a>
        <?php endforeach ?>
        </div>
    </div>
    <!--教学通知结束-->
    <script src="../../../wp-includes/js/jquery/jquery.js"></script>
    <script src="js/slider.js"></script>
    <script>
        jQuery(function($){
            slider.init({
                width: 800,
                height: 500
            });
            var interval = 0;
            interval = setInterval(function(){
                $(".slider-next").click();
            },6000);
            $("#slideShow").hover(function () {
                    // over
                    clearInterval(interval);
                }, function () {
                    // out
                    interval = setInterval(function(){
                        $(".slider-next").click();
                    },6000);
                }
            );
        });
    </script>
</body>
</html>