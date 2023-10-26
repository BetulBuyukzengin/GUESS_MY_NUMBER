// Export Selections :
export const main = document.querySelector(".main");
export const playSection = document.querySelector(".playSection");
export const butonPlay = document.querySelector(".play");
export const container = document.querySelector(".container");
export const video = document.querySelectorAll("video");
export const mainVideo = document.querySelector(".mainVideo");
export const winVideo = document.querySelector(".winVideo");
export const mainWin = document.querySelector(".mainWin");
export const beforeWin = document.querySelector("#beforeWin");
export const msgText = document.querySelector(".text");
export const againBtn = document.querySelector(".again");
export const guessInput = document.querySelector(".guess");
export const checkBtn = document.querySelector(".check");

export class Game {
  guess;
  gameIsOver = false;
  html;
  #score = 20; //starter score
  #highScore = 0;
  #secretNumber = Math.trunc(Math.random() * 20) + 1; // Hold it on global scope Cuz each click creates new random number.
  constructor() {
    this.play();
    this.videoAutoPlayObs();
    this.keyNClick();
    this.again();
  }

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
    document.querySelector(".text").textContent = message;
  }
  //Data control
  dataIsValid() {
     this.guess = Number(document.querySelector(".guess").value);
    if (!this.guess) {
      this.displayMessage("Not a number!");
    } else if (this.#secretNumber === this.guess) {
      this.gameIsOver = true;
      againBtn.disabled = false;

      document.querySelector(".number").textContent = this.#secretNumber; //  random number show in box
      this.displayMessage("Correct Number!");

      beforeWin.classList.add("hidden");
      this.html = `
       <video autoplay loop>
         <source src="img/win.mp4" type="video/mp4" />
       </video> 
      `;
      main.insertAdjacentHTML("afterbegin", this.html);
      msgText.classList.add("messageAnimation");
      if (this.#score > this.#highScore) {
        this.#highScore = this.#score;
        document.querySelector(".highscore").textContent = this.#highScore;
      }
      checkBtn.disabled = true;
      guessInput.disabled=true;
    } 
    else if (this.#secretNumber !== this.guess) {
      if (this.#score > 1) {
        this.displayMessage(
          this.guess > this.#secretNumber ? "Too high! " : "Too low"
        );
        this.#score--;
        document.querySelector(".score").textContent = this.#score;
        document.querySelector(".guess").value = "";
      } else {
        againBtn.disabled = false;

        this.displayMessage("You lost the game!");
        document.querySelector(".score").textContent = 0;
        document.querySelector("input").disabled = true; // blocks input
        msgText.classList.add('lostGame');
        this.gameIsOver = true;
        guessInput.disabled = true;
        main.style.opacity = 0.7;
      }
    }
  }

  // Win video remove feature
  removeFirstElement(){
    const data = document.querySelector("#beforeWin").closest(".main");
    data.firstElementChild.style.display = "none";
  }

  // Reset game onclick again button
  again() {
    document.querySelector(".again").addEventListener("click", () => {
      if(this.#secretNumber === this.guess) this.removeFirstElement()

      this.#secretNumber = Math.trunc(Math.random() * 20) + 1;
      this.#score = 20;

      beforeWin.classList.remove("hidden");
      
      document.querySelector(".score").textContent = this.#score;
      this.displayMessage("Start guessing...");
      msgText.classList.remove("messageAnimation");

      document.querySelector(".number").textContent = "?";
      document.querySelector(".guess").value = "";
      document.querySelector("input").disabled = false;

      this.gameIsOver = false;
      checkBtn.disabled = false;
      guessInput.disabled=false;
      main.style.opacity = 1;
      msgText.classList.remove('lostGame');
    });
  }
  // Check data on keydown and click
  /*   keyNClick() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.dataIsValid();
      }
     
    });
    document.querySelector(".check").addEventListener("click", () => {
      this.dataIsValid();
    });
  }
 */

  keyNClick() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !this.gameIsOver) {
        this.dataIsValid();
      }
    });
    document.querySelector(".check").addEventListener("click", () => {
      this.dataIsValid();
    });
  }
}
const player = new Game();
