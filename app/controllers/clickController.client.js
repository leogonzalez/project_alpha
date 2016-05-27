'use strict';

(function(){
  var addButton = document.querySelector('.btn-add');
  var deleteButton = document.querySelector('.btn-delete');
  var clickNbr = document.querySelector('#click-nbr');
  var apiUrl = appUrl + '/api/:id/clicks';

  function updateClickCount(data){
    var clicksObject = JSON.parse(data); // takes a string and truns into a JSON object
    clickNbr.innerHTML = clicksObject.clicks; //gets the value from clicks property
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

  addButton.addEventListener('click',function(){

      ajaxFunctions.ajaxRequest('POST',apiUrl, function(){
        ajaxFunctions.ajaxRequest('GET',apiUrl,updateClickCount)
      });

  },false);// closes addButton event listener

  deleteButton.addEventListener('click',function(){

      ajaxFunctions.ajaxRequest('DELETE',apiUrl,function(){
        ajaxFunctions.ajaxRequest("GET",apiUrl,updateClickCount);
      });

  },false);

})();
