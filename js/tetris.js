class Tetris {
  constructor({ canvas, nextPiece, hold }) {
    this.canvas = canvas;
    this.colors = [
      null,
      "#5AF1F0",
      "#2D64F1",
      "#F0A12D",
      "#A76CF1",
      "#73E831",
      "#EFEE3B",
      "#F14323",
    ];

    this.hold = hold;
    this.paused = false;
    this.musicPaused = false;

    this.holdCtx = hold.getContext("2d");
    this.holdCtx.scale(14, 14);

    this.nextPiece = nextPiece;
    this.nextCtx = nextPiece.getContext("2d");
    this.nextCtx.scale(14, 14);

    this.ctx = canvas.getContext("2d");
    this.ctx.scale(20, 20);

    this.board = new Board(12, 20);
    this.player = new Player(this);
  }

  init() {
    gameSongs.play("themeSong");

    let lastTime = 0;
    const update = (time = 0) => {
      let timeElapsed = time - lastTime;
      lastTime = time;

      if (!this.paused && !this.board.over) {
        this.player.update(timeElapsed);
      }

      this.draw();
      requestAnimationFrame(update);
      if (this.board.over) {
        gameSongs.stop("themeSong");
        const playAgain = document.getElementById("play-again-btn");
        playAgain.addEventListener("click", (e) => {
          this.reset();
        });
      } 
    };
    update();
  }

  blackFill(ctx, paintArea) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, paintArea.width, paintArea.height);
  }

  draw() {
    this.blackFill(this.ctx, this.canvas);
    this.drawShape(this.player.currentPiece, this.player.position, this.ctx);
    this.drawShape(this.board.matrix, { x: 0, y: 0 }, this.ctx);
    this.drawHold();
    this.drawPreview();
    this.drawPaused();
  }

  drawHold() {
    this.blackFill(this.holdCtx, this.hold);
    this.drawShape(this.player.hold[0], { x: 2, y: 2 }, this.holdCtx);
  }

  drawPreview() {
    this.blackFill(this.nextCtx, this.nextPiece);
    this.drawShape(this.player.nextPiece, { x: 2, y: 2 }, this.nextCtx);
  }

  drawPaused() {
    let elPaused = document.querySelector("#game-paused");
    if (this.paused) {
      elPaused.style.display = "flex";
    } else {
      elPaused.style.display = "none";
    } 
  }

  drawShape(piece, location, area) {
    if (piece) {
      piece.forEach((row, yIndex) => {
        row.forEach((value, xIndex) => {
          if (value !== 0) {
            // area.shadowBlur = 5;
            area.shadowColor = "black";
            area.fillStyle = this.colors[value];
            area.strokeStyle = "rgba(0,0,0,1)";
            area.lineWidth = 0.5;
            area.strokeRect(xIndex + location.x, yIndex + location.y, 1, 1);
            area.fillRect(xIndex + location.x, yIndex + location.y, 0.75, 0.75);
          }
        });
      });
    }
  }

  togglePause() {
    if (!this.paused) gameSongs.pause("themeSong");
    else gameSongs.play("themeSong");

    this.paused = !this.paused;
  }

  toggleMusic() {
    if (!this.musicPaused) gameSongs.pause("themeSong");
    else gameSongs.play("themeSong");

    this.musicPaused = !this.musicPaused;
  }

  reset() {
    if (this.board.over) {
      //  ensures the board isn't reset prematurely - might want to instead removed
      // eventListener for click
      this.board.clear();
      this.player.newGame = true;
      this.player.score = 0;
      this.board.over = false;
      gameSongs.stop("themeSong");
      let elOver = document.querySelector("#game-over");
      elOver.style.display = "none";
      let saveScoreBtn = document.getElementById("save-score-btn");
      saveScoreBtn.style.display = "none";
      let scoreForm = document.getElementById("score-form");
      scoreForm.style.display = "none";
      let scoreSubmitMsg = document.getElementById("score-submit-message");
      scoreSubmitMsg.innerHTML = "Oh snaps, try again!";
      scoreSubmitMsg.style.display = "inline";
      this.init();
    }
  }
}
