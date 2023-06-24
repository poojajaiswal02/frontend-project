const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// let Text = document.getElementById('text').innerHTML;
// document.getElementById('text').innerHTML = Text;

// Disable /Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// the code of audio prob speech to speech
// function test() {
//     VoiceRSS.speech({
//         key: '1686a492e11147679675659a46a6cce4',
//         src: 'Hello, world!',
//         hl: 'en-us',
//         v: 'Linda',
//         r: 0,
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     });
// }
// test();

// passing Joke to voiceRss API
function tellMe(joke) {
    console.log('Joke: ', joke);

    document.getElementById('jokeText').innerHTML = joke;

    VoiceRSS.speech({
        key: '1686a492e11147679675659a46a6cce4',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data.joke);

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        //  text-to-speech
        tellMe(joke);

        // Disable Button
        toggleButton();

        // console.log(joke)
    } catch (error) {
        // catch errors here
        console.log('whoops', error);
    }
}

// getJokes();

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);