


function handleAddress(input) {
	var formattedInput = input.split(' ').join('%20');
	httpGetAsync('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyAvP71A4zQ3bBjri75-1y6AaLP3s-JfNO0', handleLocation);
	
}

handleAddress("Yosemite");

function handleLocation(input) {
	var inputJSON = JSON.parse(input);
	httpGetAsync('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + inputJSON.results[0].geometry.location.lat +','+ inputJSON.results[0].geometry.location.lng +'&radius=500&type=park&key=AIzaSyAvP71A4zQ3bBjri75-1y6AaLP3s-JfNO0', print);

}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}



function print (text) {
	console.log(JSON.parse(text));
}