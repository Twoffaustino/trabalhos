// controles

const carrosel = [...document.querySelectorAll(".carrosel img")];
let carroselImagemIndex = 0;

const changeCarrosel = () =>{
    carrosel[carroselImagemIndex].classList.toggle("active");

    if(carroselImagemIndex >= carrosel.length - 1){
        carroselImagemIndex = 0;
    }else{
        carroselImagemIndex++;
    };
    carrosel[carroselImagemIndex].classList.toggle("active")
};

setInterval(() =>{
    changeCarrosel();
}, 3000);

// carrosel

// navegations

// toggling music player

const musicPlayerSection = document.querySelector(".music-player-section");

let clickCount = 1;

musicPlayerSection.addEventListener("click", () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add("active");
        clickCount = 1;
        return;
    }
    clickCount++;
     setTimeout(() => {
      clickCount = 1;
    }, 250);
})

// back from music player

const backToHomeBtn = document.querySelector(".music-player-section .bx-chevron-left");

backToHomeBtn.addEventListener("click", () => {
    musicPlayerSection.classList.remove("active");
})

// access playlist

const PlayerSection = document.querySelector(".playlist");
const navbtn = document.querySelector(".music-player-section .bxs-grid");

navbtn.addEventListener("click", () => {
     PlayerSection.classList.add("active");
});

// back from playlist to music player

const backToMusicolayer = document.querySelector(".playlist .bx-chevron-left");

backToMusicolayer.addEventListener("click", () => {
    PlayerSection.classList.remove("active");
})

// navegation done

// music

let currentMusic = 0;

const  music = document.querySelector("#audio-source");

const seekbar = document.querySelector(".music-seek-bar");
const songNome = document.querySelector(".current-song-name");
const artistname = document.querySelector(".artist-name");
const coverImage = document.querySelector(".cover");
const currentMusictime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");
const queue = [...document.querySelectorAll(".queue")]

// select all button here

const forwardbtn = document.querySelector('.bx-skip-next');
const backwardbtn = document.querySelector('.bx-skip-previous');
const playbtn = document.querySelector('.bx-play');
const pausebtn = document.querySelector('.bx-pause');
const repeatbtn = document.querySelector('.bx-redo');
const volumebtn = document.querySelector('.bxs-volume-full');
const volumeSlider = document.querySelector(".volume-slider");

// play button click event

playbtn.addEventListener("click", () => {
    music.play();
    playbtn.classList.remove("active");
    pausebtn.classList.add("active");
})

// play button click event

pausebtn.addEventListener("click", () => {
    music.pause();
    pausebtn.classList.remove("active");
    playbtn.classList.add("active");
});


// fontion for section up music

const setmusic = (i) =>{
    seekbar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songNome.innerHTML = song.name;
    artistname.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(()=>{
       seekbar.max = music.duration;
       musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusictime.innerHTML = "00 : 00";
    queue.forEach(item => item.classList.remove("active"));
    queue[currentMusic].classList.add("active");
}

setmusic(0);

// format duration in 00:00 format

const formatTime = (time) =>{
   let min = Math.floor(time / 60);
   if(min < 10){
    min = "0" + min;
   };

   let sec = Math.floor(time % 60);
   if(sec < 10){
    sec = "0" + sec;
   };

   return `${min} : ${sec}`;
}

// seekbar events

setInterval(() => {
    seekbar.value = music.currentTime;
    currentMusictime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekbar.max)){
        if(repeatbtn.className.includes("active")){
            setmusic(currentMusic),
            playbtn.click();
        }else{
            forwardbtn.click();
        }
    }
}, 500);

seekbar.addEventListener("change", () =>{
    music.currentTime = seekbar.value;
})

// Forward btn

forwardbtn.addEventListener("click", () =>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setmusic(currentMusic);
    playbtn.click();
});

// backward btn 

backwardbtn.addEventListener("click", () =>{
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }else{
        currentMusic --;
    }
    setmusic(currentMusic);
    playbtn.click();
});

// repeatbtn

repeatbtn.addEventListener("click", () =>{
    repeatbtn.classList.toggle("click");
})

// volume section

volumebtn.addEventListener("click", () => {
    volumebtn.classList.toggle("active");
    volumeSlider.classList.toggle("active");
})

volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener("click", () =>{
        setmusic(i);
        playbtn.click();
    })
})