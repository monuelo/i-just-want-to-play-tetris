class Sound {
  constructor({ src, loop = false }) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = loop;
    document.body.appendChild(this.sound);
  }

  play = () => {
    this.sound.play();
  };

  pause = () => {
    this.sound.pause();
  };

  stop = () => {
    this.sound.pause;
    this.sound.currentTime = 0;
  };

  hardPlay = () => {
    this.sound.currentTime = 0;
    this.sound.play();
  };
}

class GameSongs {
  constructor(songs) {
    this.songs = songs;
  }

  play = song => {
    this.songs[song].play();
  };

  stop = song => {
    this.songs[song].stop();
  };

  pause = song => {
    this.songs[song].pause();
  };

  hardPlay = song => {
    this.songs[song].hardPlay();
  };
}