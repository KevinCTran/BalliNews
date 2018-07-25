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

var req = new Request(url);

fetch(req)
    .then(checkStatus)
    .then(getJSON)
    .then(function(data) {
      for (var i = 0; i < 10; i++) {
        createImage(data, i);
        createLink(data, i);
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
    });


/* HELPER FUNCTIONS */

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
  img.src = data.articles[count].urlToImage;
  imglink.appendChild(img);
  document.getElementById("articles").appendChild(imglink);
}

function createLink(data, count) {
  var link = document.createElement('a');
  link.href = data.articles[count].url;
  link.innerHTML = data.articles[count].title;
  link.target = "_blank";
  link.className = "link-btn";
  document.getElementById("articles").appendChild(link);
}
