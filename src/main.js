import $ from 'jquery';
import '../css/styles.css';
function loadPhotos(){
  var api_key = "d6d4cc6efd53dff1eddf811b010550f6";

  var method = 'GET';
  
  var url = 'https://api.flickr.com/services/rest/?' +
      'method=flickr.people.getPublicPhotos&' +
      'user_id=44855005%40N04&' +
      'extras=url_q&format=json&nojsoncallback=1&' +
      'api_key=' + api_key;
    console.log(url);
  var xhr = new XMLHttpRequest();
  if(!('withCredentials' in xhr)) {
    console.log("Browser does not support CORS");
    alert('Browser does not support CORS.');
    return;
  }
  xhr.open(method, url);

  xhr.oneerror = function() {
    console.log("oneerror");
    alert('There was an error.');
  };
  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
      var photosDiv = document.getElementById('photos');
      photosDiv.innerHTML = '';
      var photos = data.photos.photo;
        console.log(photos);
        generatePhotos(photos);
    } else {
      alert(data.message);
    }
  };
  xhr.send();
}
function generatePhotos(inputListOfPhotos){
  $("#photos").text();
  $("#photos").append("<h2> User Id: "+inputListOfPhotos[0].owner+"</h2>");
  for(var i = 0 ; i < inputListOfPhotos.length; i ++){
    $("#photos").append("<div class='col-md-2'><h4><a href='" + inputListOfPhotos[i].url_q + "'>" + inputListOfPhotos[i].title + "</a><img src='"+inputListOfPhotos[i].url_q + "'></div>");
  }
}
$(document).ready(function() {
  loadPhotos();
});
