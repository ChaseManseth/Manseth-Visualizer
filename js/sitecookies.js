function checkCookies() {
    // Check if is a users first time on the site
    var firstTime = Cookies.get('firstTime');

    // Check if the cookie is undefined
    if (firstTime === undefined) {
        // Set it to false if it doesn't exist
        Cookies.set('firstTime', 'false');
    }


    // Visualizer bar color cookies
    var fc = Cookies.get('fc');
    var sc = Cookies.get('sc');

    // Check if the first color is undefined
    if (fc === undefined) {
        // If so set values to default
        Cookies.set('fc', 'red');
        fc = 'red';
    }

    // Check if the second color is undefined
    if (sc === undefined) {
        // If so set values to default
        Cookies.set('sc', 'black');
        sc = 'black';
    }

    // Set the values of the inputs
    $('#firstColor').val(fc);
    $('#secondColor').val(sc);

    // Finally add the gradient
    grade('' + fc + '', '' + sc + '');

    // Change the upload button color to the first color value

    // Volume cookies
    var volCook = Cookies.get('vol');

    // Check if the value is undefined
    if (volCook === undefined) {
        // If so set volume to 100
        Cookies.set('vol', '1');
        volCook = 1;
    }

    // On load it sets the volume and changes the silder
    $(".vol").slider("option", "value", volCook * 100);
    aud.volume = volCook;


    // Background color cookies
    var bkgColor = Cookies.get('bkgColor');

    // Check if background color is undefined
    if (bkgColor === undefined) {
        // If so set the background color to black
        Cookies.set('bkgColor', 'black');
        bkgColor = "black";
    }

    // Set Background Color
    $('body').css("background-color", bkgColor);
    // Set color value in the input 
    $('#bkgColor').val(bkgColor);


    // Degree value Cookie
    var degCookie = Cookies.get('degCookies');
    // Check if the cookie  doesn't have value
    if (degCookie === undefined) {
        // Check if a mobile device is not being used
        if (!detectmob()) {
            // Check is the browser is chrome
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            if (isChrome) {
                // If true set to 3
                Cookies.set('degCookies', '3');
                degCookie = 3;
            } else {
                // If false set to 2
                Cookies.set('degCookies', '2');
                degCookie = 2;
            }
        } else {
            // If mobile device set to 1
            Cookies.set('degCookies', '1');
            degCookie = 1;
        }
    }

    // Set value
    $(".degree").slider("value", degCookie);
    $(".degval").html("Current Value: " + degCookie);


    // Variability value cookie
    var variability = Cookies.get('variability');
    // Check if the cookie doesn't have a value
    if (variability === undefined) {
        // If so, set the default value
        Cookies.set('variability', '3');
        variability = 3;
    }

    // Set value
    $(".variability").slider("value", variability);
    $(".variabilityval").html("Current Value: " + variability);


    // Radius value cookie
    var rad = Cookies.get('radius');
    //Check if the cookie doesn't exist
    if (rad === undefined) {
        // Check if a mobile device is being used
        if (!detectmob()) {
            Cookies.set('radius', '160');
            rad = 160;
        } else {
            // If a mobile device is being used
            Cookies.set('radius', '50');
            rad = 50;
        }
    }


//    // Set rotation of the visualizer
//    var rotate = Cookies.get('rotate'); // Default 0
//    // Chekc if the cookie doesn't exist
//    if (rotate === undefined) {
//        Cookies.set('rotate', 0);
//        rotate = 0;
//    } else {
//        Cookies.set('rotate', 0);
//        rotate = 0;
//    }




    // Setting variables for future updates
    var numBars = Cookies.get('numBars'); // Base Number of bars before degree || Maybe remove it
    var reflect = Cookies.get('reflect'); // T/F
    // Browser def = 160px but add functions to adjust based on mobile and browser size
    var radiusChangeBass = Cookies.get('rBass'); // Default true
    var minSnip = Cookies.get('snip'); // Default 99

    console.log("Cookies Checked");
}
