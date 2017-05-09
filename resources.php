<?php
include("../../../wp-load.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/resource.css">
    <title>resources</title>
</head>
<body>
    <div class="container">
        <div class="wp-side-bar">
            <div class="side-bar">
                <ul>
                <?php
                    $categories = get_categories(array('hide_empty'=>0,'parent'=>9));
                    foreach($categories as $category):?>
                    <li class="category-list"><a href="#" title="<?php echo $category -> name ?>" data-id="<?php echo $category -> term_id ?>"><?php echo $category -> name ?></a></li>
                <?php endforeach?>
                </ul>
            </div>
        </div>
        <div class="wp-content">
            <div class="content">
                <?php
                    $firstCategory = $categories[0]-> name;
                    $posts = get_posts(array('category_name'=>$firstCategory));
                    foreach($posts as $post):?>
                    <div class="content-post">
                        <h2 class="post-title"><?php echo $post-> post_title ?></h2>
                        <div class="post-content"><?php 
                        $output = balanceTags($post-> post_content);
                        echo  wpautop($output) ?></div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
    </div>
    <script src="../../../wp-includes/js/jquery/jquery.js"></script>
    <script src="js/resource.js"></script>
</body>
</html>