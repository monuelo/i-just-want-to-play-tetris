const canvas = document.querySelector("#tetris");
const nextCanvas = document.querySelector("#nextPiece");
const hold = document.querySelector("#holdPiece");
const tetris = new Tetris({
  canvas,
  nextPiece,
  hold,
});
const controlBox = document.getElementsByClassName("control-container")[0];
const volumeControl = controlBox.querySelector(".volume-control");
const volumeInput = volumeControl.querySelector("input[type=range]");
const allSounds = document.getElementsByTagName("audio");

const gameSongs = new GameSongs({
  themeSong: new Sound({ src: "./assets/tetris.mp3", loop: true }),
  gameOver: new Sound({ src: "./assets/gameover.wav" }),
  line: new Sound({ src: "./assets/line.wav" }),
  fall: new Sound({ src: "./assets/fall.wav" }),
  clear: new Sound({ src: "./assets/clear.wav" }),
  swap: new Sound({ src: "./assets/selection.wav" }),
});

document.querySelector("#play").onclick = () => {
  let home = document.querySelector("#home");
  home.style.display = "none";
  tetris.init();
};

const setVolume = () => {
  const setVolumeLevel = parseInt(volumeInput.value);
  volumeControl.className = "volume-control";

  [...allSounds].forEach((_, i) => { allSounds[i].volume = setVolumeLevel / 100; });

  if (setVolumeLevel > 0) {
    controlBox.classList.add("volume-on");
    volumeControl.classList.add("volume-" + setVolumeLevel);
  } else {
    controlBox.classList.remove("volume-on");
  }
  tetris.musicPaused ? tetris.toggleMusic() : ''; 
}

const muteMusic = () => {
    tetris.toggleMusic()   
    controlBox.classList.contains("volume-on") ? controlBox.classList.remove("volume-on") : 
    controlBox.classList.add("volume-on");
}

volumeInput.addEventListener("mousemove", setVolume);
setVolume();

document.addEventListener("keydown", (event) => {
  if (!tetris.paused && !tetris.board.over) {
    switch (event.keyCode) {
      case 32:
        tetris.player.fall(true);
        return;
      case 40:
        tetris.player.fall();
        return;
      case 37:
        tetris.player.slide(-1);
        return;
      case 39:
        tetris.player.slide(1);
        return;
      case 88:
        tetris.player.spin(-1);
        return;
      case 38:
        tetris.player.spin(1);
        return;
      case 16:
        tetris.player.swap();
        return;
      case 77:
        muteMusic()
        return;
    }
  }
  if (event.keyCode === 80) tetris.togglePause();
});
