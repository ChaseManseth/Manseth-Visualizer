// Create audio context
var AUDIO = new (window.AudioContext || window.webkitAudioContext)();
if (!AUDIO) {console.error('Web Audio API not supported :(');}

// Create and configure analyser node and storage buffer
var analyser = AUDIO.createAnalyser();
analyser.fftSize = 512;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

// Cache HTML elements
var viz = document.getElementById('viz'),
    aud = document.getElementById('audio');

// Creates many boxes 
function createBars(numBars) {
    var barCollection = [];
    
    console.log('numBars', numBars);
    
    for (var i = 0; i <= numBars; i++) {
        var a = document.createElement('div');
        a.classList.add('bar');
        
        viz.appendChild(a);
        barCollection.push($(a));      
    }
    
    return barCollection;
}

// $bars is an array of all the bars creates
var $bars = 0;
// snip is trimming the last blank buffer length
var snip = 99;
// n is the degree of the smoothing algorithm
var n = 3;

// Verify degree
// Ask a question once for higher degrees
var ans = false;
function degreeSet(x) {
    if(x > 5) {
        if(!ans) {
            toggleState(); // Pause
            $('#degreeWarning').show();
            
            // User answers yes
            $("#degYes").on("click", function() {
                ans = true;
                $('#degreeWarning').hide();
                degreeSet(x);
            });
            
            // Users answers no
            $("#degNo").on("click", function() {
                ans = false;
                $('#degreeWarning').hide();
                degreeSet(3);
                
                // Set the input bar back to three
                $('#degree').val(3);
                $(".degval").html("Current Value: " + $('#degree').val());
            });
            
            toggleState(); // Play
        } else {
            // Removes all elements
            document.getElementById("viz").innerHTML='';
            // Sets the seg array to 0 and creates them again with the proper amount of segs
            $bars = 0;
            $bars = createBars((((bufferLength - snip) - 1) * 2) * x);
            // Restyle it because we have more or less segs now and must adjust
            style();
            n = x;
        } 
    } else {
         // Removes all elements
        document.getElementById("viz").innerHTML='';
        // Sets the seg array to 0 and creates them again with the proper amount of segs
        $bars = 0;
        $bars = createBars((((bufferLength - snip) - 1) * 2) * x);
        // Restyle it because we have more or less segs now and must adjust
        style();
        n = x;
    }
}


// Main render and update method
function update() {
    analyser.getByteFrequencyData(dataArray);
    
    // Copy the dataArray without high frequencies
    var low = [];
    var len = (bufferLength - snip);
    
    for(var i = 0; i <= len; i++) {
        low.push(dataArray[i]);
    }
    
    // Use Scott's parabolic approximation function
    var smooth = [];
    smooth.push(Math.floor(low[0]));
    
    for(var i = 1; i < low.length - 1; i += 2) {

        var c = low[i];
        var a = (low[i+1] + low[i-1] - 2*low[i]) / 2.0;
        var b = (low[i+1] - low[i-1]) / 2.0;
        
        for(var j = 1; j < n; j++) {
            smooth.push(Math.floor(a * (1.0/n) * (1.0/n) * j + b * (1.0/n) * (-1) * j + c));
        }
        
        smooth.push(Math.floor(low[i]));
        for(var j = 1; j < n; j++) {
            smooth.push(Math.floor(a * (1.0/n) * (1.0/n) * j + b * (1.0/n) * j + c));
        }
        
        smooth.push(Math.floor(low[i+1]));
    }
    
    // Translate modified array
    var a = 0;
    
    // First half going clockwise
    for(var i = 0; i < smooth.length; i++) {
        var width = smooth[i]; 
        $bars[a].css('height', width);
        a++;
    }
    
    // Second half going counter-clockwise
    for(var i = smooth.length - 1; i > 0; i--) {
        var width = smooth[i];        
        $bars[a].css('height', width);
        a++;
    }
}


// Initiate function
function init() {
    // Connect audio to analyser and analyze audio
    console.log('init');
    var source = AUDIO.createMediaElementSource(aud);
    source.connect(analyser);
    analyser.connect(AUDIO.destination);
    
    $bars = createBars((((bufferLength - snip) - 1) * 2) * n);  
    style();
    start(true);
}

// Start the song is paused and vice versa
var reload;
var seek;
function start(x) {
    if(x) {
        aud.play();
        // Plays the song
        reload = setInterval(function() {update()}, 10);
        
        // Updates the seek bar
        seek = setInterval(function() {seekBar()}, 1000);
    } else {
        aud.pause();
        clearInterval(reload);
        clearInterval(seek);
        reload = null;
        seek = null;
    }
}

// Rotate and properly position the bars into a circle with a set radius
function style() {
    var step = Math.PI * 2 / $bars.length;
    var radius = 160;
    var angle = 0;
    
    for(var i = 0; i < $bars.length; i++) {
        var $elem = $bars[i];
        // Maths
        var x = Math.round(radius * Math.cos(angle));
        var y = Math.round(radius * Math.sin(angle));
        $elem.css('left', x + 'px');
        $elem.css('top', y + 'px');
        var rot = -90 + ((360 / $bars.length) * i);
        $elem.css('transform', 'rotate(' + rot + 'deg)'); 
        angle += step;

    }
}

// Toggle the music from playing to paused or vice versa
// It also toggles the state or class of the play button
function toggleState() {
    if(aud.paused) {
        start(true);
        $('#stateicon').removeClass('fa fa-play-circle-o');
        $('#stateicon').addClass('fa fa-pause-circle-o');
    } else {
        start(false);
        $('#stateicon').removeClass('fa fa-pause-circle-o');
        $('#stateicon').addClass('fa fa-play-circle-o');
    }
}

function seekBar() {
    var seek = $('#seek');
    var bef = $('#bef');
    var aft = $('#aft');
    
    seek.attr("max", Math.floor(aud.duration));            
    var beforeSec = Math.floor(aud.currentTime);
    var afterSec = Math.floor(aud.duration);
    
    var min = Math.floor(beforeSec / 60);
    var sec = beforeSec - (60 * min);

    seek.val(beforeSec);
    bef.html(formatTime(beforeSec));
    aft.html(formatTime(afterSec));
}

// Formats time
function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

function nextSong() {
//    var songList = [defaultSongs.one.src, defaultSongs.two.src, defaultSongs.three.src, defaultSongs.four.src, defaultSongs.five.src];
//    var start = 1;
//    if(start > songList.length - 1) {
//        start = 0;
//    }
//    var pick = songList[start];
    
    aud.src = "song3.mp3";
    init();
}






// Event listeners and other functions to perform when the page loads

// When the page loads initiate the program
$(document).ready(function() {
    init();
    
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
        degSlider.on("change", function() {
            degVal.html("Current Value: " + degSlider.val());
            degreeSet(degSlider.val());
        });
    
    // Volume Slider
        var volSlider = $('#volume');
        var volVal = $('#volumeVal');
        volVal.val(volSlider.val());
        // When ever the silder is used change value in the input and run function to reload
        volSlider.on("input", function() {
            volVal.val(volSlider.val());
            var vol = volSlider.val() / 100;
            aud.volume = vol;
        });    
    
    // Event listeners for the seekbar
        var seeks = $('#seek');
        // When the thumb is dropped
        seeks.on("change", function() {
            var seekval = seeks.val();
            aud.currentTime = parseInt(seekval, 10);
            seekBar();
        });

        // Hide all alerts
        $('#degreeWarning').hide();
});


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
    nextSong();
});


