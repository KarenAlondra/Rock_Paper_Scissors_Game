
var player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

var playpause = function () {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

playbtn.addEventListener("click", playpause);

player.onplay = function () {
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}

player.onpause = function () {
  playbtn.classList.add("fa-play");
  playbtn.classList.remove("fa-pause");
}

player.ontimeupdate = function () {
  let ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  //progress
  let duration = player.duration;
  prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
}

function timeFormat(ct) {
  minutes = Math.floor(ct / 60);
  seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0"+seconds;
  }

  return minutes + ":" + seconds;
}









const game = () => {
    let pScore = 0;
    let cScore = 0;
    let moves = 0;
  
    //Start the Game
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");
  
      playBtn.addEventListener("click", () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
      });
    };


     //Play Match
     const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");
    
        hands.forEach(hand => {
          hand.addEventListener("animationend", function() {
            this.style.animation = "";
          });
        });
        //Computer Options
        const computerOptions = ["rock", "paper", "scissors"];
    
        options.forEach(option => {
          option.addEventListener("click", function() {


            const movesLeft = document.querySelector('.movesleft');
            moves++;
            movesLeft.innerText = `Moves Left: ${10-moves}`;


            //Computer Choice
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];
    
            setTimeout(() => {
              //Here is where we call compare hands
              compareHands(this.textContent, computerChoice);
              //Update Images
              playerHand.src = `./assets/${this.textContent}.png`;
              computerHand.src = `./assets/${computerChoice}.png`;
            }, 2000);
            //Animation
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
          


            if(moves == 10){
              playerHand.style.display ="none";
              computerHand.style.display = "none";
              gameOver(options,movesLeft);
            }

  
          });
        });
      };
         
    
      const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
      };
    
      const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector(".winner");
        //Checking for a tie
        if (playerChoice === computerChoice) {
          winner.textContent = "It is a tie, try again";
          return;
        }
        //Check for Rock
        if (playerChoice === "rock") {
          if (computerChoice === "scissors") {
            winner.textContent = "Player Wins, keep it up";
            pScore++;
            updateScore();
            return;
          } else {
            winner.textContent = "Computer Wins, don't give up";
            cScore++;
            updateScore();
            return;
          }
        }
        //Check for Paper
        if (playerChoice === "paper") {
          if (computerChoice === "scissors") {
            winner.textContent = "Computer Wins, don't give up";
            cScore++;
            updateScore();
            return;
          } else {
            winner.textContent = "Player Wins, keep it up";
            pScore++;
            updateScore();
            return;
          }
        }
        //Check for Scissors
        if (playerChoice === "scissors") {
          if (computerChoice === "rock") {
            winner.textContent = "Computer Wins, don't give up";
            cScore++;
            updateScore();
            return;
          } else {
            winner.textContent = "Player Wins, keep it up";
            pScore++;
            updateScore();
            return;




          }
        }
      };
    


      const gameOver = (options,movesLeft) => {
        
        const winner = document.querySelector(".winner");
        const result = document.querySelector(".result");
        const reloadBtn = document.querySelector(".reload");

        options.forEach(option => {
          option.style.display = 'none';

          
      })

      
      winner.style.display = 'none';
      movesLeft.style.display = 'none';
      player.play();
  

      if(pScore > cScore){
          result.style.fontSize = '2rem';
          result.innerText = 'You Won The Game';
          result.style.fontfamily = "sans-serif";
          result.style.fontWeight = "bold";
          result.style.color = '#308D46';

      }
      else if(pScore < cScore){
          result.style.fontSize = '2rem';
          result.innerText = 'You Lost The Game';
          result.style.color = 'red';
          result.style.fontfamily = "sans-serif";
          result.style.fontWeight = "bold";
      }
      else{
          result.style.fontSize = '2rem';
          result.innerText = 'Tie';
          result.style.color = "grey";
          result.style.fontfamily = "sans-serif";
          result.style.fontWeight = "bold";
      }
      reloadBtn.innerText = 'Restart';
      reloadBtn.style.color = "white";
      reloadBtn.style.display = 'flex';
      reloadBtn.addEventListener('click',() => {
          window.location.reload();
      })
  }






  
    //Is call all the inner function
    startGame();
    playMatch();
  };
  
  //start the game function
  game();