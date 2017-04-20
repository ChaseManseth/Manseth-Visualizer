console.clear();

// Create audio context
var AUDIO = new (window.AudioContext || window.webkitAudioContext)();
if(!AUDIO) console.error('Web Audio API not supported :(');

// Create and configure analyzer node and storage buffer
var analyzer = AUDIO.createAnalyser();
analyzer.fftSize = 512;
var bufferLength = analyzer.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

// Cache HTML elements
var viz = document.getElementById('viz'),
    aud = document.getElementById('audio');

// Creates many boxes 
function createBars(numBars) {
    var barCollection = [];
    
    console.log('numBars', numBars);
    
    for(var i = 0; i < numBars; i++) {
        var a = document.createElement('div');
        a.classList.add('bar');
        
        viz.appendChild(a);
        barCollection.push($(a));      
    }
    
    return barCollection;
}

// $segs is an array of all the bars creates
var $segs = 0;
// snip is trimming the last blank buffer length
var snip = 99;
// n is the degree of the smoothing algorithm
var n = 3;

function degreeSilder(x) {
     document.getElementById("viz").innerHTML='';
    $segs = 0;
    $segs = createBars((((bufferLength - snip) * 2) - 1) * x); 
    style();
    n = x;
}


// Main render and update method
function update(b) {
    analyzer.getByteFrequencyData(dataArray);
    
    // Copy the dataArray without high frequencies
    var low = [];
    var len = bufferLength - snip;
    
    for(var i = 0; i <= len; i++) {
        low.push(dataArray[i]);
    }
    
    // Use Scott's smoothing function
    var smooth = [];
    smooth.push(low[0]);
    for(var i = 1; i < low.length -1; i += 2) {
        var mult = 0.5;
        var c = low[i];
        var a = (low[i+1] + low[i-1] - 2*low[i]) / 2.0;
        var b = (low[i+1] - low[i-1]) / 2.0;
        for(var j = 1; j < n; j++) {
            smooth.push(a * (1.0/n) * (1.0/n) * j + b * (1.0/n) * (-1) * j + c);
        }
//        smooth.push(a * mult * mult + b * mult * (-1) + c);
        smooth.push(low[i]);
        for(var j = 1; j < n; j++) {
            smooth.push(a * (1.0/n) * (1.0/n) * j + b * (1.0/n) * j + c);
        }
//        smooth.push(a * mult * mult + b * mult + c);
        smooth.push(low[i+1]);
    }
    
//    console.log("smooth length : " + smooth.length);
    
    var a = 0;
    // First half going clockwise
    for(var i = 0; i < smooth.length; i++) {
        var width = smooth[i];        
        $segs[a].css('height', width);
        a++;
    }
    
    // Second half going counter-clockwise
    for(var i = smooth.length - 1; i > 0; i--) {
        var width = smooth[i];        
        $segs[a].css('height', width);
        a++;
    }
}

// Initiate function
function init() {
    // Connect audio to analyzer and analyze audio
    console.log('init');
    var source = AUDIO.createMediaElementSource(aud);
    source.connect(analyzer);
    analyzer.connect(AUDIO.destination);
    
    $segs = createBars((((bufferLength - snip) * 2) - 1) * n);    
    style();
    start(true);
}

// Start the song is paused and vice versa
var reload;
function start(x) {
    if(x) {
        aud.play();
        reload = setInterval(function() {update()}, 10);
    } else {
        aud.pause();
        clearInterval(reload);
        reload = null;
    }
}

// Rotate and properly position the bars into a circle with a set radius
function style() {
    var step = Math.PI * 2 / $segs.length;
    var radius = 160;
    var angle = 0;
    
    for(var i = 0; i < $segs.length; i++) {
        var $elem = $segs[i];
        
        var x = Math.round(radius * Math.cos(angle));
        var y = Math.round(radius * Math.sin(angle));
        $elem.css('left', x + 'px');
        $elem.css('top', y + 'px');
        var rot = -90 + ((360 / $segs.length) * i);
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

// When the page loads initiate the program
$(document).ready(function() {
    init();
    
    
    var degSilder = $('#degree');
    var degVal = $('#degreeVal');
    degVal.val(degSilder.val());
    degSilder.on("click", function() {
        degVal.val(degSilder.val());
        degreeSilder(degSilder.val());
    });
    
//    setInterval(function() {console.log(Math.floor(aud.currentTime))}, 1000);
});

// Toggle played and paused states
var play = $("#play");
play.click(function() {
    toggleState();
});