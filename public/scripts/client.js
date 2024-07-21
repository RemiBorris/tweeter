/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*global $ document timeago*/
$(document).ready(function() {

  // Below code creates the tweet element in steps

  // We start by creating the footer element of the tweet element which includes timestamps and icons
  const createTweetFooter = function(timestamp) {
    let footer = $(`<footer>`);
    let h5 = $(`<h5>`);

    h5.text(timeago.format(timestamp));
    footer.append(h5);

    let icons = $(`
      <div id="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>`);

    footer.append(icons);
    return footer;
  };

  // We then create the header of the tweet which includes the username, avatar and handle
  const createTweetHeader = function(user) {
    let header = $(`<header>`);
    let avatar = $(`<img>`);
    let div = $(`<div class="tweet-user">`);
    let h3 = $(`<h3>`);
    let handle = $(`<h4>`);
    avatar.attr(`src`,user.avatars);
    div.append(avatar);
    h3.text(user.name);
    div.append(h3);
    header.append(div);
    handle.text(user.handle);
    header.append(handle);

    return header;
  };

  // Lastly the each element is  added together in order to form the entire tweet with the header, content and footer
  const createTweetElement = function(tweetObject) {
    let article = $(`<article class="tweet-article">`);
    let content = $(`<p>`);
    content.text(tweetObject.content.text);
    article.append(createTweetHeader(tweetObject.user));
    article.append(content);
    article.append($(`<hr>`));
    article.append(createTweetFooter(tweetObject.created_at));
    return article;
  };

  // Function to loop through the database to add each tweet to the web page
  const renderTweets = function(arrayOfTweets) {
    for (let tweetObject of arrayOfTweets) {
      const tweet = createTweetElement(tweetObject);
      $('#tweets-container').prepend(tweet);
    }
  };

  // We ensure that no error message is on the page to begin
  $('#error-message').hide();

  // Function used to create a GET to the database to return the tweets
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: data => {
        $('#new-tweet-form')[0].reset();
        renderTweets(data);
      }
    });
  };

  // Below is triggered when we "submit" the tweet by pressing the tweet button
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const formData = $("#new-tweet-form").serialize();
    
    // Verify if the conditions are met for character counts
    if ($('#tweet-text').val() === "") {
      $('#error-message').text('⚠ Too short. Plz rspct our mandatory minimum of 1 char. #kthxbye. ⚠');
      $('#error-message').show(400);
      return;
    }

    if ($('#tweet-text').val().length > 140) {
      $('#error-message').text('⚠ Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye. ⚠');
      $('#error-message').show(400);
      return;
    }

    // Reset the form so we do not accidentaly submit the form twice
    $('#new-tweet-form')[0].reset();

    // Create a POST request to the server to submit our tweet, once successful hide any error messages and reload the tweets
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: () => {
        loadTweets();
        $('#error-message').hide(300);
        $('#error-message').empty();
        $('.counter').text(140);
      }
    });
  
  });

  loadTweets();

});