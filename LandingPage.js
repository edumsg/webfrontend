var capitalize, conv_id, dm_conversation, isEmpty, list_id, user_id, username, users_added;

dm_conversation = 0;

users_added = 2;

list_id = 0;

user_id = 0;

username = "";

conv_id = 0;

$(document).ready(function() {
  if (isEmpty(localStorage.session)) {
    return noty({
      text: 'You are not signed in, please sign in',
      timeout: 2000,
      type: "error",
      theme: 'bootstrapTheme'
    });
  }
});

$(document).ready(function() {
  return $("#timeline").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "timeline",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var favorited, i, output, _i, _len, _ref;
        $("#timeline-container").empty();
        favorited = "fav";
        _ref = result.feeds;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.is_favorited) {
            favorited = "unfav";
          } else {
            favorited = "fav";
          }
          output = "<div class=\"row-fluid\"> <div class=\"col-sm-4 col-sm-offset-4\"> <div class=\"media timeline\"> <div class=\"media-left\"> <img class='media-object' src='" + i.creator.avatar_url + "' height='64' width='64'> </div> <div class=\"media-body\"> <h4 class='media-heading user-entry' id='user-" + i.creator.id + "' > " + (capitalize(i.creator.username)) + " (@" + i.creator.username + ")</h4> " + i.tweet_text + " </div> <button class='pull-right button-transparent " + favorited + "-tweet' type='button' id='tweet-fav-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-star'></i></button> <button class='pull-right button-transparent retweet-tweet' type='button' id='tweet-retweet-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> <button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box' type='button' id='tweet-reply-" + i.id + "'> <i style='font-size:1.5em;' class='fa fa-reply'></i></button> </div> </div> </div>";
          $("#timeline-container").append(output);
        }
        return $("#timeline-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'Tweet favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Tweet already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Retweet successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This tweet, is already retweeted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.reply-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12); }); </script>");
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-signout").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "logout",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        localStorage.session = null;
        return window.location.href = "SignUp.html";
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#create-tweet").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      tweet_text: $("#tweet-text").val(),
      method: "tweet",
      queue: "TWEET"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        $("#tweet-text").val("");
        noty({
          text: 'Tweet Sent!',
          timeout: 1500,
          type: "success",
          theme: 'bootstrapTheme'
        });
        return $(".tweet-box").modal('hide');
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#profile").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "my_profile",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        $('img[name=profile-image]').prop("src", result.user.avatar_url);
        $('input[name=name]').val(result.user.name);
        $('input[name=username]').val(result.user.username);
        $('input[name=email-1]').val(result.user.email.split("@")[0]);
        $('input[name=email-2]').val(result.user.email.split("@")[1]);
        $('input[name=language]').val(result.user.language);
        $('input[name=country]').val(result.user.country);
        $('input[name=bio]').val(result.user.bio);
        $('input[name=website]').val(result.user.website);
        $('input[name=overlay]').val(result.user.overlay);
        $('input[name=link_color]').val(result.user.link_color);
        $('input[name=avatar_url]').val(result.user.avatar_url);
        $('input[name=background_color]').val(result.user.background_color);
        return $('input[name=protected_tweets]').val(result.user.protected_tweets);
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#save-profile").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "update_user",
      queue: "USER",
      username: $('input[name=username]').val(),
      email: $('input[name=email-1]').val() + "@" + $('input[name=email-2]').val(),
      name: $('input[name=name]').val(),
      language: $('input[name=language]').val(),
      country: $('input[name=country]').val(),
      bio: $('input[name=bio]').val(),
      website: $('input[name=website]').val(),
      created_at: $('input[name=created_at]').val(),
      avatar_url: $('input[name=avatar_url]').val(),
      overlay: $('input[name=overlay]').val(),
      link_color: $('input[name=link_color]').val(),
      background_color: $('input[name=background_color]').val(),
      protected_tweets: $('input[name=protected_tweets]').val()
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        noty({
          text: 'Profile Saved!',
          timeout: 2000,
          type: "success",
          theme: 'bootstrapTheme'
        });
        return localStorage.username = $('input[name=username]').val();
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#my-tweets").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "user_tweets",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var favorited, i, output, _i, _len, _ref;
        $("#my-tweets-container").empty();
        favorited = "fav";
        _ref = result.tweets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.is_favorited) {
            favorited = "unfav";
          } else {
            favorited = "fav";
            output = "<div class=\"row-fluid my-tweet-" + i.id + "\"> <div class=\"col-sm-4 col-sm-offset-4\"> <div class=\"media my-tweet\"> <div class=\"media-left\"> <img class='media-object' src='" + i.creator.avatar_url + "' height='64' width='64'> </div> <div class=\"media-body\"> <h4 class=\"media-heading\"> " + (capitalize(i.creator.username)) + " (@" + i.creator.username + ") </h4> " + i.tweet_text + " </div> <button class='pull-right button-transparent delete-tweet' data-toggle='modal' data-target='.delete-tweet-box' type='button' id='tweet-delete-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent " + favorited + "-tweet' type='button' id='tweet-fav-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-star'></i></button> <button class='pull-right button-transparent retweet-tweet' type='button' id='tweet-retweet-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> </div> </div> </div>";
          }
          $("#my-tweets-container").append(output);
        }
        return $("#my-tweets-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'Tweet favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Tweet already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Retweet successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This tweet, is already retweeted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.delete-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(13); }); </script>");
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#notifications").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "get_mentions",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var i, output, _i, _len, _ref;
        $("#notifications-container").empty();
        _ref = result.mentions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          output = "<div class=\"row-fluid\"> <div class=\"col-sm-4 col-sm-offset-4\"> <div class=\"media timeline\"> <div class=\"media-left\"> <img class='media-object' src='" + i.creator.avatar_url + "' height='64' width='64'> </div> <div class=\"media-body\"> <h4 class=\"media-heading\"> " + (capitalize(i.creator.username)) + " (@" + i.creator.username + ") </h4> " + i.tweet_text + " </div> </div> <button class='pull-right button-transparent fav-tweet' type='button' id='tweet-fav-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-star'></i></button> <button class='pull-right button-transparent retweet-tweet' type='button' id='tweet-retweet-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> <button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box' type='button' id='tweet-reply-" + i.id + "'> <i style='font-size:1.5em;' class='fa fa-reply'></i></button> </div> </div>";
          $("#notifications-container").append(output);
        }
        return $("#notifications-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'Tweet favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Tweet already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Retweet successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This tweet, is already retweeted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.reply-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12); }); </script>");
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#messages").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "get_convs",
      queue: "DM"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var i, other, output, _i, _len, _ref;
        $("#messages-container").empty();
        other = '';
        _ref = result.convs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.lastDM.sender.name === localStorage.name) {
            other = i.lastDM.reciever.name;
          } else {
            other = i.lastDM.sender.name;
          }
          output = "<div class=\"media thread-" + i.id + "\" > <div class=\"media-left\"> <img class=\"media-object\" src='" + i.lastDM.sender.avatar_url + "' alt='DM Image' width='64' height='64'> </div> <div class=\"media-body thread\" id='thread-" + i.id + "' data-toggle='modal' data-target='.message' > <h4 class=\"media-heading\">" + other + "</h4> " + i.lastDM.dm_text + " </div> <button class='pull-right button-transparent delete-conversation' data-toggle='modal' data-target='.delete-conv-box' type='button' id='conv-delete-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-trash'></i></button> </div>";
          $("#messages-container").append(output);
        }
        return $("#messages-container").append("<script> $('.thread').click(function(event) { var details, thread_id; event.preventDefault(); thread_id = $(this).attr('id').substring(7); dm_conversation = thread_id; details = { conv_id: thread_id, method: 'get_conv', queue: 'DM' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; other = ''; if (result.conv.dms[0].sender.name === localStorage.name) { $('#message-header').empty(); $('#message-header').append(\"<h3>\" + result.conv.dms[0].reciever.name + \"</h3>\"); other = result.conv.dms[0].reciever.name; } else { $('#message-header').empty(); $('#message-header').append(\"<h3>\" + result.conv.dms[0].sender.name + \"</h3>\"); other = result.conv.dms[0].sender.name; } ref = result.conv.dms; results = []; $('#message-body').empty(); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#message-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.sender.avatar_url +\"' alt='Profile' width='42' height='42'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.sender.name + \"</h4> \" + i.dm_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,result) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-conversation').click(function(event) { var details; event.preventDefault(); conv_id = $(this).attr('id').substring(12); }); </script>");
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#lists").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "get_subscribed_lists",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var description, i, output, _i, _len, _ref;
        $("#lists-container").empty();
        description = "";
        _ref = result.subscribed_lists;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          description = i.description;
          if (isEmpty(description) || (description != null)) {
            description = "No Description";
          }
          output = "<div class=\"media list-" + i.id + "\"> <div class=\"media-left\"> <img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> </div> <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list'  id='list-" + i.id + "' name='" + i.name + "'> <h4 class=\"media-heading\">" + (capitalize(i.name)) + " @" + i.creator.username + "</h4> " + description + " </div> <button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box' type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent edit-list' data-toggle='modal' data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;' class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> </div>";
          $("#lists-container").append(output);
        }
        return $("#lists-container").append("<script> $('.list-entry').click(function(event) { var details, thread_id, list_name; event.preventDefault(); list_id = $(this).attr('id').substring(5); list_name = $(this).attr('name'); details = { list_id: list_id, method: 'get_list_feeds', queue: 'LIST' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; ref = result.list_feeds; results = []; $('#list-header').empty(); $('#list-body').empty(); $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\"); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); }); $('.edit-list').click(function(event) { var details, list_id; event.preventDefault(); list_id = $(this).attr('id').substring(10); $('input[name=list-name-edit]').val('khar'); details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" }; return $.ajax({ url: \"http://localhost:8080\", type: \"POST\", datatype: \"json\", data: JSON.stringify(details), success: function(result) { $('input[name=list-name-edit]').val(result.list.name); $('textarea[name=list-description-edit]').val(result.list.description); $('edit-list-box').modal('handleUpdate'); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); }); $('.unsub-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: 'error',
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#send-dm").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      dm_text: $('input[name=dm]').val(),
      conv_id: dm_conversation,
      method: "create_dm2",
      queue: "DM"
    };
    if (isEmpty($('input[name=dm]').val())) {
      return noty({
        text: 'Cannot send empty Message',
        timeout: 2000,
        type: "error",
        theme: 'bootstrapTheme'
      });
    } else {
      return $.ajax({
        url: "http://localhost:8080",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
          var conv;
          $('input[name=dm]').val("");
          noty({
            text: 'Message Sent!',
            timeout: 1500,
            type: "success",
            theme: 'bootstrapTheme'
          });
          conv = {
            conv_id: dm_conversation,
            method: 'get_conv',
            queue: 'DM'
          };
          return $.ajax({
            url: "http://localhost:8080",
            type: "POST",
            datatype: "json",
            data: JSON.stringify(conv),
            success: function(result) {
              var i, _i, _len, _ref, _results;
              $('#message-body').empty();
              _ref = result.conv.dms;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                i = _ref[_i];
                _results.push($('#message-body').append("<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='" + i.sender.avatar_url + "' alt='Profile' width='42' height='42'> </a> </div> <div class='media-body'> <h4 class='media-heading'> " + i.sender.name + " </h4>  " + i.dm_text + "  </div> </div>"));
              }
              return _results;
            },
            error: function(xhr, status, result) {
              return noty({
                text: 'Please refresh browser',
                timeout: 2000,
                type: 'error',
                theme: 'bootstrapTheme'
              });
            }
          });
        },
        error: function(xhr, status, error) {
          return noty({
            text: 'An error occured, please try again',
            timeout: 2000,
            type: "error",
            theme: 'bootstrapTheme'
          });
        }
      });
    }
  });
});

