var capitalize, conv_id, dm_conversation, isEmpty, list_id, user_id, username, users_added, chosen_user,chosen_list , isFollowing;
urlVar =  "http://68.183.215.190:8080/";
mood = {'mood':'rt', 'long_mood':'Random Thoughts' , 'mood_logo' :'<i class=\"fa fa-commenting fa-3x\"></i>' };

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
    return $("#rt").click(function(event) {
        mood.mood="rt";
        mood.long_mood="Random Thoughts";
        mood.mood_logo="<i class=\"fa fa-commenting-o fa-3x\"></i>";
        var pathname = window.location.pathname.substring(40,48);

        reload();

        noty({
            text: mood.long_mood,
            timeout: 2000,
            type: "success",
            theme: 'bootstrapTheme'
        });
    });
});
$(document).ready(function() {
    return $("#va").click(function(event) {
        mood.mood="va";
        mood.long_mood="Value Adding";
        mood.mood_logo="<i class=\"si si-bulb fa-3x\"></i>";
        reload();
        noty({
            text: mood.long_mood,
            timeout: 2000,
            type: "success",
            theme: 'bootstrapTheme'
        });
    });
});
$(document).ready(function() {
    return $("#d").click(function(event) {
        mood.mood="dbt";
        mood.long_mood="Debatable"
        mood.mood_logo="<i class=\"si si-directions fa-3x\"></i>";
        reload();
        noty({
            text: mood.long_mood ,
            timeout: 2000,
            type: "success",
            theme: 'bootstrapTheme'
        });
    });
});
$(document).ready(function() {
    return $("#n").click(function(event) {
        mood.mood="nw";
        mood.long_mood="News";
        mood.mood_logo="<i class=\"fa fa-newspaper-o fa-3x\"></i>";
        reload();noty({
            text: mood.long_mood,
            timeout: 2000,
            type: "success",
            theme: 'bootstrapTheme'
        });
    });
});


     function edit_profile() {

        var details = {
            session_id: localStorage.session,
            method: "my_profile",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                document.getElementById("overlay").checked = result.user.overlay ;
                document.getElementById("protected").checked = result.user.protected_tweets ;
                $('img[name=profile-image]').prop("src", result.user.avatar_url);
                $('input[name=name]').val(result.user.name);
                $('input[name=username]').val(result.user.username);
                $('input[name=email-1]').val(result.user.email);
                $('input[name=language]').val(result.user.language);
                $('input[name=country]').val(result.user.country);
                $('textarea[name=bio]').val(result.user.bio);
                $('input[name=website]').val(result.user.website);
                $('input[name=overlay]').val(result.user.overlay);
                $('input[name=link_color]').val(result.user.link_color);
                $('input[name=avatar_url]').val(result.user.avatar_url);
                $('input[name=background_color]').val(result.user.background_color);

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


function moodDbt() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        type:'dbt',
        method: "timeline",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var favorited, i, output, _i, _len, _ref;
            $("#debate").empty();
            favorited = "fav";
            _ref = result.feeds;
            for (_i = 0, _len = _ref.length ; _i < _len && _i<4; _i++) {
                i = _ref[_i];
                if (i.is_favorited) {
                    favorited = "unfav";
                } else {
                    favorited = "fav";
                }

                output = "<blockquote>" +
                    "                        <div class=\"clearfix\">\n" +
                    "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                    "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                    "</div>"+
                    "<div id=\"my-post-username\" class=\"push-5-t\">" +
                    "<a class='font-w600' > "+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                    "</div> </div>"+
                    "<p>"+i.tweet_text +" </p>" +
                    " <footer>" +
                    "<button class='pull-right button-transparent " + favorited + "-tweet' type='button' data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                    "<button class='pull-right button-transparent retweet-tweet' type='button' data-placement=\"bottom\" title=\"REPOST\" id='tweet-retweet-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> " +
                    "<button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box'" +
                    " type='button' data-placement=\"bottom\" title=\"REPLY\" id='tweet-reply-" + i.id + "'> " +
                    "<i style='font-size:1.5em;' class='fa fa-reply'></i></button>"+
                    " </div> </div> </div>"+
                    "</footer> </blockquote>" ;
                $("#debate").append(output);
            }
            $("#debate").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault();" +
                " tweet_id = $(this).attr('id').substring(10); " +
                "details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; " +
                "return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), " +
                "success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet');" +
                " $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { if(error.includes('tweet'))" +
                "{ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } " +
                "else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); });" +
                " $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10);" +
                " details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' };" +
                " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { " +
                "$(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0);" +
                " return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); });" +
                " $('.retweet-tweet').click(function(event) {" +
                " var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); " +
                "details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' };" +
                " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details)," +
                " success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }" +
                " else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); });" +
                " $('.reply-tweet').click(function(event) {" +
                " var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12);replies(tweet_id); }); </script>");

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
function moodVa() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        type:'va',
        method: "timeline",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var favorited, i, output, _i, _len, _ref;
            $("#value").empty();
            favorited = "fav";
            _ref = result.feeds;
            for (_i = 0, _len = _ref.length; _i < _len&& _i<4; _i++) {
                i = _ref[_i];
                if (i.is_favorited) {
                    favorited = "unfav";
                } else {
                    favorited = "fav";
                }

                output = "<blockquote>" +
                    "                        <div class=\"clearfix\">\n" +
                    "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                    "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                    "</div>"+
                    "<div id=\"my-post-username\" class=\"push-5-t\">" +
                    "<a class='font-w600' > "+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                    "</div> </div>"+
                    "<p>"+i.tweet_text +" </p>" +
                    " <footer>" +
                    "<button class='pull-right button-transparent " + favorited + "-tweet' type='button' data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                    "<button class='pull-right button-transparent retweet-tweet' type='button' data-placement=\"bottom\" title=\"REPOST\" id='tweet-retweet-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> " +
                    "<button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box'" +
                    " type='button' data-placement=\"bottom\" title=\"REPLY\" id='tweet-reply-" + i.id + "'> " +
                    "<i style='font-size:1.5em;' class='fa fa-reply'></i></button>"+
                    " </div> </div> </div>"+
                    "</footer> </blockquote>" ;
                $("#value").append(output);

            }
            moodNw();


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
function moodNw() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        type:'nw',
        method: "timeline",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var favorited, i, output, _i, _len, _ref;
            $("#news").empty();
            favorited = "fav";
            _ref = result.feeds;
            for (_i = 0, _len = _ref.length; _i < _len &&_i<4; _i++) {
                i = _ref[_i];
                if (i.is_favorited) {
                    favorited = "unfav";
                } else {
                    favorited = "fav";
                }

                output = "<blockquote>" +
                    "                        <div class=\"clearfix\">\n" +
                    "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                    "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                    "</div>"+
                    "<div id=\"my-post-username\" class=\"push-5-t\">" +
                    "<a class='font-w600' > "+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                    "</div> </div>"+
                    "<p>"+i.tweet_text +" </p>" +
                    " <footer>" +
                    "<button class='pull-right button-transparent " + favorited + "-tweet' type='button' data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                    "<button class='pull-right button-transparent retweet-tweet' type='button' data-placement=\"bottom\" title=\"REPOST\" id='tweet-retweet-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> " +
                    "<button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box'" +
                    " type='button' data-placement=\"bottom\" title=\"REPLY\" id='tweet-reply-" + i.id + "'> " +
                    "<i style='font-size:1.5em;' class='fa fa-reply'></i></button>"+
                    " </div> </div> </div>"+
                    "</footer> </blockquote>" ;

                $("#news").append(output);
            }
            moodDbt();

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
function moodRt() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        type:'rt',
        method: "timeline",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var favorited, i, output, _i, _len, _ref;
            $("#random").empty();
            favorited = "fav";
            _ref = result.feeds;
            for (_i = 0, _len = _ref.length; _i < _len && _i<4; _i++) {
                i = _ref[_i];
                if (i.is_favorited) {
                    favorited = "unfav";
                } else {
                    favorited = "fav";
                }

                output = "<blockquote>" +
                    "                        <div class=\"clearfix\">\n" +
                    "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                    "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                    "</div>"+
                    "<div id=\"my-post-username\" class=\"push-5-t\">" +
                    "<a class='font-w600' > "+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                    "</div> </div>"+
                    "<p>"+i.tweet_text +" </p>" +
                    " <footer>" +
                    "<button class='pull-right button-transparent " + favorited + "-tweet' type='button' data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                    "<button class='pull-right button-transparent retweet-tweet' type='button' data-placement=\"bottom\" title=\"REPOST\" id='tweet-retweet-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> " +
                    "<button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box'" +
                    " type='button' data-placement=\"bottom\" title=\"REPLY\" id='tweet-reply-" + i.id + "'> " +
                    "<i style='font-size:1.5em;' class='fa fa-reply'></i></button>"+
                    " </div> </div> </div>"+
                    "</footer> </blockquote>" ;
                $("#random").append(output);

            }
            moodVa();

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
function reload() {
    var pathname = window.location.pathname;
    if(pathname.includes("timeline"))
        timeline();

    else
    if(pathname.includes("Moods"))
        moodRt();

    else
        profileload();

}
function timeline() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        type:mood.mood,
        method: "timeline",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            $('h2[name=mood]').empty();
            $('h2[name=mood]').append(mood.long_mood);
            $('div[name=mood-image]').empty()
            $('div[name=mood-image]').append(mood.mood_logo)
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

                output = "<blockquote>" +
                    "                        <div class=\"clearfix\">\n" +
                    "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                    "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                    "</div>"+
                    "<div id=\"my-post-username\" class=\"push-5-t\">" +
                    "<a class='font-w600' > "+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                    "</div> </div>"+
                    "<p>"+i.tweet_text +" </p>" +
                    " <footer>" +
                    "<button class='pull-right button-transparent " + favorited + "-tweet' type='button' data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                    "<button class='pull-right button-transparent retweet-tweet' type='button' data-placement=\"bottom\" title=\"REPOST\" id='tweet-retweet-" + i.id + "' >" +
                    " <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> " +
                    "<button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box'" +
                    " type='button' data-placement=\"bottom\" title=\"REPLY\" id='tweet-reply-" + i.id + "'> " +
                    "<i style='font-size:1.5em;' class='fa fa-reply'></i></button>"+
                    " </div> </div> </div>"+
                    "</footer> </blockquote>" ;
                $("#timeline-container").append(output);
            }
            $("#timeline-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault();" +
                " tweet_id = $(this).attr('id').substring(10); " +
                "details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; " +
                "return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), " +
                "success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet');" +
                " $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { if(error.includes('tweet'))" +
                "{ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } " +
                "else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); });" +
                " $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10);" +
                " details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' };" +
                " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { " +
                "$(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0);" +
                " return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); });" +
                " $('.retweet-tweet').click(function(event) {" +
                " var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); " +
                "details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' };" +
                " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details)," +
                " success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }," +
                " error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }" +
                " else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); });" +
                " $('.reply-tweet').click(function(event) {" +
                " var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12);replies(tweet_id); }); </script>");
            timline_lists();
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

