var oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

var dd = oneWeekAgo.getDate();
var mm = oneWeekAgo.getMonth() + 1;
var yyyy = oneWeekAgo.getFullYear();

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

var newsurl = 'https://newsapi.org/v2/everything?' +
          'q=nba&' +
          'sources=espn,business-insider,bleacher-report&' +
          'from=' + yyyy + '-' + mm + '-' + dd + '&' +
          'language=en&' +
          'sortBy=relevancy&' +
          'apiKey=9686d92a39f845f9aab9f7674aa08654';

fetch(newsurl)
    .then(checkStatus)
    .then(getJSON)
    .then(function(data) {
      for (let i = 0; i < 10; i++) {
        createImage(data, i);
        createLink(data, i);
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
    });

var redditurl = 'https://www.reddit.com/r/nba.json?limit=12';

fetch(redditurl)
    .then(checkStatus)
    .then(getJSON)
    .then(function(datavar) {
      for (let i = 2; i < 12; i++) {
        createRedditPost(datavar, i);
      }
    })

document.addEventListener('DOMContentLoaded', () => {
  var box = document.getElementById('check');
  box.addEventListener('click', () => {
    toggleCheckbox();
  });
});

/*********************************************
**********************************************
HELPER FUNCTIONS
**********************************************
*********************************************/

function checkStatus(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(
      new Error(response.statusText));
  }
}

function getJSON(response) {
  return response.json();
}

function createImage(data, count) {
  var imglink = document.createElement('a');
  var img = document.createElement("img");
  imglink.href = data.articles[count].url;
  imglink.target = "_blank";
  if (data.articles[count].urlToImage) {
    img.src = data.articles[count].urlToImage;
    img.className = "article-img";
  } else {
    img.src = "https://preview.ibb.co/fzgBm8/nbalogo.jpg";
    img.className = "default-img";
  }
  imglink.appendChild(img);
  document.getElementById("articles").appendChild(imglink);
}

function createLink(data, count) {
  var link = document.createElement('a');
  link.href = data.articles[count].url;
  link.textContent = data.articles[count].title;
  link.target = "_blank";
  link.className = "link-btn";
  document.getElementById("articles").appendChild(link);
}

function createRedditPost(datavar, count) {
  postURL = "https://www.reddit.com" + datavar.data.children[count].data.permalink;

  var iDiv = document.createElement("div");
  iDiv.className = "post-container";

  var upvote = document.createElement('a');
  upvote.className = "upvotes";
  upvote.href = postURL;
  upvote.textContent = datavar.data.children[count].data.ups;
  upvote.target = "_blank";
  iDiv.appendChild(upvote);

  var comment = document.createElement('a');
  comment.className = "comments";
  comment.href = postURL;
  comment.textContent = datavar.data.children[count].data.num_comments;
  comment.target = "_blank";
  iDiv.appendChild(comment);

  var link = document.createElement('a');
  link.className = "postTitle";
  link.href = datavar.data.children[count].data.url;
  link.textContent = datavar.data.children[count].data.title;
  link.target = "_blank";
  iDiv.appendChild(link);

  document.getElementById("redditposts").appendChild(iDiv);
}

function toggleCheckbox() {
  var reddit_posts = document.getElementById("redditposts");
  var articles = document.getElementById("articles");
  var reddit_bar = document.getElementById("redditbar");

   if (reddit_posts.style.display === "none") {
       reddit_posts.style.display = "block";
       reddit_bar.style.display = "flex";
       articles.style.display = "none";
   } else {
       reddit_posts.style.display = "none";
       reddit_bar.style.display = "none";
       articles.style.display = "block";
   }
}
