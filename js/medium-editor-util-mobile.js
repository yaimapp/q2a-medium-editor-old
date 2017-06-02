$(document).ready(function(){
    var warn_on_leave = false;
    // タイトル入力開始
    $('#title').keydown(function(){
        warn_on_leave = true;
    });
    
    // 本文入力開始
    $('.editable').keydown(function(){
        warn_on_leave = true;
    });
    
    // 投稿、保存ボタンは対象外
    $('input[type="submit"]').click(function(){
        warn_on_leave = false;
    });
    
    // inputでなくbuttonの場合も対象外
    $('button').click(function(){
        warn_on_leave = false;
    });
    
    // 画面遷移時のイベント
    var onBeforeunloadHandler = function(e) {
        if(warn_on_leave) {
            return warn_message;
        }
    };
    $(window).on('beforeunload', onBeforeunloadHandler);
    
    $('form').on('submit', function(e) {
        $(window).off('beforeunload', onBeforeunloadHandler);
    });
    
    // content欄にフォーカスが当たった時
    $('.editable').focusin( function(){
        var elemTop = $(this).offset().top;
        var scrollTop = $(".mdl-layout__content").scrollTop();
        var headerSpace = $('header').height();
        if($(this).attr('name') == 'a_content') {
            headerSpace = headerSpace + 90;
        } else {
            headerSpace = headerSpace + 20;
        }
        $(".mdl-layout__content").scrollTop(elemTop+scrollTop-headerSpace);
    });
});
