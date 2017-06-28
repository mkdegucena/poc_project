// header sticky start
var $header = $(".header-wrapper"),
  	$clone = $header.before($header.clone().addClass("clone"));

$(window).on("scroll", function() {
	var fromTop = $(window).scrollTop();
	$(".header-wrapper.clone").toggleClass("down", (fromTop > 100));
});
// header sticky end