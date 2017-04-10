var $bars = [];
var viz = document.getElementById('viz');

function create(num) {
    for(var i = 0; i < num; i++) {
        var a = document.createElement('div');
        a.classList.add('bar');
        viz.appendChild(a);
        $bars.push($(a));
    }
}

create(256);

$(document).ready(function(){
    var step = Math.PI * 2 / $bars.length;
    var radius = 200;
    var angle = 0;

    for (var i = 0; i < $bars.length; i++) {
        var x = Math.round(radius * Math.cos(angle));
        var y = Math.round(radius * Math.sin(angle));
        $bars[i].css('left', x + 'px');
        $bars[i].css('top', y + 'px');
        $bars[i].css('height', i + 1);
        var rot = 90 + (1.4025 * i);
        $bars[i].css('transform', 'rotate(' + rot + 'deg)'); 
        angle += step;
    }
});