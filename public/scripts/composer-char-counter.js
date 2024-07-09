/*global $ document*/
$(document).ready(function() {

  // Set up the event listener for the textarea
  $('.new-tweet textarea').on('input', function() {
    let textLength = $(this).val().length;
    let remainingChars = 140 - textLength;

    // Use .closest and .find to target the counter element
    $(this).closest('form').find('.counter').text(remainingChars);

    // Change the color if character limit is exceeded
    if (remainingChars < 0) {
      $(this).closest('form').find('.counter').css('color', 'red');
    } else {
      $(this).closest('form').find('.counter').css('color', 'inherit');
    }
  });
});