$(document).ready(function() {
  return $("#followers").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "followers",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var i, _i, _len, _ref, _results;
        _ref = result.followers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _results.push($("#followers-pane").append("<div class=\"media\"> <div class=\"media-left\"> <img class='media-object' src='" + i.avatar_url + "' height='64' width='64'></div> <div class=\"media-body\"> <h4> " + (capitalize(i.username)) + " (@" + i.username + ")</h4> </div> </div>"));
        }
        return _results;
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#following").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      method: "following",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var i, _i, _len, _ref, _results;
        _ref = result.following;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _results.push($("#followers-pane").append("<div class=\"row\"> <div class=\"col-sm-6 col-sm-offset-1\"> <div class=\"media\"> <div class=\"media-left\"> <img class='media-object' src='" + i.avatar_url + "' height='64' width='64'></div> <div class=\"media-body\"> <h4> " + (capitalize(i.username)) + " (@" + i.username + ")</h4> </div> </div> </div> </div>"));
        }
        return _results;
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#search").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      user_substring: $('input[name=search]').val(),
      method: "get_users",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        var i, _i, _len, _ref, _results;
        $('search-pane').empty();
        _ref = result.users;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _results.push($("#search-pane").append("<div class=\"media\"> <div class=\"media-left\"> <img class='media-object' src='" + i.avatar_url + "' height='64' width='64'></div> <div class=\"media-body user-search\" id='user-search-" + i.username + "'> <h4 class='user'> " + (capitalize(i.username)) + " (@" + i.username + ")</h4> </div> </div> <script> $('user-search').click(function(event) { var details; event.preventDefault(); username = $(this).attr('id').substring(11); list_name = $(this).attr('name'); details = { username: username, method: 'get_user2', queue: 'USER' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; $('search-box').hide(); ref = result.list_feeds; results = []; $('#list-header').empty(); $('#list-body').empty(); $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\"); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); </script>"));
        }
        return _results;
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#create-conversation").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      username: $('input[name=conv-username]').val(),
      dm_text: $('input[name=conv-message]').val(),
      method: "create_conversation",
      queue: "DM"
    };
    if (isEmpty($('input[name=conv-username]').val())) {
      return noty({
        text: 'Username cannot be empty',
        timeout: 2000,
        type: "error",
        theme: 'bootstrapTheme'
      });
    } else if (isEmpty($('input[name=conv-message]').val())) {
      return noty({
        text: 'Message cannot be empty',
        timeout: 2000,
        type: "error",
        theme: 'bootstrapTheme'
      });
    } else {
      return $.ajax({
        url: "http://localhost:8080",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
          noty({
            text: 'Conversation created!',
            timeout: 1500,
            type: "success",
            theme: 'bootstrapTheme'
          });
          $('input[name=conv-username]').val("");
          $('input[name=conv-message]').val("");
          return $(".new-conv-box").modal('hide');
        },
        error: function(xhr, status, error) {
          if (error.contains("exists")) {
            return noty({
              text: 'Username wrong or conversation already exists',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          } else {
            return noty({
              text: 'An error occured, please try again',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          }
        }
      });
    }
  });
});

