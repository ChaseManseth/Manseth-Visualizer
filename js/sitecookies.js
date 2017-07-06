function checkCookies() {
    // Check cookies on the two colors of the bars / visualizer
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
}

// Getters and Setters for onload
$(document).ready(function() {
    // Get First Color
    function getFC() {
        return Cookies.get('fc');
    }
    
    // Get Second Color
    function getSC() {
        return Cookies.get('sc');
    }
});