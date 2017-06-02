$(document).ready(function(){
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
