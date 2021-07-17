const musicContainer = document.getElementById('music__container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio')
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIdx = 2;

//initially load song details into DOM
loadSong(songs[songIdx]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.remove('give-border');
    musicContainer.classList.add('remove-border');

    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');
    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.add('give-border');
    musicContainer.classList.remove('remove-border');

    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    audio.pause();
}

//  Previous song
function prevSong() {
    songIdx--;

    // For the last song
    if (songIdx < 0) {
        songIdx = songs.length - 1;
    }

    loadSong(songs[songIdx]);
    playSong();

}

//  Next song
function nextSong() {
    songIdx++;

    // For the last song
    if (songIdx > songs.length - 1) {
        songIdx = 0;
    }

    loadSong(songs[songIdx]);
    playSong();
}

//  Update the progress bar
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    // console.log(duration, currentTime);
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent);
    progress.style.width = `${progressPercent}%`;
}

// Set progress on clicking the progress bar.
function setProgress(e) {
    // Total width
    const width = this.clientWidth;
    // console.log(width);
    // Width from start till where we click
    const clickx = e.offsetX;
    // console.log(clickx);
    const duration = audio.duration;
    // Setting the time
    audio.currentTime = (clickx / width) * duration;
}


// Event Listners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//  Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time song update event
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);