/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*global $ document*/
$(document).ready(function() {

  
  const createTweetElement = function(tweetObject) {
    let $tweet =
    `<article class="tweet-article"> 
          <header>
            <div class="tweet-user">
              <img src="${tweetObject.user.avatars}">
              <h3>${tweetObject.user.name}</h3>
            </div>
            <h4>${tweetObject.user.handle}</h4>
          </header>
          <p>${tweetObject.content.text}</p>
          <hr>
          <footer>
            <h5>${timeago.format(tweetObject.created_at)}</h5>
            <div id="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`;
    return $tweet;
  };

  const renderTweets = function(arrayOfTweets) {
    for (let tweetObject of arrayOfTweets) {
      const $tweet = createTweetElement(tweetObject);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: data => renderTweets(data)
    });
  };

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const formData = $("#new-tweet-form").serialize();
    
    if ($('#tweet-text').val() === "") {
      return alert('Cannot submit empty tweet, tell us: What are you humming about?');
    };

    if ($('#tweet-text').val().length > 140) {
      return alert('Cannot submit tweet above 140 characters try shortening and submit again!');
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: () => {
        loadTweets();
        $('#new-tweet-form')[0].reset();
      }
    });
  
  });

  loadTweets();

});