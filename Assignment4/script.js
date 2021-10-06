/*
    Assignment 4
    Trevor Slobodnick
*/

$(document).ready(function(){
    //Set initial text to loading...
    $("#youarehere").text("Current Location: Loading...");

    // Get coordinates from local storage
    let coords = JSON.parse(localStorage.getItem("coords"));

    //Check if localStorage is defined
    if (localStorage == null){
        $("#youarehere").text("Local Storage Unavailable. Please allow access to use this website");
    }
    else{
        //this is run asynchronously
        navigator.geolocation.getCurrentPosition(
            // run if successful
            function(pos){
                // Display current location
                let locDisplayStr = "(" + pos.coords.latitude + ", " + pos.coords.longitude + ")";
                $("#youarehere").text("Current Location: " + locDisplayStr);
                // Write coords as json string to local storage
                let locJSONStr = "{\"lat\":\"" + pos.coords.latitude + "\",\"lon\":\"" + pos.coords.longitude + "\"}";
                localStorage.setItem("coords", locJSONStr);
                // Check if it is the users first time visiting (no location in local storage)
                if (coords === null){
                    $("#content").append(`<p>Welcome first time visitor!</p>`);
                }
                else{
                    $("#content").append(`<p>Stored Location: (${coords.lat}, ${coords.lon})</p>`);
                    // Display distance from current position to position stored in local storage
                    let distance = calcDistance(pos.coords.latitude, pos.coords.longitude, coords.lat, coords.lon);
                    $("#content").append(`<p>Distance from stored location: ${distance}</p>`);
                }
            }, 
            //run if error occurred
            function(posError){
                $("#youarehere").text("Geolocation Unavailable. Please enable it to use this website");
            }
        );
    }





    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }
});


