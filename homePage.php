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
    <script src="../../../wp-includes/js/jquery/jquery.js"></script>
    <script>
        // jQuery(function($){
        //     console.log();
        //     $(".container",window.parent.document).height($(document).height());
        // });
    </script>
</body>
</html>