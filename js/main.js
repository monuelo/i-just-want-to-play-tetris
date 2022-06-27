const canvas = document.querySelector("#tetris");
const nextCanvas = document.querySelector("#nextPiece");
const hold = document.querySelector("#holdPiece");
const tetris = new Tetris({
  canvas,
  nextPiece,
  hold,
});
const allSounds = document.getElementsByTagName("audio");
const controlBox = document.getElementsByClassName("control-container")[0];
const finalScoreText = document.querySelector("#final-score"); 
const gameScore = document.getElementById("score");
const homeEl = document.getElementById("home");
const leaderboardText = document.getElementById("leaderboard-scores");
const playerInput = document.getElementById("player-name");
const saveScoreBtn = document.getElementById("save-score-btn");
const scoreForm = document.getElementById("score-form");
const scoreSubmitMsg = document.getElementById("score-submit-message");
const submitScoreBtn = document.getElementById("submit-score-btn");
const volumeControl = controlBox.querySelector(".volume-control");
const volumeInput = volumeControl.querySelector("input[type=range]");

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
  toggleScoreForm();
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
  tetris.musicPaused ? tetris.toggleMusic() : ""; 
}; 

const muteMusic = () => {
  tetris.toggleMusic()   
  controlBox.classList.contains("volume-on") ? controlBox.classList.remove("volume-on") : 
  controlBox.classList.add("volume-on");
};

const validateScoreForm = (input, score) => {
  if (input.value == "" || !(parseInt(score) > 0)) {
    input.style.borderColor = "#ff0000";
    return false;
  } else return true;
};

const resetFormInput = (input, clear) => {
  input.style.borderColor = "";
  clear === "clear" ? input.value = "" : "";
};

const toggleScoreForm = () => {
   scoreForm.style.display === "none" ? scoreForm.style.display = "inline" : scoreForm.style.display = "none";
   resetFormInput(playerInput, "clear"); 
};

const api = new API();

const displayLeaderboard = async () => {
  const leaderboard_data = await api.GET('/api/v1/scoreboard/leaders');

  if (leaderboard_data.success) {
    const header = document.createElement("h2");
    header.innerHTML = "High Scores";
    homeEl.prepend(header);

    let leaderboard = JSON.stringify(leaderboard_data.leaderboard);
    leaderboard = JSON.parse(leaderboard);
    leaderboardText.innerHTML = leaderboard
    .map((record) => {
      return `<div> ${record.player} ${record.score} </div>`;
    })
    .join("");

    leaderboardText.style.display = "inline";
    // reactivate transition
    leaderboardText.classList.remove("leaderboard");
    leaderboardText.offsetWidth;
    leaderboardText.classList.add("leaderboard");
  }
};
displayLeaderboard();

const postScore = async (event) => {
  event.preventDefault();
  const finalScore = finalScoreText.innerHTML.slice(12); 
  if (!validateScoreForm(playerInput, finalScore)) {
    return;
  }

  const requestBody = {
    player: playerInput.value,
    score: finalScore
  };
  const response_data = await api.POST("/api/v1/scoreboard", requestBody);

  scoreSubmitMsg.style.display = "inline";
  if (response_data.success) {
    saveScoreBtn.style.display = "none";
    toggleScoreForm();

    resetFormInput(playerInput, "clear");
    scoreSubmitMsg.innerHTML = `Congrats ${requestBody.player}!<br/>Your score of ${finalScore} points has been added to the scoreboard`;
  } else {
    scoreSubmitMsg.innerHTML = "Sorry, there has been an error<br/>Please try again";
  } 
};

volumeInput.addEventListener("mousemove", setVolume);
setVolume();

saveScoreBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleScoreForm();
});

submitScoreBtn.addEventListener("click", postScore);

playerInput.addEventListener("input", () => {
  playerInput.value != "" ? resetFormInput(playerInput) : ""; 
});

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
        muteMusic();
        return;
    }
  }
  if (event.keyCode === 80 && !tetris.board.over) tetris.togglePause();
});
