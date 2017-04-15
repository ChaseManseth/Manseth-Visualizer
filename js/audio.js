console.clear();

// Create audio context
var AUDIO = new (window.AudioContext || window.webkitAudioContext)();
if(!AUDIO) console.error('Web Audio API not supported :(');

// Create and configure analyzer node and storage buffer
var analyzer = AUDIO.createAnalyser();
analyzer.fftSize = 512;
var bufferLength = analyzer.frequencyBinCount;
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

// Main render and update method
function update() {
    analyzer.getByteFrequencyData(dataArray);
    
    for(var i = 0; i < bufferLength - 90; i++) {
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
    
    $segs = createSegments(bufferLength - 90);
    
    style();
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    aud.play();
    update();
}

function style() {
    var step = Math.PI * 2 / $segs.length;
    var radius = 200;
    var angle = 0;
    
    for(var i = 0; i < $segs.length; i++) {
        var $elem = $segs[i];
        
        var x = Math.round(radius * Math.cos(angle));
        var y = Math.round(radius * Math.sin(angle));
        $elem.css('left', x + 'px');
        $elem.css('top', y + 'px');
        var rot = -90 + ((360 / $segs.length) * i);
//        var rot = 0;
        $elem.css('transform', 'rotate(' + rot + 'deg)'); 
        angle += step;
        
//        x = 100 * Math.cos(angle) + 100;
//        y = 100 * Math.sin(angle) + 100;
//        $elem.css('position', 'absolute');
//        $elem.css('left', x + 'px');
//        $elem.css('top', y + 'px');
//        //need to work this part out
//        var rot = 0;
//        $elem.css('transform', 'rotate(' + rot + 'deg)'); 
//        angle += increase;
    }
}

aud.addEventListener('loadeddata', init, false);