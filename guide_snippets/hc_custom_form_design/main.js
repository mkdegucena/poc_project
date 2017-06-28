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
