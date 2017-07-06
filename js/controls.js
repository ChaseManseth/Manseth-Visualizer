
// Event listener for space keypress to play and pause
$(document).keypress(function (e) {
    if (e.which == 32) {
        toggleState();
    }
});

// Toggle played and paused states
var play = $("#play");
play.click(function () {
    toggleState();
});

// Show the settings modal
var setting = $('.settings');
setting.on("click", function () {
    $('#set').modal('show')
});

// Play the next song
var next = $("#next");
next.on("click", function () {
    toggleState();

    nextSong();

    toggleState();
});

// Play previous song or restart current song. Depends on the time value
var previous = $("#prev");
previous.on("click", function () {
    toggleState();

    prevSong();

    toggleState();
});

// Show the upload song modal
var upl = $('#upload');
upl.on("click", function () {
    $('#uploadSong').modal('show');
});

// Show default songs modal 
var def = $('#defaultSongs');
def.on("click", function () {
    $('#defaultSong').modal('show');
});

// Play a song from the default songs modal
var pos = 0;
$('.defaultSongPlay').each(function (pos, elem) {
    $(this).click(function () {
        var songNumber = pos;
        aud.src = srcList[songNumber];
        getInfo(songNumber);
        toggleState();

        $('#defaultSong').modal('hide');
    });
});
pos++;


// Change gradient color
function grade(first, second) {
    $('.bar').css("background", function () {
        return "-webkit-linear-gradient(" + first + ", " + second + ")";
    });
}

// Add event listener for the change in the first and second inputs
$('#firstColor').on("change", function () {
    var f = $('#firstColor').val();
    var s = $('#secondColor').val();
    grade(f, s);
});

$('#secondColor').on("change", function () {
    var f = $('#firstColor').val();
    var s = $('#secondColor').val();
    grade(f, s);
});

// Bootstrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


// Degree Slider
// Get the silder and the input to store values
var degSlider = $('#degree');
var degVal = $('.degval');
degVal.html("Current Value: " + degSlider.val());
// When ever the silder is used change value in the input and run function to reload
degSlider.on("change", function () {
    degVal.html("Current Value: " + degSlider.val());
    degreeSet(degSlider.val());
});

// Volume Slider
var volSlider = $('#volume');
var volumeSlider = $('.vol');
// Create the slider 
volumeSlider.slider({
    range: "min",
    animate: "slow",
    value: 100,
    min: 0,
    max: 100,
    step: 1
});

// When ever the silder is used change value in the input and run function to reload
volumeSlider.on('slide', function(event, ui) {
    var val = ui.value / 100;
    aud.volume = val;
});

// Mute click listener
var mute = $('.lowvol');
mute.on('click', function () {
    aud.volume = 0;
    volumeSlider.slider("option", "value", 0);
});

// Full volume click listener
var full = $('.highvol');
full.on('click', function () {
    aud.volume = 1;
    volumeSlider.slider("option", "value", 100);
});


// Hide all alerts
$('#degreeWarning').hide();

// Seekbar
// Creates the seekbar when the page loads
var seekbar = $('.seek');
seekbar.slider({
    range: "min",
    animate: "slow",
    value: 0,
    min: 0,
    step: 1
});

// When the slider is being dragged the time values change
seekbar.on('slide', function (event, ui) {
    var bef = $('#bef');
    var aft = $('#aft');
    
    var val = ui.value;
    var lastVal = Math.floor(aud.duration) - val;
    bef.html(formatTime(val));
    aft.html("-" + formatTime(lastVal));
});

// When the slider moves it stops the interval so the user can continue to change the value as the song still plays
seekbar.on('slidestart', function (event, ui) {
    seekTrue = false;
});

// Once the user drops the handler it restarts the time interval and changes song position
seekbar.on('slidestop', function (event, ui) {
    seekTrue = true;
    var vals = ui.value;
    aud.currentTime = vals;
    seekBar();
});


// Sets the max value of the seekbar when a new song starts
function newSong() {
    setTimeout(function () {
        var length = Math.floor(aud.duration);

        $(".seek").slider("option", "max", length);
    }, 1000);
}

// Shuffle function
var toggleShuffle = false;
var s = $('.shuffle');
s.on('click', function() {
   if(toggleShuffle) {
       toggleShuffle = false;
       shuffle = false;
       s.removeClass('controlActive');
   } else {
       toggleShuffle = true;
       shuffle = true;
       s.addClass('controlActive');
   }
});

// Repeat function
var toggleRepeat = false;
var r = $('.repeat');
r.on('click', function() {
    if(toggleRepeat) {
        toggleRepeat = false;
        re = false;
        r.removeClass('controlActive');
    } else {
        toggleRepeat = true;
        re = true;
        r.addClass('controlActive');
    }
});


// Function for positioning the bars
function getPos() {
    var width = window.innerWidth;
    var x;
    
    console.log(width);
    x = (-width + 764.45)/2.101;
    
    return x;
}


