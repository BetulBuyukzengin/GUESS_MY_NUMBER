// Export Selections :
//Selections
export const main = document.querySelector(".main");
export const playSection = document.querySelector(".playSection");
export const butonPlay = document.querySelector(".play");
export const container = document.querySelector(".container");
export const video = document.querySelectorAll("video");
export const mainVideo = document.querySelector(".mainVideo");
export const winVideo = document.querySelector(".winVideo");
export const mainWin = document.querySelector(".mainWin");

// Guess My Number Class
export class Game {
  #score = 20; //starter score
  #highScore = 0;
  #secretNumber = Math.trunc(Math.random() * 20) + 1; // Hold it on global scope Cuz each click creates new random number.
  constructor() {
    this.play();
    this.videoAutoPlayObs();
    this.keyNClick();
    this.again();
  }
  //play btn
  play() {
    butonPlay.addEventListener("click", function () {
      playSection.classList.add("fade-in");
      setTimeout(() => {
        playSection.classList.add("hidden");
        main.classList.remove("hidden");
        //mainVideo.classList.remove('hidden');
        container.classList.remove("hidden");
      }, 1000);
    });
  }
  // Video autoplay with intersection observer :
  videoAutoPlayObs() {
    const videoObserve = function (e) {
      if (!e.isIntersecting || e.isIntersecting) {
        video.forEach((vid) => {
          vid.muted = true;
          vid.loop = true;
          vid.autoplay = true;
          vid.play();
        });
      }
    };
    // New Observer
    const videoObserver = new IntersectionObserver(videoObserve, {
      root: null,
      threshold: 0,
    });
    // Observe
    video.forEach((vid) => {
      videoObserver.observe(vid);
    });
  }
  displayMessage(message) {
    document.querySelector(".message").textContent = message;
  }
  //Data control
  dataIsValid() {
    const guess = Number(document.querySelector(".guess").value);
    if (!guess) {
      this.displayMessage("Not a number!");
    } else if (this.#secretNumber === guess) {
      document.querySelector(".number").textContent = this.#secretNumber; //  random number show in box

      this.displayMessage("Correct Number!");
      if (this.#score > this.#highScore) {
        this.#highScore = this.#score;
        document.querySelector(".highscore").textContent = this.#highScore;
      }
    } else if (this.#secretNumber !== guess) {
      if (this.#score > 1) {
        this.displayMessage(
          guess > this.#secretNumber ? "Too high! " : "Too low"
        );
        this.#score--;
        document.querySelector(".score").textContent = this.#score;
        document.querySelector(".guess").value = "";
      } else {
        this.displayMessage("You lost the game!");
        document.querySelector(".score").textContent = 0;
        document.querySelector("input").disabled = true; // blocks input
      }
    }
  }
  // Reset game onclick again button
  again() {
    document.querySelector(".again").addEventListener("click", () => {
      this.#secretNumber = Math.trunc(Math.random() * 20) + 1;
    

      this.#score = 20;
      document.querySelector(".score").textContent = this.#score;
      this.displayMessage("Start guessing...");
      document.querySelector(".number").textContent = "?";
      document.querySelector(".number").style.width = "15rem";
      document.querySelector(".guess").value = "";
      document.querySelector("input").disabled = false;
    });
  }
  // Check data on keydown and click
  keyNClick() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.dataIsValid();
      }
    });
    document.querySelector(".check").addEventListener("click", () => {
      this.dataIsValid();
    });
  }
}
const player = new Game();
