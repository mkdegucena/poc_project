  /*
     * jQuery v1.9.1 included
     */

  $(document).ready(function() {

    // do some javascript on the header
    if ($("#home-page").length === 0){
      $(".left-banner").hide();
      $(".logo").show();

      $('.left-banner ul li a, #user #user-name,.nav-wrapper a').css({'color':'#484848','font-weight':'bold'});
         /*
      $(".left-banner ul li a").mouseover(function() {
        $(this).css("color","#e4002b");
      }).mouseout(function() {
        $(this).css("color","#484848");
      });
      */
    }

    // change the placeholder of the search
    $('.search-full input[type="search"]').attr('placeholder','How can we help you?');

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