function user_posts(){

        var details;
        event.preventDefault();
        details = {
            username: chosen_user.username,
            type:mood.mood ,
            method: "user_tweets2",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {

                var favorited, i, output, _i, _len, _ref;
                $("#user-body").empty();
                favorited = "fav";
                _ref = result.tweets;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    i = _ref[_i];
                    if (i.is_favorited) {
                        favorited = "unfav";
                    } else {
                        favorited = "fav";
                    }
                    output = "<blockquote>" +
                        "                        <div class=\"clearfix\">\n" +
                        "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                        "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                        "</div>"+
                        "<div id=\"my-post-username\" class=\"push-5-t\">" +
                        "<a class='font-w600' >"+ i.creator.username +"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                        "</div> </div>"+
                        "<p>"+i.tweet_text +" </p>" +
                        "</blockquote>";
                    $("#user-body").append(output);
                }
                is_following.following();
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

    function replies(tweet_id){
         var details;
        event.preventDefault();
        details = {
            tweet_id: tweet_id,
            method: "get_replies",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
                var favorited, i, output, _i, _len, _ref;
                $("#replies").empty();
                favorited = "fav";
                _ref = result.replies;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    i = _ref[_i];
                    if (i.is_favorited) {
                    favorited = "unfav";
                    } else {
                        favorited = "fav";
                    }
                    output = "<blockquote>" +
                        "                        <div class=\"clearfix\">\n" +
                        "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                        "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                        "</div>"+
                        "<div id=\"my-post-username\" class=\"push-5-t\">" +
                        "<a class='font-w600' >"+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                        "</div> </div>"+
                        "<p>"+i.tweet_text +" </p>" +
                        "</blockquote>";
                    $("#replies").append(output);
            }
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

    function mentions(){

    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        method: "get_mentions",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var i, output, _i, _len, _ref;
            $("#notifications").empty();
            _ref = result.mentions;
            for (_i = 0, _len = _ref.length; _i < _len ; _i++) {
                i = _ref[_i];
                output = "<ul class=\"list list-simple list-li-clearfix\">\n" +
                    "                                        <li>\n" +
                    "                                            <div class=\"item  pull-left push-10-r \" >\n" +
                    "                                                <img  src='" + i.creator.avatar_url + "' height='64' width='64'> </div> <div class=\"media-body\"> "+
                    "                                            </div>\n" +
                    "                                            <h5 class=\"push-10-t\">" + (capitalize(i.creator.username)) + " </h5>\n" +
                    "                                            <div class=\"font-s13\">"+ i.tweet_text  +"</div>\n" +
                    "<button class='pull-right button-transparent fav-tweet' type='button' id='tweet-fav-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-star'></i></button> <button class='pull-right button-transparent retweet-tweet' type='button' id='tweet-retweet-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-retweet'></i></button> <button class='pull-right button-transparent reply-tweet' data-toggle='modal' data-target='.reply-box' type='button' id='tweet-reply-" + i.id + "'> <i style='font-size:1.5em;' class='fa fa-reply'></i></button> </div>"+
                    "                                        </li></ul>";
                $("#notifications").append(output);
            }
            $("#notifications").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.reply-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12); }); </script>");
            messages();
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

function messages(){
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        method: "get_convs",
        queue: "DM"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var i, other, output, _i, _len, _ref;
            $("#messages").empty();
            other = '';
            _ref = result.convs;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                i = _ref[_i];
                if (i.lastDM.sender.name === localStorage.username) {
                    other = i.lastDM.reciever.name;
                } else {
                    other = i.lastDM.sender.name;
                }
                output = "<div class=\"media thread-" + i.id + "\" >" +
                    " <div class=\"media-left\">" +
                    " <img class=\"media-object\" src='" + i.lastDM.sender.avatar_url + "' alt='DM Image' width='64' height='64'> </div> " +
                    "<div class=\"media-body thread\" id='thread-" + i.id + "' data-toggle='modal' data-target='.message' >" +
                    " <h4 class=\"media-heading\">" + other + "</h4> " + i.lastDM.dm_text + " </div>" +
                    " <button class='pull-right button-transparent delete-conversation' data-toggle='modal' data-target='.delete-conv-box' type='button' id='conv-delete-" + i.id + "' > <i style='font-size:1.5em;' class='fa fa-trash'></i></button> </div>";
                $("#messages").append(output);
            }
            return $("#messages").append("<script> $('.thread').click(function(event) { var details, thread_id; event.preventDefault(); " +
                "thread_id = $(this).attr('id').substring(7); dm_conversation = thread_id;" +
                " details = { conv_id: thread_id, method: 'get_conv', queue: 'DM' }; " +
                "return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details)," +
                " success: function(result) { var i, j, len, other, ref, results; other = ''; " +
                " $('#message-header').empty(); " +
                "if (!result.conv.dms[0].sender.username.includes(localStorage.username)) {"+
                "$('#message-header').append(result.conv.dms[0].reciever.name ); " +
                "other = result.conv.dms[0].reciever.name;} " +
                "else {"+
                "$('#message-header').empty(); $('#message-header').append(\"<h3>\" +result.conv.dms[0].sender.name + \"</h3>\"); " +
                "other = result.conv.dms[0].sender.name; }"+
                "ref = result.conv.dms; results = [];" +
                " $('#message-body').empty(); for (j = 0, len = ref.length; j < len; j++) { " +
                "i = ref[j]; " +
                "results.push($('#message-body').append(\"<div class='block block-rounded block-transparent push-70 push-50-l'>  " +
                "<img class='img-avatar' src='\" + i.sender.avatar_url +\"' alt='Profile' >"+
                " <div class='media-body'> <div class='font-w400 text-muted'><small> '@\" + i.sender.name + \"</small></div> \" + i.dm_text + \" </div> " +
                "</div></div>\")); } return results; }," +
                " error: function(xhr,status,result) { " +
                "noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); });" +
                " $('.delete-conversation').click(function(event) { " +
                "var details; event.preventDefault(); conv_id = $(this).attr('id').substring(12); }); </script>");
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

function profileload() {

    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        method: "my_profile",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function (result) {
            $('h2[name=name]').empty();
            $('h3[name=bio]').empty();
            $('h3[name=post-mood]').empty();
            $('h2[name=numberOfFollowers]').empty();
            $('h2[name=numberOfFollowing]').empty();
            $('h2[name=numberOfPosts]').empty();
            $('img[name=profile-image]').prop("src", result.user.avatar_url);
            $('h2[name=name]').append(result.user.name);
            $('h3[name=bio]').append(result.user.bio);
            $('h3[name=post-mood]').append("my " +mood.long_mood);
            $('h2[name=numberOfFollowers]').append(result.user.followers_count);
            $('h2[name=numberOfFollowing]').append(result.user.followings_count);
            $('h2[name=numberOfPosts]').append(result.user.tweets_count);

            var details;
            var current_time = new Date();
            event.preventDefault();
            details = {
                session_id: localStorage.session,
                type: mood.mood,
                method: "user_tweets",
                queue: "USER"
            };
            return $.ajax({
                url: urlVar,
                type: "POST",
                datatype: "json",
                data: JSON.stringify(details),
                success: function (result) {
                    var favorited, i, output, _i, _len, _ref;
                    $("#user-posts").empty();
                    favorited = "fav";
                    _ref = result.tweets;
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        i = _ref[_i];

                        if (i.is_favorited) {
                            favorited = "unfav";
                        } else {
                            favorited = "fav";
                        }
                        output = "<blockquote>" +
                            "                        <div class=\"clearfix\">\n" +
                            "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                            "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                            "</div>" +
                            "<div id=\"my-post-username\" class=\"push-5-t\">" +
                            "<a class='font-w600' >" + i.creator.username + "</a><br> <span class='font-s12 text-muted'>" + i.created_at.substring(0, 11) + "</span>" +
                            "</div> </div>" +
                            "<p>" + i.tweet_text + " </p>" +
                            " " +
                            " <button class='pull-right button-transparent delete-tweet' data-toggle='modal' data-target='.delete-tweet-box'" +
                            " type='button' data-placement=\"bottom\" title=\"DELETE\" id='tweet-delete-" + i.id + "' >" +
                            " <i style='font-size:1.5em;' class='si si-trash fa-2x'></i></button>" +
                            " <button class='pull-right button-transparent " + favorited + "-tweet' type='button'  data-placement=\"bottom\" title=\"FAVORITE\" id='tweet-fav-" + i.id + "' >" +
                            " <i style='font-size:1.5em;' class='fa fa-star'></i></button> " +
                            " </div> </div> </div>" +
                            " </blockquote>";
                        $("#user-posts").append(output);
                    }
                    mentions();
                    return $("#user-posts").append("<script> $('.fav-tweet').click(function(event) { " +
                        "var details;" +
                        " event.preventDefault();" +
                        " tweet_id = $(this).attr('id').substring(10);" +
                        " details = { session_id: localStorage.session," +
                        " tweet_id: tweet_id" +
                        ", method: 'favorite'," +
                        " queue: 'TWEET' };" +
                        " return $.ajax({" +
                        " url: urlVar," +
                        " type: 'POST'," +
                        " datatype: 'json'," +
                        " data: JSON.stringify(details), " +
                        "success: function(result) { " +
                        "$(this).removeClass('fav-tweet');" +
                        " $(this).addClass('unfav-tweet');" +
                        " $(this).text(0); " +
                        "return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }," +
                        " error: function(xhr, status, error) { " +
                        "if(error.includes('tweet')){ " +
                        "return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } " +
                        "else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); });" +
                        " $('.delete-tweet').click(function(event) { " +
                        "var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(13); }); </script>");
                },
                error: function (xhr, status, error) {
                    return noty({
                        text: 'An error occured, please try again',
                        timeout: 2000,
                        type: "error",
                        theme: 'bootstrapTheme'
                    });
                }
            });
        },
        error: function (xhr, status, error) {
            return noty({
                text: 'An error occured, please try again',
                timeout: 2000,
                type: "error",
                theme: 'bootstrapTheme'
            });
        }
    });
}

function timline_lists() {
    var details;
    event.preventDefault();
    details = {
        session_id: localStorage.session,
        method: "get_subscribed_lists",
        queue: "USER"
    };
    return $.ajax({
        url: urlVar,
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
            var description, i, output, _i, _len, _ref;
            $("#lists1").empty();
            description = "";
            _ref = result.subscribed_lists;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                i = _ref[_i];
                description = i.description;
                if (isEmpty(description) && (description != null)) {
                    description = "No Description";
                };
                output = "<ul class=\"list list-simple list-li-clearfix\">\n" +
                    "                                        <li>\n" +
                    "<a class=\"media list-" + i.id + "\"> <div class=\"media-left\"> " +
                    "<img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> " +
                    "</div> <div class=\"media-body  list-entry\" data-placement=\"bottom\" title=\"show list feeds\" data-toggle='modal' data-target='.followers-box' " +
                    " id='list-" + i.id + "' name='" + i.name + "'> "+
                    " <h5 class=\"push-10-t\">" + i.name+"</h5></a> \n" +
                    " <div class=\"font-s13\">"+ i.description  +"</div></div>\n" +
                    "<button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box'" +
                    " type='button' data-placement=\"bottom\" title=\"DELETE \" id='list-delete-" + i.id + "' > <i style='font-size:1.7em;' class='fa fa-trash'></i>" +
                    "</button> <button class='pull-right button-transparent edit-list' data-toggle='modal'" +
                    " data-target='.edit-list-box' type='button' data-placement=\"bottom\" title=\"UPDATE\" id='list-edit-" + i.id + "' > <i style='font-size:1.7em;'" +
                    " class='fa fa-pencil'></i></button> " +
                    "<button class='pull-right button-transparent list-members' data-toggle='modal'\" +\n" +
                    " data-target='.members-box' type='button' data-placement=\"bottom\" title=\"MEMBERS\" id='list-members-" + i.id + "' >" +
                    " <i style='font-size:1.7em;' class='fa fa-users pull-right'></i>"+
                    "                                        </li></ul>";
                $("#lists1").append(output);
            }
            return $("#lists1").append("<script> $('.list-entry').click(function(event) {" +
                " var details, thread_id, list_name;" +
                " event.preventDefault(); " +
                " list_id = $(this).attr('id').substring(5);" +
                " list_name = $(this).attr('name'); " +
                " chosen_list=list_id;"+
                " details = { session_id:localStorage.session ,list_id: list_id, type: mood.mood , method: 'get_list_feeds', queue: 'LIST'  };" +
                " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details)," +
                " success: function(result) { var i, j, len, other, ref, results;" +
                " ref = result.list_feeds; results = [];" +
                " $('#box-name').empty();" +
                " $('#followers-pane').empty();" +
                " $('#box-name').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\");" +
                " for (j = 0, len = ref.length; j < len; j++)" +
                " { i = ref[j];" +
                " results.push($('#followers-pane').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); " +
                "}" +
                " return results; }," +
                " error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); " +
                "$('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); });" +
                "$('.edit-list').click(function(event) { var details, list_id; event.preventDefault();" +
                " list_id = $(this).attr('id').substring(10);" +
                " $('input[name=list-name-edit]').val();" +
                " details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" };" +
                " return $.ajax({ url: urlVar, type: \"POST\", datatype: \"json\", data: JSON.stringify(details)," +
                " success: function(result) { $('input[name=list-name-edit]').val(result.list.name);" +
                " $('textarea[name=list-description-edit]').val(result.list.description);" +
                " $('edit-list-box').modal('handleUpdate'); }," +
                " error: function(xhr, status, error) { " +
                "return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); });" +
                "$('.list-members').click(function(event) { var details, list_id; event.preventDefault();" +
                " list_id = $(this).attr('id').substring(13);" +
                "chosen_list=list_id;"+
                " details = { list_id: list_id, method: \"list_members\", queue: \"LIST\" };" +
                " return $.ajax({ url: urlVar, type: \"POST\", datatype: \"json\", data: JSON.stringify(details)," +
                " success: function(result) {  "+
                "var i, _i, _len, _ref, _results;"+
                "$('#members-pane').empty();"+
                "_ref = result.members;"+
                "_results = [];"+
                "_len =_ref.length;"+
                "for (_i = 0 ; _i < _len ; _i++) {"+
                "i = _ref[_i];"+
                " _results.push($('#members-pane').append(" +
                "\"<div class='media'> <div class='media-left'> <a href='#'> " +
                "<img class='media-object' src='\" + i.avatar_url +\"' alt='Profile' width='64' height='64'>" +
                " </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.username + \"</h4> \" " +
                "+ i.name + \" </div> </div>\"));}" +
                "return _results"+
                "}, " +
                " error: function(xhr, status, error) { " +
                "return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); });"+
                " $('.unsub-list').click(function(event) {" +
                " event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
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
}


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
                url: urlVar,
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
                        url: urlVar,
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
                                _results.push($('#message-body').append("<div class='block block-rounded block-transparent push-70 push-50-l'> <img class='img-avatar' src='" + i.sender.avatar_url +"' alt='Profile' >  <div class='media-body'> <h4 class='media-heading'> " + i.sender.name + " </h4>  " + i.dm_text + "  </div> </div>"));
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
    return $("#search").click(function(event) {
        var details;
        event.preventDefault();
        details = {
            user_substring: $('input[name=search]').val(),
            method: "get_users",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                var i, _i, _len, _ref, _results;
                $("#search-pane").empty();
                _ref = result.users;
                _results = [];
                _len =_ref.length;
                for (_i = 0 ; _i < _len & _i<4; _i++) {
                    i = _ref[_i];
                    _results.push($("#search-pane").append(
                        "<div class=\"media\"> <div class=\"media-left\">" +
                        " <img class='media-object' src='" + i.avatar_url + "' height='64' width='64'></div> " +
                        "<div class=\"media-body user-search\" data-toggle=\"modal\" data-target=\".user-details\" id='user-search-" + i.username + "' data-dismiss=\"modal\">" +
                        " <h4 class='user'> " +  " " + i.username + "</h4> " +
                        "</div> " +
                        "</div>" +
                        " <script> $('.user-search').click(function(event) { " +
                        "var details;" +
                        " event.preventDefault();" +
                        " username = $(this).attr('id').substring(11);" +
                        "_len = 0;"+
                        "details = { /*user_substring: username.substring(1),*/" +
                        "username: username.substring(1),"+
                        " method: 'get_user2'," +
                        " queue: 'USER' };" +
                        " return $.ajax({ " +
                        "url: urlVar," +
                        " type: 'POST'," +
                        " datatype: 'json'," +
                        " data: JSON.stringify(details)," +
                        " success: function(result) {" +
                        " var  results;" +
                        " $('search-box').hide();" +
                        " chosen_user=result.user;"+
                        "var bio =chosen_user.bio;"+
                        " results = [];" +
                        "$('#user-image').empty();"+
                        "$('#user-header').empty();"+
                        " if (bio===undefined) {\n" +
                        "                    bio = \"No bio\";\n" +
                        "                }; "+
                        "user_posts();"+
                        "results.push($('#user-header').append(\"<div class=\\\"media\\\"> <div class=\\\"media-left\\\"> <img class='media-object' src='\" + chosen_user.avatar_url + \"' height='64' width='64'></div> <div class=\\\"media-body\\\"> " +
                        "<h4> \" + (capitalize(chosen_user.username)) + \" (@\" + chosen_user.username + \")</h4>  " +
                        "<p> \" + bio + \"</p> " +
                        "</div> "+
                        "</div>\"));"+
                        " return results; }," +
                        " error: function(xhr,status,error) { " +
                        "return noty({" +
                        "text: 'An error occured, please try again'," +
                        " timeout: 2000, type:'error'," +
                        " theme: 'bootstrapTheme'}); } }); " +

                        "});" +

                        " </script>"
                    ));
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
    return $('#unfollow').click(function (event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            followee_id: chosen_user.id,
            method: "unfollow",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
                noty({
                    text: 'unfollowed ' ,
                    timeout: 1500,
                    type: "success",
                    theme: 'bootstrapTheme'
                });
            },
            error: function (xhr, status, error) {

                return noty({
                    text: 'error ',
                    timeout: 2000,
                    type: "error",
                    theme: 'bootstrapTheme'
                });
            }
        });
    });
});


$(document).ready(function() {
    return $("#create-list").click(function(event) {
        $('input[name=list-name]').empty();
        $('input[name=list-description]').empty();

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
            description: $('textarea[name=list-description]').val(),
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
                url: urlVar,
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
                    return $.ajax({
                        url: urlVar,
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
                                if (isEmpty(description) && (description != null)) {
                                    description = "No Description";
                                }
                                output = "<div class=\"media list-" + i.id +
                                    "\"> <div class=\"media-left\"> <img class=\"media-object\" src='" + i.creator.avatar_url +
                                    "' alt='Image' width='64' height='64'> </div>" +
                                    " <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list'  id='list-" + i.id +
                                    "' name='" + i.name + "'> " +
                                    "<h4 class=\"media-heading\">" + (capitalize(i.name)) + " @" + i.creator.username + "</h4> " + description + " </div> <button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box' type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent edit-list' data-toggle='modal' data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;' class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> </div>";
                                $("#lists-container").append(output);
                            }
                            return $("#lists-container").append("<script> $('.list-entry').click(function(event) {" +
                                " var details, thread_id, list_name; " +
                                "event.preventDefault(); " +
                                "list_id = $(this).attr('id').substring(5);" +
                                " list_name = $(this).attr('name'); " +
                                "details = {" +
                                " list_id: list_id," +
                                " method: 'get_list_feeds'," +
                                " queue: 'LIST' }; " +
                                "return $.ajax({" +
                                " url: urlVar," +
                                " type: 'POST', datatype: 'json'," +
                                " data: JSON.stringify(details)," +
                                " success: function(result) { " +
                                "var i, j, len, other, ref, results;" +
                                " ref = result.list_feeds;" +
                                " results = []; $('#list-header').empty();" +
                                " $('#list-body').empty(); " +
                                "$('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\");" +
                                " for (j = 0, len = ref.length; j < len; j++) " +
                                "{ i = ref[j];" +
                                " results.push($('#list-body').append(\"<div class='media'> " +
                                "<div class='media-left'> <a href='#'> <img class='media-object'" +
                                " src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'>" +
                                " <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); }" +
                                " return results; }, " +
                                "error: function(xhr,status,error) { " +
                                "noty({text: 'An error occured, please try again'," +
                                " timeout: 2000," +
                                " type:'error'," +
                                " theme: 'bootstrapTheme'});" +
                                " } " +
                                "});" +
                                " });" +
                                " $('.delete-list').click(function(event) {" +
                                " event.preventDefault();" +
                                " list_id = $(this).attr('id').substring(12); }); " +
                                "$('.edit-list').click(function(event) { " +
                                "var details, list_id;" +
                                " event.preventDefault();" +
                                " list_id = $(this).attr('id').substring(10);" +
                                " $('input[name=list-name-edit]').val('khar');" +
                                " details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" }; " +
                                "return $.ajax({ url: urlVar," +
                                " type: \"POST\", datatype: \"json\", data: JSON.stringify(details)," +
                                " success: function(result) { $('input[name=list-name-edit]').val(result.list.name); " +
                                "$('textarea[name=list-description-edit]').val(result.list.description); " +
                                "$('edit-list-box').modal('handleUpdate'); }," +
                                " error: function(xhr, status, error) {" +
                                " return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); });" +
                                " $('.unsub-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
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
                    if (error.includes("exists")) {
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
            session_id: localStorage.session,
            list_id: list_id
        };
        return $.ajax({
            url: urlVar,
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
    return $("#confirm-reply").click(function(event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            tweet_id: tweet_id,
            type:mood.mood,
            tweet_text: $('textarea[name=reply-text]').val(),
            method: "reply",
            queue: "TWEET"
        };
        return $.ajax({
            url: urlVar,
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
        timeline();
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
            url: urlVar,
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
            type: mood.mood ,
            tweet_text: $("#tweet-text").val(),
            method: "tweet",
            queue: "TWEET"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                $("#tweet-text").val("");
                noty({
                    text: 'Posted!',
                    timeout: 1500,
                    type: "success",
                    theme: 'bootstrapTheme'
                });

                reload();return $(".tweet-box").modal('hide');
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
            email: $('input[name=email-1]').val(),
            name: $('input[name=name]').val(),
            language: $('input[name=language]').val(),
            country: $('input[name=country]').val(),
            bio: $('textarea[name=bio]').val(),
            website: $('input[name=website]').val(),
            created_at: $('input[name=created_at]').val(),
            avatar_url: $('input[name=avatar_url]').val(),
            overlay: document.getElementById("overlay").checked,
            link_color: $('input[name=link_color]').val(),
            background_color: $('input[name=background_color]').val(),
            protected_tweets: document.getElementById("protected").checked
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                noty({
                    text: 'Profile Saved! ',
                    timeout: 2000,
                    type: "success",
                    theme: 'bootstrapTheme'
                });
                 localStorage.username = $('input[name=username]').val();
                return window.location.href = "LandingPage.html";
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
            type: mood.mood,
            method: "user_tweets",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                var favorited, i, output, _i, _len, _ref;
                $("#my-tweets-container").empty();
                $("#my-post").empty();

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

                    $("#my-post-profile-pic").append();
                    $("#my-post").append("  <div class=\"block\">\n" +
                        "                        <div class=\"clearfix\">\n" +
                        "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                        "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                        "</div>"+
                        "<div id=\"my-post-username\" class=\"push-5-t\">" +
                        "<a class='font-w600' >"+i.creator.username+"</a><br> <span class='font-s12 text-muted'>5 hours ago</span>" +
                        "</div> </div></div>" +
                        "<p class=\"push-10 pull-t\">"+i.tweet_text+"</p><hr><br>"+
                        "<div id=\"my-post-appendix\" class=\"row text-center font-s13\">\n" +
                        "                        <div class=\"col-xs-4\">\n" +
                        "                            <a class=\"font-w600 text-gray-dark\" href=\"javascript:void(0)\">\n" +
                        "                                <i class=\"fa fa-thumbs-up push-5-r\"></i>\n" +
                        "                                <span class=\"hidden-xs\">Like!</span>\n" +
                        "                            </a>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"col-xs-4\">\n" +
                        "                            <a class=\"font-w600 text-gray-dark\" href=\"javascript:void(0)\">\n" +
                        "                                <i class=\"fa fa-comment push-5-r\"></i>\n" +
                        "                                <span class=\"hidden-xs\">Comment</span>\n" +
                        "                            </a>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"col-xs-4\">\n" +
                        "                            <a class=\"font-w600 text-gray-dark\" href=\"javascript:void(0)\">\n" +
                        "                                <i class=\"fa fa-share-alt push-5-r\"></i>\n" +
                        "                                <span class=\"hidden-xs\">Share</span>\n" +
                        "                            </a>\n" +
                        "                        </div>\n" +
                        "                    </div>"+
                        "    <div class=\"block-content block-content-full bg-gray-lighter\">\n" +
                        "                                </div>"
                    )


                }
                ;

                return $("#my-tweets-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.delete-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(13); }); </script>");
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
            url: urlVar,
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
                return $("#notifications-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.reply-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12);replies(tweet_id); }); </script>");
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
            url: urlVar,
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
                return $("#messages-container").append("<script> $('.thread').click(function(event) { var details, thread_id; event.preventDefault(); thread_id = $(this).attr('id').substring(7); dm_conversation = thread_id; details = { conv_id: thread_id, method: 'get_conv', queue: 'DM' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; other = ''; if (result.conv.dms[0].sender.name === localStorage.name) { $('#message-header').empty(); $('#message-header').append(\"<h3>\" + result.conv.dms[0].reciever.name + \"</h3>\"); other = result.conv.dms[0].reciever.name; } else { $('#message-header').empty(); $('#message-header').append(\"<h3>\" + result.conv.dms[0].sender.name + \"</h3>\"); other = result.conv.dms[0].sender.name; } ref = result.conv.dms; results = []; $('#message-body').empty(); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#message-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.sender.avatar_url +\"' alt='Profile' width='42' height='42'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.sender.name + \"</h4> \" + i.dm_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,result) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-conversation').click(function(event) { var details; event.preventDefault(); conv_id = $(this).attr('id').substring(12); }); </script>");
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
            url: urlVar,
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
                    if (isEmpty(description) && (description != null)) {
                        description = "No Description";
                    }
                    output = "<butt0on class=\"media list-" + i.id + "\"> <div class=\"media-left\"> " +
                        "<img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> " +
                        "</div> <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list' " +
                        " id='list-" + i.id + "' name='" + i.name + "'> " +
                        "<h4 class=\"media-heading\">" + (capitalize(i.name)) + " @" + i.creator.username + "</h4> "
                        + description + " </div> " +
                        "<button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box'" +
                        " type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i>" +
                        "</button> <button class='pull-right button-transparent edit-list' data-toggle='modal'" +
                        " data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;'" +
                        " class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' " +
                        "type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> " +
                        "<button class='pull-right button-transparent list-subscribers' data-toggle='modal'\" +\n" +
                        " data-target='.subscribers-box' type='button' id='list-subscribers-" + i.id + "' >" +
                        " <i style='font-size:2em;' class='fa fa-users pull-right'></i></button></div>";

                    $("#lists-container").append(output);
                }
                return $("#lists-container").append("<script> $('.list-entry').click(function(event) {" +
                    " var details, thread_id, list_name;" +
                    " event.preventDefault(); " +
                    " list_id = $(this).attr('id').substring(5);" +
                    " list_name = $(this).attr('name'); " +
                    " chosen_list=list_id;"+
                    " details = { list_id: list_id, type: mood.mood , method: 'get_list_feeds', queue: 'LIST' };" +
                    " return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details)," +
                    " success: function(result) { var i, j, len, other, ref, results;" +
                    " ref = result.list_feeds; results = [];" +
                    " $('#list-header').empty();" +
                    " $('#list-body').empty();" +
                    " $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\");" +
                    " for (j = 0, len = ref.length; j < len; j++)" +
                    " { i = ref[j];" +
                    " results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); " +
                    "}" +
                    " return results; }," +
                    " error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); " +
                    "$('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); });" +
                    "$('.edit-list').click(function(event) { var details, list_id; event.preventDefault();" +
                    " list_id = $(this).attr('id').substring(10);" +
                    " $('input[name=list-name-edit]').val();" +
                    " details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" };" +
                    " return $.ajax({ url: urlVar, type: \"POST\", datatype: \"json\", data: JSON.stringify(details)," +
                    " success: function(result) { $('input[name=list-name-edit]').val(result.list.name);" +
                    " $('textarea[name=list-description-edit]').val(result.list.description);" +
                    " $('edit-list-box').modal('handleUpdate'); }," +
                    " error: function(xhr, status, error) { " +
                    "return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); });" +
                    "$('.list-subscribers').click(function(event) { var details, list_id; event.preventDefault();" +
                    " list_id = $(this).attr('id').substring(17);" +
                    "chosen_list=list_id;"+
                    " details = { list_id: list_id, method: \"list_subscribers\", queue: \"LIST\" };" +
                    " return $.ajax({ url: urlVar, type: \"POST\", datatype: \"json\", data: JSON.stringify(details)," +
                    " success: function(result) {  "+
                    "var i, _i, _len, _ref, _results;"+
                    "$('#subscribers-pane').empty();"+
                    "_ref = result.subscribers;"+
                    "_results = [];"+
                    "_len =_ref.length;"+
                    "for (_i = 0 ; _i < _len ; _i++) {"+
                    "i = _ref[_i];"+
                    " _results.push($('#subscribers-pane').append(" +
                    "\"<div class='media'> <div class='media-left'> <a href='#'> " +
                    "<img class='media-object' src='\" + i.avatar_url +\"' alt='Profile' width='64' height='64'>" +
                    " </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.username + \"</h4> \" " +
                    "+ i.name + \" </div> </div>\"));}" +
                    "return _results"+
                    "}, " +
                    " error: function(xhr, status, error) { " +
                    "return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); });"+
                    " $('.unsub-list').click(function(event) {" +
                    " event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
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
    return $("#add-new-user").click(function (event) {
        var details;
        event.preventDefault();

        _len = 0;
        details = {
            username: $('input[name=new-member]').val(),
            method: "get_user2",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
                event.preventDefault();
                details = {
                    user_id: result.user.id,
                    list_id: chosen_list,
                    method: "add_member",
                    queue: "LIST"
                };
                return $.ajax({
                    url: urlVar,
                    type: "POST",
                    datatype: "json",
                    data: JSON.stringify(details),
                    success: function (result) {
                        $('members-box').hide();
                        return noty({
                            text: 'added successfully',
                            timeout: 2000,
                            type: "success",
                            theme: 'bootstrapTheme'
                        });
                    },
                    error: function (xhr, status, error) {
                        return noty({
                            text: 'An error occured, please try again',
                            timeout: 2000,
                            type: "error",
                            theme: 'bootstrapTheme'
                        });
                    }
                });
            },
            error: function (xhr, status, error) {
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
    return $('a[name=followers]').click(function(event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            method: "followers",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                var i, _i, _len, _ref, _results;
                _ref = result.followers;
                _results = [];
                $("#followers-pane").empty();
                $("#box-name").empty();
                $("#box-name").append("people following you");

                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    i = _ref[_i];
                    _results.push($("#followers-pane").append("<li> "+
                        "<img class='img-avatar' src=' " + i.avatar_url + " ' alt=''>"+
                        " "+(capitalize(i.name))+" <div class='font-w400 text-muted'><small> '@"+ i.username + "'</small></div>  </li>"));

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
    return $('a[name=following]').click(function(event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            method: "following",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                var i, _i, _len, _ref, _results;
                _ref = result.following;
                $("#followers-pane").empty();
                $("#box-name").empty();
                $("#box-name").append("people you follow");
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    i = _ref[_i];
                    _results.push($("#followers-pane").append("<li> "+
                        "<img class='img-avatar' src=' " + i.avatar_url + " ' alt=''>"+
                        " "+(capitalize(i.name))+" <div class='font-w400 text-muted'><small> '@"+ i.username + "'</small></div>  </li>"));
                        /*$("#followers-pane").append("<div class=\"row\"> <div class=\"col-sm-6 col-sm-offset-1\"> <div class=\"media\"> <div class=\"media-left\"> <img class='media-object' src='" + i.avatar_url + "' height='64' width='64'></div> <div class=\"media-body\"> <h4> " + (capitalize(i.username)) + " (@" + i.username + ")</h4> </div> </div> </div> </div>"));*/
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

var is_following = {

    following: function () {

        details =
            { session_id: localStorage.session,
                username: chosen_user.username,
                method: 'is_following_user',
                queue: 'USER' };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                isFollowing = result.following;

                if (isFollowing) {
                 document.getElementById('follow').innerHTML='unfollow';
                }
                else {
                 document.getElementById('follow').innerHTML='follow';
                }

                reload();return isFollowing;
                },
            error: function(xhr,status,error) {
                return noty({
                    text: "An error occured, please try again",
                    timeout: 2000, type:"error",
                    theme: "bootstrapTheme"}); } });
    }
}


$(document).ready(function() {
    return $('#follow').click(function (event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            followee_id: chosen_user.id,
            method: "follow",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
               is_following.following();
                if(!isFollowing){
                noty({
                    text: 'followed ' ,
                    timeout: 1500,
                    type: "success",
                    theme: 'bootstrapTheme'
                });}
               else{
                   noty({
                       text: 'unfollowed ' ,
                       timeout: 1500,
                       type: "success",
                       theme: 'bootstrapTheme'
                   });
               }
               },
            error: function (xhr, status, error) {

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
    return $('#report').click(function (event) {
        var details;
        event.preventDefault();
        details = {
            reported_id: chosen_user.id,
            session_id: localStorage.session,
            method: "report_user",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
                noty({
                    text: 'reported',
                    timeout: 1500,
                    type: "success",
                    theme: 'bootstrapTheme'
                });
            },
            error: function (xhr, status, error) {

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
//2.1.1 microb + massivly sclable
//2.1.2 evaluatuon
//2,2.1 walk through
//portlets
//viewlets
//massivly sclable apps
//back-end arch
//2.2.2implication in user interface design
//massivly sclabl issues
$(document).ready(function() {
    return $("#fav").click(function(event) {
        var details;
        event.preventDefault();
        details = {
            session_id: localStorage.session,
            method: "get_favorites",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                var i, _i, _len, _ref, _results;
                _ref = result.favorites;
                _results = [];
                $("#box-name").empty();
                $("#box-name").append("<h2>Favourites</h2>");
                $("#followers-pane").empty();
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    i = _ref[_i];
                    var output = "<blockquote>" +
                        "                        <div class=\"clearfix\">\n" +
                        "                      <div id=\"my-post-profile-pic\" class=\"pull-left push-15-r\"> " +
                        "<img class='img-avatar img-avatar48' src='" + i.creator.avatar_url + "'  alt=''>" +
                        "</div>"+
                        "<div id=\"my-post-username\" class=\"push-5-t\">" +
                        "<a class='font-w600' >"+i.creator.username+"</a><br> <span class='font-s12 text-muted'>"+  i.created_at.substring(0,11) +"</span>" +
                        "</div> </div>"+
                        "<p>"+i.tweet_text +" </p>" +
                        " </blockquote>" ;
                    _results.push($("#followers-pane").append(output));
                }
                return _results;
                noty({
                    text: "Done"+result,
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
    return $('#posts').click(function (event) {
        var details;
        event.preventDefault();
        details = {
            username: chosen_user.username,
            method: "user_tweets2",
            queue: "USER"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function (result) {
                var favorited, i, output, _i, _len, _ref;
                $("#timeline-container").empty();
                favorited = "fav";
                _ref = result.tweets;
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
                return $("#timeline-container").append("<script> $('.fav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'favorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('fav-tweet'); $(this).addClass('unfav-tweet'); $(this).text(0); return noty({ text: 'post favorited!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if(error.includes('tweet')){ return noty({ text: 'Post already favorited', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.unfav-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(10); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'unfavorite', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { $(this).removeClass('unfav-tweet'); $(this).addClass('fav-tweet'); $(this).text(0); return noty({ text: 'Unfavorite successful!', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } }); }); $('.retweet-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(14); details = { session_id: localStorage.session, tweet_id: tweet_id, method: 'retweet', queue: 'TWEET' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { return noty({ text: 'Repost successful!', timeout: 2000, type: 'success', theme: 'bootstrapTheme' }); }, error: function(xhr, status, error) { if (error.includes(\"retweet\")) { return noty({ text: 'This post, is already reposted', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } else { return noty({ text: 'An error occured, please try again', timeout: 2000, type: 'error', theme: 'bootstrapTheme' }); } } }); }); $('.reply-tweet').click(function(event) { var details; event.preventDefault(); tweet_id = $(this).attr('id').substring(12); }); </script>");
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
                url: urlVar,
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
                    reload();
                    return $(".new-conv-box").modal('hide');
                },
                error: function(xhr, status, error) {
                    if (error.includes("exists")) {
                        return noty({
                            text: 'Username wrong or conversation already exists',
                            timeout: 2000,
                            type: "error",
                            theme: 'bootstrapTheme'
                        });
                    }
                    else
                        if (error.includes("must")) {
                            return noty({
                                text: 'User must be following you first',
                                timeout: 2000,
                                type: "error",
                                theme: 'bootstrapTheme'
                            });
                        }
                    else {
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
            url: urlVar,
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
            url: urlVar,
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
                    url: urlVar,
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
                            if (isEmpty(description) && (description != null)) {
                                description = "No Description";
                                output = "<div class=\"media list-" + i.id + "\"> <div class=\"media-left\"> <img class=\"media-object\" src='" + i.creator.avatar_url + "' alt='Image' width='64' height='64'> </div> <div class=\"media-body  list-entry\" data-toggle='modal' data-target='.list'  id='list-" + i.id + "' name='" + i.name + "'> <h4 class=\"media-heading\">"
                                    + (capitalize(i.name)) + " @" + i.creator.username + "</h4> "
                                    + description + " </div> <button class='pull-right button-transparent delete-list' data-toggle='modal' data-target='.delete-list-box' type='button' id='list-delete-" + i.id + "' > <i style='font-size:2em;' class='fa fa-trash'></i></button> <button class='pull-right button-transparent edit-list' data-toggle='modal' data-target='.edit-list-box' type='button' id='list-edit-" + i.id + "' > <i style='font-size:2em;' class='fa fa-pencil'></i></button> <button class='pull-right button-transparent unsub-list' data-toggle='modal' data-target='.unsub-list-box' type='button' id='list-unsub-" + i.id + "'> <i style='font-size:2em;' class='fa fa-close'></i></button> </div>";
                            }
                            $("#lists-container").append(output);
                        }
                        return $("#lists-container").append("<script> $('.list-entry').click(function(event) { var details, thread_id, list_name; event.preventDefault(); list_id = $(this).attr('id').substring(5); list_name = $(this).attr('name'); details = { list_id: list_id, method: 'get_list_feeds', queue: 'LIST' }; return $.ajax({ url: urlVar, type: 'POST', datatype: 'json', data: JSON.stringify(details), success: function(result) { var i, j, len, other, ref, results; ref = result.list_feeds; results = []; $('#list-header').empty(); $('#list-body').empty(); $('#list-header').append(\"<h4 class='media-heading'>\" + list_name + \"</h4>\"); for (j = 0, len = ref.length; j < len; j++) { i = ref[j]; results.push($('#list-body').append(\"<div class='media'> <div class='media-left'> <a href='#'> <img class='media-object' src='\" + i.creator.avatar_url +\"' alt='Profile' width='64' height='64'> </a> </div> <div class='media-body'> <h4 class='media-heading'>\" + i.creator.name + \"</h4> \" + i.tweet_text + \" </div> </div>\")); } return results; }, error: function(xhr,status,error) { noty({text: 'An error occured, please try again', timeout: 2000, type:'error', theme: 'bootstrapTheme'}); } }); }); $('.delete-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(12); }); $('.edit-list').click(function(event) { var details, list_id; event.preventDefault(); list_id = $(this).attr('id').substring(10); details = { list_id: list_id, method: \"get_list\", queue: \"LIST\" }; return $.ajax({ url: urlVar, type: \"POST\", datatype: \"json\", data: JSON.stringify(details), success: function(result) { $('input[name=list-name-edit]').val(result.list.name); $('textarea[name=list-description-edit]').val(result.list.description); $('edit-list-box').modal('handleUpdate'); }, error: function(xhr, status, error) { return noty({ text: 'An error occured, please try again', timeout: 2000, type: \"error\", theme: 'bootstrapTheme' }); } }); }); $('.unsub-list').click(function(event) { event.preventDefault(); list_id = $(this).attr('id').substring(11); }); </script>");
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
    return $("#confirm-delete-conv").click(function(event) {
        var details;
        event.preventDefault();
        details = {
            conv_id: conv_id,
            session_id:localStorage.session,
            method: "delete_conv",
            queue: "DM"
        };
        return $.ajax({
            url: urlVar,
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
            session_id:localStorage.session,
            tweet_id: tweet_id,
            method: "delete_tweet",
            queue: "TWEET"
        };
        return $.ajax({
            url: urlVar,
            type: "POST",
            datatype: "json",
            data: JSON.stringify(details),
            success: function(result) {
                $(".my-tweet-" + tweet_id).hide();
                return noty({
                    text: 'post Deleted!',
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
