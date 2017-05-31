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
    
});
