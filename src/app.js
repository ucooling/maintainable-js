$(document).ready(function(){
  var count = 1;

  $('#searchButton').click(renderLocation);
  $('#results').on('click', '.like', addLike);
  $('#likedPlaces').on('click', '.like', removeLike);

  function renderLocation(){
    var locationInput = $('#locationInput').val();
    var requestUrl = "http://location-backend-service.herokuapp.com/locations?name="+locationInput;
    var locationTemplate = "<% _.each(data,function(item){ %><div class='panel large-12 columns'><h5><%= item.name %></h5><h6><%= item.description %></h6><a href='javascript:void(0)' class='like button tiny right'>Like</a></div><% }) %>";

    $.get(requestUrl, function(data){
      $('#results').html(_.template(locationTemplate, {variable: 'data'})(data));
    }).fail(function() {
      Console.log("Request fails!");
    });

  }

  function addLike(e){
    if(e.target.textContent === "Unlike") return;
    var locationName = $(this).parent().find('h5').text();
    var ClassName = "like" + (count++)
    var locationNameTemplate = "<li class=like id="+ClassName+"><%= name %></li>";
    $('#likedPlaces').find('ul').last('li').append(_.template(locationNameTemplate, {variable: 'name'})(locationName));
    e.target.textContent="Unlike";
    e.target.setAttribute("class", "like button tiny right "+ ClassName);
  }

  function removeLike(e){
    $("#"+e.target.id).remove();
    $("."+e.target.id)[0].innerText="Like";
  }
});