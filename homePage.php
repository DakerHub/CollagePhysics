<?php
include("../../../wp-load.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
</head>
<body>
    <?php
        $pages = get_posts();
        foreach($pages as $page):?>
            <?php if(!empty($page-> ID)): ?>
                <img src="<?php echo get_post_meta($page-> ID,"cover",true) ?>" alt="">
            <?php endif ?>
            <p><?php echo $page-> post_title ?></p>
    <?php endforeach ?>

   <div id="slideShow">
        <ul>
            <li><img src="images/2.jpg" width="480" height="300"></li>
            <li><img src="images/3.jpg"  width="480" height="300"></li>
            <li><img src="images/4.jpg"  width="480" height="300"></li>
        </ul>
        <a href="#" class="prev"><div class="slider-prev" style="color=#fff">&lt;</div></a> 
        <a href="#" class="next"><div class="slider-next" style="color=#fff">&gt;</div></a>
    </div>
    <script src="../../../wp-includes/js/jquery/jquery.js"></script>
    <script src="js/slider.js"></script>
    <script>
    </script>
</body>
</html>