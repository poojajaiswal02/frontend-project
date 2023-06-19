const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media stream, pass to video Element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetedata = () => {
            videoElement.play();
        }

    } catch (error) {
        console.log('Oppps, error here:', error)
    }
}

button.addEventListener('click', async () => {
    //disable the button
    button.disabled = true;
    // start picture in picture
    await videoElement.requestPictureInPicture();
    //reset the button 
    button.disabled = false;

});

//on load
selectMediaStream()