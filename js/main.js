// Global Vars
let width = 500,
height = 0,
filter = "none",
streaming = false;

// DOM elmements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get Media Stream
navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(stream) {
    // Link to the video source
    video.srcObject = stream;
    video.play();
})
.catch(function(err) {
    console.log(`Error: ${err}`);
});
