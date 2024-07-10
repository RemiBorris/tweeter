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
            <h5>${tweetObject.created_at}</h5>
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
      $('#tweets-container').append($tweet);
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  renderTweets(data);
});