/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {


  $(".blocks-item-link").click(function(){
    $(this).next().slideToggle();
  });

  $('.search-full input[type="search"]').focusin(function(){
    $(".featured-article").slideToggle();
    $('.search-full input[type="search"]').attr('placeholder','');
  });

  $('.search-full input[type="search"]').focusout(function(){
    $(".featured-article").slideToggle();
    $('.search-full input[type="search"]').attr('placeholder','Search anything here...');
  });

  // header sticky start
  var $header = $(".header-wrapper"),
      $clone = $header.before($header.clone().addClass("clone"));

  $(window).on("scroll", function() {
    var fromTop = $(window).scrollTop();
    $(".header-wrapper.clone").toggleClass("down", (fromTop > 100));
  });
  // header sticky end

  $('.search-full input[type="search"]').attr('placeholder','Search anything here...')

  if ( $(".zd-form").length) {

    // set a mapping
    var objTicketMap = {};

    $("#request_issue_type_select option").each(function() {

      var urlVal = $(this).data("url");
      var htmlVal = $(this).html();
      var ticketVal = $(this).val();

      objTicketMap[ticketVal] = htmlVal;

      // make sure we don't display the empty one in the ticket form section
      if (htmlVal != "-"){
        $( ".zd-form" ).append( "<a class='zd-form-link' href='"+urlVal+"'><div class='zd-form-box'><h2>"+htmlVal+"</h2></div></a>");
      }
    });

    // hiding the ticket form
    if($("#request_issue_type_select").val() != "-"){
      $(".zd-form-box").hide();
      $(".zd-form h3").text(objTicketMap[$("#request_issue_type_select").val()]);
    }
  }


  // slider changer
  var sliderImage = [1,2,3];
  var silder = sliderImage[Math.floor(Math.random() * sliderImage.length)];

  $(".hero").css("background-image","url(//p13.zdassets.com/hc/theme_assets/1948714/115000014852/" + silder + ".jpg)");

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
      $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
      $requestCommentFields = $(".request-container .comment-container .comment-fields"),
      $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
      $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
      $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
    search();
  });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
});
