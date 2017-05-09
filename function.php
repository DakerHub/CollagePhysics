<?php
    function load_post() {
        // 如果 action ID 是 load_post, 并且传入的必须参数存在, 则执行响应方法
        if($_GET['action'] == 'load_post' && $_GET['id'] != '') {
            $id = $_GET["id"];
            $output = '';
            
            // 获取文章对象
            global $wpdb, $post;
            $posts = get_posts(array('category'=>$id));
            foreach($posts as $post){
                // 如果指定 ID 的文章存在, 则对他进行格式化
                if($post) {
                    $title = $post->post_title;
                    $content = $post->post_content;
                    $output = balanceTags($content);
                    $output = wpautop($output);
                }
                // 打印文章内容并中断后面的处理
                
                echo '<div class="content-post"><h2 class="post-title">'.$title.'</h2><div class="post-content">'.$output.'</div></div>';
            }
            die();
        }
    }
    // 将接口加到 init 中
    add_action('init', 'load_post');
?>