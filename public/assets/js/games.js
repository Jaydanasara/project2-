// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".update").on("click", function(event) {
    var id = $(this).data("id");
    var newwinner = {
      winner: $("#ca").val().trim(),
    
  
      
  };
  
    // Send the PUT request.
    $.ajax("/api/user_pick/" + id, {
      type: "PUT",
      data: newwinner
    }).then(
      function() {
        console.log("changed winner to", newWinner);
        // Reload the page to get the updated list
      
      }
    );
  });
  
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
  
    var pickedwinner = {
      winner: $("[name=team]:checked").val().trim()
      
    };
  console.log (pickedwinner);
    // Send the POST request.
    $.ajax("/api/user_pick/", {
      type: "POST",
      data: pickedwinner
    }).then(
      function() {
        console.log("created Winner");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  $(".delete-button").on("click", function(event) {
    var id = $(this).data("id");
  
    // Send the DELETE request.
    $.ajax("/api/user_pick/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log(" your choice has been deleted, select a new team!!! ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  });
