const width = ($(window).width() / 6) * 5;
$(document).ready(function () {
  $("#right").click(function () {
    $(window).scrollLeft($(window).scrollLeft() + width);
  });
  $("#left").click(function () {
    $(window).scrollLeft($(window).scrollLeft() - width);
  });
});
