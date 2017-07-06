# bagofmemes
A social contacts collection to keep track of your networked connections.


# Redditor API
## The below code will parse through a given subreddit and pull the GIF URLs for each post.

var redditor = require("redditor");

reddit.get('/r/reallifedoodles.json', function(err, response) {
    if(err) throw err;
    response.data.children.forEach(function(post) {
    console.log(post.data.url); //
    });
});

#May Need in new-collection-view
<% var fixedUrl = split.join('.'); %>
      <% return fixedUrl; %>

      usermode findbyid
      usermodel update