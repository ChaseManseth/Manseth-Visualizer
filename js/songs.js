var defaultSongs = {
    one: {
        title: "Vessel [NCS Release]",
        artist: "Ship Wrek, Zookeepers & Trauzers",
        coverImage: "",
        src: "music/song1.mp3"
    }, 
    two: {
        title: "Heaven [NCS Release]",
        artist: "RIVERO & Anna Yvette",
        coverImage: "",
        src: "music/song2.mp3"
    }, 
    three: {
        title: "Fly Away (JPB Remix) [NCS Release]",
        artist: "Krys Talk",
        coverImage: "",
        src: "music/song3.mp3"
    }, 
    four: {
        title: "Vibe [NCS Release]",
        artist: "Ash O'Connor",
        coverImage: "",
        src: "music/song4.mp3"
    } 
};

// Copy and paste to add more songs
//  five: {
//        title: "",
//        artist: "",
//        coverImage: "",
//        src: "music/"
//    }

var titleList = [];
var artistList = [];
var coverImageList = [];
var srcList = [];

// Loop through all of the objects and get each value in an array
for (var prop in defaultSongs) {
    titleList.push(defaultSongs[prop].title);
    artistList.push(defaultSongs[prop].artist);
    coverImageList.push(defaultSongs[prop].coverImage);
    srcList.push(defaultSongs[prop].src);
}