$(document).ready(function() {
  return $("#add-user").click(function(event) {
    $("#list-users").append("<div class=\"form-group\"> <label id=\"user-" + users_added + "\" class=\"control-label col-sm-2\">User " + users_added + ":</label> <div class=\"col-sm-10\"> <input name=\"user-" + users_added + "\" class=\"form-control\"> </div> </div>");
    return users_added += 1;
  });
});

$(document).ready(function() {
  return $("#create-list").click(function(event) {
    var details, i, users_in_list, _i;
    event.preventDefault();
    users_in_list = [];
    for (i = _i = 1; 1 <= users_added ? _i < users_added : _i > users_added; i = 1 <= users_added ? ++_i : --_i) {
      if (!isEmpty($("input[name=user-" + i + "]").val())) {
        users_in_list.push($("input[name=user-" + i + "]").val());
      }
    }
    details = {
      queue: "LIST",
      method: "create_list_with_members",
      session_id: localStorage.session,
      name: $('input[name=list-name]').val(),
      description: $('input[name=list-description]').val(),
      members: JSON.stringify(users_in_list, {
        "private": false
      })
    };
    if (isEmpty($('input[name=list-name]').val())) {
      return noty({
        text: 'Name cannot be empty',
        timeout: 2000,
        type: "error",
        theme: 'bootstrapTheme'
      });
    } else {
      return $.ajax({
        url: "http://localhost:8080",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
          noty({
            text: 'List created!',
            timeout: 1500,
            type: "success",
            theme: 'bootstrapTheme'
          });
          $('input[name=list-name]').val("");
          $('input[name=list-description]').val("");
          $(".new-list-box").modal('hide');
          users_in_list = [];
          users_added = 2;
          details = {
            session_id: localStorage.session,
            method: "get_subscribed_lists",
            queue: "USER"
          };
          details = {
            session_id: localStorage.session,
            method: "get_subscribed_lists",
            queue: "USER"
          };
          return $.ajax({
            url: "http://localhost:8080",
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
              var description, output, _j, _len, _ref;
              $("#lists-container").empty();
              description = "";
              _ref = result.subscribed_lists;
              for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                i = _ref[_j];
                description = i.description;
                if (isEmpty(description) || (description != null)) {
                  description = "No Description";
                }
                output = "<div class=\"media list-" + i.id + "\"> <div class=\"media-left\"> <img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> </div> <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list'  id='list-" + i.id + "' name='" + i.name + "'> <h4 class=\"media-heading\">" + (capitalize(i.name)) + " @" + i.creator.username + "</h4> " + description + " </div> <button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box' type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent edit-list' data-toggle='modal' data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;' class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> </div>";
                $("#lists-container").append(output);
              }
              return $("#lists-container").append("<script> $('.list-entry').click(function(event) { var details, thread_id, list_name; event.preventDefault(); list_id = $(this).attr('id').substring(5); list_name = $(this).attr('name'); details = { list_id: list_id, method: 'get_list_feeds', queue: 'LIST' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; ref = result.list_feeds; results = []; $('#list-header').empty(); $('#list-body').empty(); $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\"); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); }); $('.edit-list').click(function(event) { var details, list_id; event.preventDefault(); list_id = $(this).attr('id').substring(10); $('input[name=list-name-edit]').val('khar'); details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" }; return $.ajax({ url: \"http://localhost:8080\", type: \"POST\", datatype: \"json\", data: JSON.stringify(details), success: function(result) { $('input[name=list-name-edit]').val(result.list.name); $('textarea[name=list-description-edit]').val(result.list.description); $('edit-list-box').modal('handleUpdate'); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); }); $('.unsub-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
            },
            error: function(xhr, status, error) {
              return noty({
                text: 'An error occured, please try again',
                timeout: 2000,
                type: 'error',
                theme: 'bootstrapTheme'
              });
            }
          });
        },
        error: function(xhr, status, error) {
          if (error.contains("exists")) {
            return noty({
              text: 'List already exists',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          } else {
            return noty({
              text: 'An error occured, please try again',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          }
        }
      });
    }
  });
});

$(document).ready(function() {
  return $("#confirm-delete-list").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      method: "delete_list",
      queue: "LIST",
      list_id: list_id
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        noty({
          text: 'List Deleted!',
          timeout: 1500,
          type: "success",
          theme: 'bootstrapTheme'
        });
        return $(".list-" + list_id).hide();
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-unsub-list").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      method: "unsubscribe",
      queue: "LIST",
      list_id: list_id,
      session_id: localStorage.session
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        noty({
          text: 'Unsubscribe Successful!',
          timeout: 1500,
          type: "success",
          theme: 'bootstrapTheme'
        });
        return $(".list-" + list_id).hide();
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-edit-list").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      method: "update_list",
      queue: "LIST",
      list_id: list_id,
      name: $('input[name=list-name-edit]').val(),
      description: $('textarea[name=list-description-edit]').val()
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        noty({
          text: 'List Updated!',
          timeout: 1500,
          type: "success",
          theme: 'bootstrapTheme'
        });
        details = {
          session_id: localStorage.session,
          method: "get_subscribed_lists",
          queue: "USER"
        };
        return $.ajax({
          url: "http://localhost:8080",
          type: "POST",
          datatype: "json",
          data: JSON.stringify(details),
          success: function(result) {
            var description, i, output, _i, _len, _ref;
            $("#lists-container").empty();
            description = "";
            _ref = result.subscribed_lists;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              description = i.description;
              if (isEmpty(description) || (description != null)) {
                description = "No Description";
                output = "<div class=\"media list-" + i.id + "\"> <div class=\"media-left\"> <img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> </div> <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list'  id='list-" + i.id + "' name='" + i.name + "'> <h4 class=\"media-heading\">" + (capitalize(i.name)) + " @" + i.creator.username + "</h4> " + description + " </div> <button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box' type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent edit-list' data-toggle='modal' data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;' class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> </div>";
              }
              $("#lists-container").append(output);
            }
            return $("#lists-container").append("<script> $('.list-entry').click(function(event) { var details, thread_id, list_name; event.preventDefault(); list_id = $(this).attr('id').substring(5); list_name = $(this).attr('name'); details = { list_id: list_id, method: 'get_list_feeds', queue: 'LIST' }; return $.ajax({ url: 'http://localhost:8080', type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; ref = result.list_feeds; results = []; $('#list-header').empty(); $('#list-body').empty(); $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\"); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); }); $('.edit-list').click(function(event) { var details, list_id; event.preventDefault(); list_id = $(this).attr('id').substring(10); details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" }; return $.ajax({ url: \"http://localhost:8080\", type: \"POST\", datatype: \"json\", data: JSON.stringify(details), success: function(result) { $('input[name=list-name-edit]').val(result.list.name); $('textarea[name=list-description-edit]').val(result.list.description); $('edit-list-box').modal('handleUpdate'); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); }); $('.unsub-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
          },
          error: function(xhr, status, error) {
            return noty({
              text: 'An error occured, please try again',
              timeout: 2000,
              type: 'error',
              theme: 'bootstrapTheme'
            });
          }
        });
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-reply").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      session_id: localStorage.session,
      tweet_id: tweet_id,
      tweet_text: $('textarea[name=reply-text]').val(),
      method: "logout",
      queue: "USER"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        $('textarea[name=reply-text]').val('');
        $(".reply-box").modal('hide');
        return noty({
          text: 'Reply Sent!',
          timeout: 2000,
          type: "success",
          theme: 'bootstrapTheme'
        });
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-delete-conv").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      conv_id: conv_id,
      method: "delete_conv",
      queue: "DM"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        $(".thread-" + conv_id).hide();
        return noty({
          text: 'Conversation Deleted!',
          timeout: 2000,
          type: "success",
          theme: 'bootstrapTheme'
        });
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#confirm-delete-tweet").click(function(event) {
    var details;
    event.preventDefault();
    details = {
      tweet_id: tweet_id,
      method: "delete_tweet",
      queue: "TWEET"
    };
    return $.ajax({
      url: "http://localhost:8080",
      type: "POST",
      datatype: "json",
      data: JSON.stringify(details),
      success: function(result) {
        $(".my-tweet-" + tweet_id).hide();
        return noty({
          text: 'Tweet Deleted!',
          timeout: 2000,
          type: "success",
          theme: 'bootstrapTheme'
        });
      },
      error: function(xhr, status, error) {
        return noty({
          text: 'An error occured, please try again',
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
      }
    });
  });
});

$(document).ready(function() {
  return $("#back").click(function(event) {
    event.preventDefault();
    $('user-box').hide;
    return $('search-box').show;
  });
});

capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

isEmpty = function(string) {
  if (string === null || string === "") {
    return true;
  } else {
    return false;
  }
};
