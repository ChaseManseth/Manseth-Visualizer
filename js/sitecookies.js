function checkCookies() {
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
    
    
    // Volume cookies
    var volCook = Cookies.get('vol');
    
    // Check if the value is undefined
    if(volCook === undefined) {
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
    if(bkgColor === undefined) {
        // If so set the background color to black
        Cookies.set('bkgColor', 'black');
        bkgColor = "black";
    }
    
    // Set Background Color
    $('body').css("background-color", bkgColor);
    // Set color value in the input 
    $('#bkgColor').val(bkgColor);
    
}

