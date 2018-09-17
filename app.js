/* Create an array to hold our topics */

var topics = ["snowboarding", "saxophone", "World of Warcraft", "cats", "ice cream"]

function renderButtons() {

    // Deleting the topics prior to adding new topics

    $("#topic-buttons").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      var a = $("<button>");
      // Adding a class of topic-btn to our button
      a.addClass("topic-btn");
      // Adding some bootstrap styling to our buttons
      a.addClass("btn btn-info");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#topic-buttons").append(a);
    }

    $(".topic-btn").on("click", function() {
        // Grabbing and storing the data-name property value from the button
        var topic = $(this).attr("data-name");
    
        // Constructing a queryURL using the topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=GfgW3HIfgunf9WXYvn4VyZ5rQ20zze5l&limit=10";
    
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
    
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
    
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
    
              // Creating and storing a div tag
              var topicDiv = $("<div>");
    
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
    
              // Creating and storing an image tag
              var topicImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              topicImage.attr("src", results[i].images.fixed_height_still.url);
    
              // Appending the paragraph and image tag to the topicDiv
              topicDiv.append(p);
              topicDiv.append(topicImage);
    
              // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
              $("#gifs").prepend(topicDiv);
            }
          });
      }); 

}

  /* Calling the function to render buttons */
  renderButtons();


 

     // This function allows us to add new topics.
     $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#topic-input").val().trim();
    
        // Adding topic from the textbox to our array
        topics.push(newTopic);
    
        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });

