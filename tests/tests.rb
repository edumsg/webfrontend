require 'net/http'
require 'json'
require 'uri'

@uri = URI("http://localhost:8080")
=begin
The following are tests that send demo JSON requests to the server to check that there is no
issue in the front end. The tests need to be edited for each method as they are generated using perl 6.
=end

def confirm_follow
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'confirm_follow', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def follow
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'follow', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def followers
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'followers', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def following
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'following', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_favorites
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_favorites', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_feeds
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_feeds', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_list_memberships
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_list_memberships', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_mentions
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_mentions', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_retweets
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_retweets', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_subscribed_lists
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_subscribed_lists', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def timeline
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'timeline', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_user
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_user', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_users
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'get_users', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def login
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'login', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def logout
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'logout', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def register
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'register', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def report_user
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'report_user', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def unconfirmed_followers
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'unconfirmed_followers', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def unfollow
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'unfollow', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def update_user
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'USER', 'method': 'update_user', 'user_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def delete_tweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'delete_tweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def favorite
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'favorite', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_tweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'get_tweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def tweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'tweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def reply
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'reply', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def report_tweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'report_tweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def retweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'retweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def unfavorite
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'unfavorite', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def unretweet
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'TWEET', 'method': 'unretweet', 'tweet_id': '', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def add_member
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'add_member', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def create_list
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'create_list', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def delete_list
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'delete_list', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def delete_member
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'delete_member', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_list_feeds
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'get_list_feeds', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def list_members
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'list_members', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def list_subscribers
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'list_subscribers', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def subscribe
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'subscribe', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def unsubscribe
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'unsubscribe', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def update_list
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'LIST', 'method': 'update_list', 'list_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def create_dm
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'create_dm', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def delete_conv
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'delete_conv', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def delete_dm
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'delete_dm', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_conv
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'get_conv', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def get_convs
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'get_convs', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def mark_all_conv_read
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'mark_all_conv_read', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end

def mark_conv_read
    req = Net::HTTP::Post.new(@uri, initheader = {'Content-Type' => 'application/json'})
    req.body = {'queue': 'DM', 'method': 'mark_conv_read', 'dm_id': '2', '_id': ''}.to_json
    res = Net::HTTP.start(@uri.hostname, @uri.port) do |http|
        http.request(req)
    end
    return res.body
end
