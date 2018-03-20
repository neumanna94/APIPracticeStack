import $ from 'jquery';
import '../css/styles.css';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports?apiaccesscode={614be265-a38a-4680-b372-7463571f336a}';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    GeneratePage(text);
    alert('Response from CORS request to ' + url);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function GeneratePage(text){
  $("#traffic").append(text);

}

$(document).ready(function() {
  $('#apiCall1').click(function() {
    makeCorsRequest();

  });
});
