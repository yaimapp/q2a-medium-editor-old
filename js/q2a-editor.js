$(function() {
  $('.qa-part-form .editable').focus(function(){
    var height = $(this).height();
    if (height <= 550) {
      $(this).animate({
        height: '550px',
      }, 'slow' );
    }
  });

  $('.qa-a-form .editable').focus(function(){
    var height = $(this).height();
    if (height <= 550) {
      $(this).animate({
        height: '550px',
      }, 'slow' );
    }
  });
  $('.qa-c-form .editable').focus(function(){
    var height = $(this).height();
    if (height <= 600) {
      $(this).animate({
        height: '600px',
      }, 'slow' );
    }
  });
});
