// Event listener for space keypress to play and pause
$(document).keypress(function(e) {
  if(e.which == 32) {
    toggleState();
  }
});

// Toggle played and paused states
var play = $("#play");
play.click(function() {
    toggleState();
});

// Show the settings modal
var setting = $('.settings');
setting.on("click", function() {
    $('#set').modal('show')
});

// Play the next song
var next = $("#next");
next.on("click", function(){
    toggleState();
    
    nextSong();
    
    toggleState();
});

// Play previous song or restart current song. Depends on the time value
var previous = $("#prev");
previous.on("click", function() {
    toggleState();
    
    prevSong();
    
    toggleState();
});

// Show the upload song modal
var upl = $('#upload');
upl.on("click", function() {
    $('#uploadSong').modal('show');
});

// Show default songs modal 
var def = $('#defaultSongs');
def.on("click", function() {
    $('#defaultSong').modal('show');
});

// Play a song from the default songs modal
var pos = 0;
$('.defaultSongPlay').each(function(pos, elem){
    $(this).click( function() {
//        var songNumber = $(this).closest('.defaultSongPlay').children('.inner').text();
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
    $('.bar').css("background", function() {
        return "-webkit-linear-gradient(" + first + ", " + second + ")"; 
    });
}

// Add event listener for the change in the first and second inputs
$('#firstColor').on("change", function() {
    var f = $('#firstColor').val();
    var s = $('#secondColor').val();
    grade(f, s);
});

$('#secondColor').on("change", function() {
    var f = $('#firstColor').val();
    var s = $('#secondColor').val();
    grade(f, s);
});
