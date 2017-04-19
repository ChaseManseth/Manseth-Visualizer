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
function createSegments(numSegments) {
    var segCollection = [];
    
    console.log('numSegments', numSegments);
    
    for(var i = 0; i < numSegments; i++) {
        var a = document.createElement('div');
        a.classList.add('bar');
        
        viz.appendChild(a);
        segCollection.push($(a));      
    }
    
    return segCollection;
}

var $segs = 0;
var snip = 90;

// Main render and update method
function update() {
    analyzer.getByteFrequencyData(dataArray);
    var a = 0;
    for(var i = 0; i < bufferLength - snip; i++) {
//        Repeating the same lime sveral times
//        for(var j = 0; j < 3; j++) {
//            var width = dataArray[i];
//        
//            $segs[a].css('height', width);
//            a++;
//        }
        
        var width = dataArray[i];        
        $segs[i].css('height', width);
    }
}

function init() {
    // Connect audio to analyzer and analyze audio
    console.log('init');
    var source = AUDIO.createMediaElementSource(aud);
    source.connect(analyzer);
    analyzer.connect(AUDIO.destination);
    
    $segs = createSegments(bufferLength - snip);    
    style();
    start();
}

function start() {
    aud.play();
    setInterval(
    function() {update();},
        0.01
    );
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

//aud.addEventListener('loadeddata', init);
// When the page loads initiate the program
$( document ).ready(function() {
    init();
});