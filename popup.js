// popup.js
// Kevin Tran

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

var url = 'https://newsapi.org/v2/everything?' +
          'q=nba&' +
          'sources=espn,fox-sports,bleacher-report&' +
          'from=' + yyyy + '-' + mm + '-' + dd + '&' +
          'language=en&' +
          'sortBy=popularity&' +
          'apiKey=9686d92a39f845f9aab9f7674aa08654';

var articleList = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"];
var imgList = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10"];
var req = new Request(url);

fetch(req)
    .then(checkStatus)
    .then(getJSON)
    .then(function(data) {
      for (var i = 0; i < 10; i++) {
        //var img = document.createElement('img');
        //img.src = data.articles[i].urlToImage;
        //document.getElementById('articles').appendChild(img);
        document.getElementById(imgList[i]).src = data.articles[i].urlToImage;
        document.getElementById(articleList[i]).innerHTML = data.articles[i].title;
        document.getElementById(articleList[i]).href = data.articles[i].url;
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
    });

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
/*
function createImage(link) {
  var x = document.createElement("IMG");
  x.setAttribute("src", link);

  x.setAttribute("alt", "Image");
  document.body.appendChild(x);
}

function createHyperlink(title, link) {
  var a = document.createElement('a');
  var linkText = document.createTextNode(title);
  a.appendChild(linkText);
  a.title = title;
  a.href = link;
  document.body.appendChild(a);
}
*/
