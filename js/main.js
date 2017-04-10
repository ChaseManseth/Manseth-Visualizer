var boxes = [];
var win = 1920;
$(function() {
    addBox(10);
    
    setInterval(
        function() {
            for(var i = 0; i < boxes.length; i++) {
                $("#" + boxes[i]).css('width', randomSize(i)); 
            }
        },
        1000
    );
    
});

function addBox(num) {
   for(let i = 0; i < num; i++) {
       var $box = '<div id="box' + (i + 1) + '" class="box transform"></div>';
       boxes.push('box' + (i + 1));
       $(".container").append($box);
   } 
}


function randomSize(num) {
    var before;
    var after;
    
    
    if(num - 1 < 0) {
        before = 0;
    } else {
        var css = $("#" + boxes[num - 1]).css('width');
        var subNum = css.indexOf('px');
        var sub = css.substr(0, subNum);
        before = sub;
    }
    
    if(num + 1 >= boxes.length) {
        after = 0;
    } else {
        var css = $("#" + boxes[num + 1]).css('width');
        var subNum = css.indexOf('px');
        var sub = css.substr(0, subNum);
        after = sub;
    }
    
    var avg = (before + after) / 4000;
    var max = 100;
    var num = Math.floor((Math.random() * (avg)) + 10);
    console.log(avg);
    var percent = num + "%"; 
    return percent;
}