const canvas = document.querySelector("#tetris");
const nextCanvas = document.querySelector("#nextPiece");
const hold = document.querySelector("#holdPiece");
const tetris = new Tetris({
  canvas,
  nextPiece,
  hold,
});

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
    }
  }
  if (event.keyCode === 80) tetris.togglePause();
});
