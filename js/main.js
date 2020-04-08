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

// Play when ready
video.addEventListener('canplay', function(e) {
    if(!streaming) {
        // Set video / canvas height
        height = video.videoHeight/ (video.videoWidth/ width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        streaming = true;
    }
}, false); // false for synchronous operation

// Photo button event
photoButton.addEventListener('click', function(e) {
    takePicture();
    e.preventDefault();
}, false);

// Filter event
photoFilter.addEventListener('change', function(e){
    // Set filter to chosen option
    filter = e.target.value;
    // Set filter to video
    video.style.filter = filter;
    console.log(filter);
    e.preventDefault();
})

// Clear event
clearButton.addEventListener('click', function(){
    // Clear photos
    photos.innerHTML = '';
    // Change filter back to normal
    filter = 'none';
    // Set video filter
    video.style.filter = filter;
    // Reset select list list
    photoFilter.selectedIndex = 0;
})
// Take picture from canvas
function takePicture() {
    // Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
        // Set canvas props
        canvas.width = width;
        canvas.height = height;
        // Draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height); // source, start coord, size

        // Create image from the canvas
        const imgUrl = canvas.toDataURL("image/png");

        // Create img element
        const img = document.createElement('img');

        // Set img src
        img.setAttribute('src', imgUrl);
        img.style.filter = filter;
        // Add image to photos
        photos.appendChild(img);
    }
}