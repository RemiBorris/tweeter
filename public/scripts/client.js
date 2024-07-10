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

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const formData = $("#new-tweet-form").serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
    });
  });


  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: data => renderTweets(data)
    });
  };

  loadTweets();

});