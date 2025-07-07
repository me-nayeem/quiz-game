function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];   
  }
  return array;
}


let shuffledQuestions = shuffleArray(questions);

let currentIndex = 0;
let score = 0;
let time = 30;
let timer;

const scoreDisplay = document.querySelector("h3");
const timerDisplay = document.querySelector(".timer");
const questionText = document.querySelector(".question");
const options = document.querySelectorAll(".A-num");
const finalMsg = document.getElementById("final-msg");
const answerMsg = document.querySelector(".select");

function loadQuestion() {
  clearInterval(timer);
  time = 30;
  startTimer();

  const currentQ = shuffledQuestions[currentIndex];
  questionText.innerHTML = `<span>0${currentIndex + 1}. </span>${currentQ.question}`;
  options.forEach((btn, i) => {
    btn.textContent = currentQ.options[i];
    btn.style.background = "#111"; 
    btn.style.pointerEvents = "auto"; 
  });

  answerMsg.textContent = "Select an answer...";
  finalMsg.textContent = "";
}

function startTimer() {
  timerDisplay.textContent = `Time Left: ${time}`;
  timer = setInterval(() => {
    time--;
    timerDisplay.textContent = `Time Left: ${time}`;
    if (time === 0) {
      clearInterval(timer);
      disableOptions();
      finalMsg.textContent = "Time's up! Click to continue.";
    }
  }, 1000);
}

function disableOptions() {
  options.forEach(option => option.style.pointerEvents = "none");
}

options.forEach(option => {
  option.addEventListener("click", () => {
    const selected = option.textContent.trim().charAt(0);
    const correct = shuffledQuestions[currentIndex].correct;

    if (selected === correct) {
      score++;
      option.style.background = "green";
      answerMsg.textContent = `The answer is: ${correct}`;
      finalMsg.textContent = "Right answer. Next!";
    } else {
      option.style.background = "red";
      answerMsg.textContent = `Wrong! The correct answer is: ${correct}`;
      finalMsg.textContent = "Wrong answer. Try next!";
    }

    scoreDisplay.textContent = `Score : ${score}`;
    disableOptions();
    clearInterval(timer);
  });
});

finalMsg.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    questionText.textContent = "Quiz Finished!";
    options.forEach(opt => opt.style.display = "none");
    finalMsg.textContent = `Final Score: ${score} / ${shuffledQuestions.length}`;
    timerDisplay.textContent = "";
    answerMsg.textContent = "";
  }
});

loadQuestion(); 
