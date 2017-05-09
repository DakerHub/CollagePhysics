jQuery(function ($) {
    $(".category-list").eq(0).addClass("active");
    $(".category-list").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var $link = $("this").find("a");
        var postId = $link.data("id");
        var title = $link.text();
        $(".active").removeClass("active");
        $(this).addClass("active");
        // 使用 AJAX 获取并处理文章内容
        jQuery.ajax({
            type: 'GET',
            url: '?action=load_post&id=' + postId,
            cache: false,
            dataType: 'html',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                // var html = '<div class="content-post">'+
                //         '<h2 class="post-title">'+title+'</h2>'+
                //         '<div class="post-content">'+data+'</div>'+
                //         '</div>';
                $(".content").empty().append($(data));
                },
            error: function (data) {
                }
        });
    });
});