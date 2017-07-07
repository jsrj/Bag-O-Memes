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


      <form action='/discover' method='post'>
<select multiple="multiple" id="my-select" name="searchWord">
      <option value='blep'>blep</option>
      <option value='elem_2'>elem 2</option>
      <option value='elem_3'>elem 3</option>
      <option value='elem_4'>elem 4</option>
      ...
      <option value='elem_100'>elem 100</option>
    </select>
    <button type='submit'>DO THE THING</button>
</form>


#Data output example from hidden form
http://localhost:3000/discover?
 memeName=In+every+species+exists+a+little+brother+Blep.
&memeSource=r%2FBlep&originalPoster=golie-moelie
&sharedBy=Arjay+Jerome
&fileURL=http%3A%2F%2Fi.imgur.com%2F6fwQvXu.jpg
&thumbnailURL=https%3A%2F%2Fb.thumbs.redditmedia.com%2F3_Q8OFuFA4E7kFQxkUCWLanum15Eda5s_ONp4ezbYuE.jpg
&nsfw=false



http://localhost:3000/discover?
memeName=blep
&memeSource=www.reddit.com
&sharedBy=Arjay+Jerome
&fileURL=https%3A%2F%2Fmedia0.giphy.com%2Fmedia%2FSewaEY6yMH6x2%2Fgiphy.gif
&mode=giphy









>> I want to click on "add to bag", and have a menu appear that shows my different bags.
>> When I select a bag name, I want that click to act like a submit button which creates a new meme based on the meme-model and saves that to the DB without a redirect (so that I can keep browsing).


router.post(
        '/collections', // route link
        fileUploader.single('fileURL'), // single means 'use multer to process a single file' | matches input field name in view
        (req, res, next) => // callback
          {
            let dbFile;
              if (typeof req.file === 'undefined') {
                dbFile = req.body.linkURL;
              } else {
                dbFile = /uploads/ + req.file.filename;
              }
            const theBag = new MemebagModel
            ({
              collectionName    : req.body.collectionName,
              collectionDetails : req.body.collectionDetails,
              collectionCategory: req.body.collectionCategory,
              fileURL           : dbFile, // directory multer creates, and filename is randomized by multer. multer creates req.file.
              owner             : req.user.fullname,
              ownerByID         : req.user._id,
            });
            console.log(req.file);
            theBag.save((err) =>
            {
              if(err) {
                next(err);
                return;
              }
              UserModel.findByIdAndUpdate(req.user._id,{
                    $set: {bagCount : req.user.bagCount + 1}
              }, (err, result) => {
                if (err){
                  next(err);
                  return;
                }
                res.redirect('/collections');
              });
            });
          });



foreach iterate through each bag and create one of these tags...

<select class="ui search dropdown">
<% ALLtheMemes.forEach(meme) => {

}
  <option value="">State</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="DC">District Of Columbia</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
</select>

http://localhost:3000/discover?
memeName=blep
&memeSource=www.reddit.com
&sharedBy=Arjay+Jerome
&fileURL=https%3A%2F%2Fmedia0.giphy.com%2Fmedia%2FhPVxBqlvGiyoU%2Fgiphy-downsized-large.gif
&mode=giphy

http://localhost:3000/discover?
memeName=blep
&memeSource=www.reddit.com
&sharedBy=Arjay+Jerome
&fileURL=https%3A%2F%2Fmedia1.giphy.com%2Fmedia%2FSewaEY6yMH6x2%2Fgiphy.gif
&mode=giphy

http://localhost:3000/discover?
memeName=frustrated
&memeSource=&sharedBy=Arjay+Jerome
&fileURL=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2F3o7TKArz9oG9csOJi0%2Fgiphy.gi
f&mode=giphy
&targetBag=oneBag._id

http://localhost:3000/discover?
 memeName=frustrated&memeSource=
&sharedBy=Arjay+Jerome&fileURL=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2F3o7TKArz9oG9csOJi0%2Fgiphy.gif
&
mode=giphy
&targetBag=oneBag._id

http://localhost:3000/discover?memeName=frustrated&memeSource=&sharedBy=Arjay+Jerome&fileURL=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2F3o7TKArz9oG9csOJi0%2Fgiphy.gif&mode=giphy&targetBag=595f9f6ce490175229777e10