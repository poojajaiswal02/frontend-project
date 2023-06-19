const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// images load
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash api url
let count = 5;
// unsplash api 
const apiKey = 'D965HCX0aHlC4WYCEuQmstEsnXlPFpE6182AZUnsXyQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        console.log('ready =', ready);
    }
}

// create helper function to set attribute no dom element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// create element for links & photos , add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)

    // run the function for each object is photoarray
    photosArray.forEach((photo) => {
        // create <a> to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.urls.html,    // call the healper
            target: '_blank'
        });

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {                            // call the healper
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);     // event listener, 

        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photo from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}

// 1.check to see if scrolling near bottom to page , load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        // console.log('load more')
    }
})

// on load 
getPhotos();