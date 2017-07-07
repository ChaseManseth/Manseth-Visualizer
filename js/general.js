// Dropzone options
Dropzone.options.ups = {
    paramName: "file",
    acceptedFiles: "audio/*",
    complete: function (file) {
        toggleState();
        aud.src = "uploads/" + file.name;

        $('.dz-progress').hide();
        var uploadName = file.name;
        var uploadTitle = uploadName.split(" - ");
        if (uploadTitle.length < 2) {
            $('.title').html(file.name);
            $('.artist').html("Uploaded audio file");
        } else if (uploadTitle.length > 2) {
            $('.title').html(file.name);
            $('.artist').html("Uploaded audio file");
        } else {
            var removeExt = uploadTitle[1].slice(0, uploadTitle[1].length - 4);
            $('.title').html(removeExt);
            $('.artist').html(uploadTitle[0]);
        }


        newSong();

        setTimeout(
            function () {
                toggleState();
            },
            500
        );

        $('#uploadSong').modal('hide');

    }
};


// Remove uploaded files
// When the page is refreshed the uploaded folder will be emptied
window.addEventListener("beforeunload", function () {
    $.get("remove.php");
});


// Function for positioning the bars
function getPos() {
    var width = window.innerWidth;
    var x;

    console.log(width);
    x = (-width + 764.45) / 2.101;

    return x;
}

// Set position of the visualiser on load and resize events
// On page load
$(document).ready(function () {
    var a = getPos();

    $("#viz").css("margin-top", a + "px");
    
    
});

// On resize

$(window).resize(function () {
    var a = getPos();

    $("#viz").css("margin-top", a + "px");
});
