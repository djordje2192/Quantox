
var lat;
var log;
var url
var coffePlace = [];
var allowGeolocation=true;

function getLocation() {
  allowGeolocation = confirm("Allow to use geolocation");
  if(!allowGeolocation) return;
   if (navigator.geolocation) {

       navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       alert("Geolocation is not supported by this browser.");
    }

}

function GetData()
{
    if(!allowGeolocation) return;

  $.ajax(url,{
      success:function(data){

      var items=data.response.groups[0].items
      var i=0;

      var placeName;
      var priceRange;
      var distance;
      var count=0;
      console.log( items.length);
      for(i=0;i<items.length;i++){

        if(items[i].venue.location.distance<1000)
        {
          placeName=items[i].venue.name;
          if(items[i].venue.price!=null)
           priceRange=items[i].venue.price.message;
           else {
             priceRange="Expensive";
           }
          distance=items[i].venue.location.distance;

          coffePlace[count]={placeName:placeName,priceRange:priceRange, distance:distance}
          console.log( coffePlace[count]["placeName"]);
          count ++;
            console.log(count);
        }

      }

      sortByDistance();
    }
  });


}

function sortByDistance() {
    coffePlace.sort(function(a, b){
        var x = a.distance;
        var y = b.distance;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    DispleyData();
}

function sortByPrice()
{
  coffePlace.sort(function(a, b){




        var x = a.priceRange.trim().toLowerCase();
        var y = b.priceRange.trim().toLowerCase();

         console.log(x+" "+y);
        if ((x=="moderate" || x=="expensive") && y=="cheap") {return 1;}
        if (x=="expensive" && y=="moderate") {return 1;}
        if ((y=="moderate" || y=="expensive") && x=="cheap") {return -1;}
        if (y=="moderate" && x=="expensive") {return -1;}
        return 0;


  });

  DispleyData();
}

function DispleyData()
{
  var table = document.getElementById("myTable");
  deleteRow(table);
 var i=0;
 var counter=0;
  for(i=0;i<coffePlace.length;i++)
  {
    if(i==10) break;

   var row = table.insertRow(i);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3)
   cell1.innerHTML="<img src='images_opt.jpg' />"
   cell2.innerHTML = coffePlace[i]["placeName"];
   cell3.innerHTML = coffePlace[i]["priceRange"];
   cell4.innerHTML = coffePlace[i]["distance"];
 }
}
function showPosition(position) {
     lat=position.coords.latitude ;
     log= position.coords.longitude;
     url='https://api.foursquare.com/v2/venues/explore?ll='+lat+','+log+'&oauth_token=VS1UDLRJ1HETIVQEJRUPRNTWGIRTPEC5MNZSOFFZUA4UA2I3&v=20170809'
     GetData();

}

function deleteRow(table) {
    while(table.rows[0]) table.deleteRow(0);
}
