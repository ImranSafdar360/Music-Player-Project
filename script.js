// const songs = [
//     {name:"Arjan Vailly Ne", url:"./Songs/Arjan Vailly Ne.mp3", image:"./images/animal.jpg"},
//     {name:"Jale 2", url:"./Songs/Jale 2.mp3", image:"./images/jale.jpg"},
//     {name:"Lutt Putt Gaya", url:"./Songs/Lutt Putt Gaya - Dunki.mp3", image:"./images/ram.jpg"},
//     {name:"Pehle Bhi Main", url:"./Songs/Pehle Bhi Main.mp3", image:"./images/animal.jpg"}
// ];

// const allSongs = document.querySelector("#all-songs");
// const poster = document.querySelector("#left");
// const forward = document.querySelector("#forward");
// const backward = document.querySelector("#backward");
// const play = document.querySelector("#play");

// var audio = new Audio();
// var selectedSongs = 0;
// const showTheSongs = () => {
//     var clutter = "";
//     songs.forEach(function(obj, index){
//         clutter += `<div class="song-card" id="${index}">
//         <div class="part-1">
//         <img src="${obj.image}">
//         <h2>${obj.name}</h2>
//         </div>
//         <h6>3:56</h6>
//         </div>
//         `;
//     })
//     allSongs.innerHTML = clutter;
//     audio.src = songs[selectedSongs].url;
//     poster.style.backgroundImage = `url(${songs[selectedSongs].image})`;
// };


// allSongs.addEventListener(
//     "click", function(details){
//         selectedSongs = details.target.id;
//         showTheSongs();
//         play.innerHTML = `<i class="ri-pause-fill"></i></h3>`;
//         flag = 1;
//         audio.play();
//     }
// );
// const playSongs = () =>{
//     var flag = 0;
// play.addEventListener(
//     "click", function(){
//         if (flag == 0) {
//             play.innerHTML = `<i class="ri-pause-fill"></i></h3>`;
//             showTheSongs();
//             audio.play();
//             flag = 1;
//         } else {
//             play.innerHTML = `<i class="ri-play-mini-fill"></i></h3>`;
//             showTheSongs();
//             audio.pause();
//             flag = 0;
//         }
//     }
// )
// };

// forward.addEventListener(
//     "click", function(){
//         if(selectedSongs < songs.length -1){
//             selectedSongs++;
//             showTheSongs();
//             play.innerHTML = `<i class="ri-pause-fill"></i></h3>`;
//             flag = 1;
//             audio.play();
//         } else{
//             forward.style.opacity = 0.4;
//         }
//     }
// );
// backward.addEventListener(
//     "click", function(){
//         if(selectedSongs > 0){
//             selectedSongs--;
//             showTheSongs();
//             play.innerHTML = `<i class="ri-pause-fill"></i></h3>`;
//             flag = 1;
//             audio.play();
//         } else{
//             backward.style.opacity = 0.4;
//         }
//     }
// )

// playSongs();
// showTheSongs();
const songs = [
    { name: "Arjan Vailly Ne", url: "./Songs/Arjan Vailly Ne.mp3", image: "./images/animal.jpg", duration:"3:56" },
    { name: "Jale 2", url: "./Songs/Jale 2.mp3", image: "./images/jale.jpg",duration:"4:20" },
    { name: "Lutt Putt Gaya", url: "./Songs/Lutt Putt Gaya - Dunki.mp3", image: "./images/ram.jpg",duration:"5:10" },
    { name: "Pehle Bhi Main", url: "./Songs/Pehle Bhi Main.mp3", image: "./images/animal.jpg",duration:"3:30" }
];

const allSongs = document.querySelector("#all-songs");
const leftPoster = document.querySelector("#left-poster");
const forward = document.querySelector("#forward");
const backward = document.querySelector("#backward");
const play = document.querySelector("#play");
const progress = document.querySelector("#progress");
const songDuration = document.querySelector("#song-duration");
const poster = document.querySelector("#poster");
const songName = document.querySelector("#song-name");

let selectedSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

const showSongList = () => {
    let songList = "";
    songs.forEach((song, index) => {
        songList += `<div class="song-card" id="${index}">
            <div class="part-1">
                <img src="${song.image}">
                <h2>${song.name}</h2>
            </div>
            <h6>${song.duration}</h6>
        </div>`;
    });
    allSongs.innerHTML = songList;
};

const playSong = () => {
    audio.src = songs[selectedSongIndex].url;
    leftPoster.style.backgroundImage = `url(${songs[selectedSongIndex].image})`;
    audio.play();
    isPlaying = true;
    play.innerHTML = `<i class="ri-pause-fill"></i>`;
};

const pauseSong = () => {
    audio.pause();
    isPlaying = false;
    play.innerHTML = `<i class="ri-play-mini-fill"></i>`;
};

const nextSong = () => {
    selectedSongIndex = (selectedSongIndex + 1) % songs.length;
    updateUI();
    playSong();
};

const prevSong = () => {
    selectedSongIndex = (selectedSongIndex - 1 + songs.length) % songs.length;
    updateUI();
    playSong();
};

const updateUI = () => {
    const currentSong = songs[selectedSongIndex];
    leftPoster.style.backgroundImage = `url(${songs[selectedSongIndex].image})`;
    poster.style.backgroundImage = `url(${currentSong.image})`;
    songName.innerText = currentSong.name;
    songDuration.innerText = currentSong.duration;
};

play.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

forward.addEventListener("click", nextSong);

backward.addEventListener("click", prevSong);
progress.addEventListener("input", () => {
    const currentTime = (audio.duration * progress.value) / 100;
    audio.currentTime = currentTime;
});
audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progress.value = progressPercentage;
});

allSongs.addEventListener("click", (event) => {
    selectedSongIndex = parseInt(event.target.closest(".song-card").id);
    updateUI();
    playSong();
});

showSongList();
updateUI();
