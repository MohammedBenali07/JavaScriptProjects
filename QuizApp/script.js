const settingsContainer = document.querySelector(".config-container");
const quizSection = document.querySelector(".quiz-container");
const answerChoices = quizSection.querySelector(".answer-options");
const nextBtn = quizSection.querySelector(".next-question-btn");
const progressIndicator = quizSection.querySelector(".question-status");
const countdownDisplay = quizSection.querySelector(".timer-duration");
const outcomeSection = document.querySelector(".result-container");
const MAX_TIME = 15;
let remainingTime = MAX_TIME;
let countdownTimer = null;
let selectedCategory = "programming";
let totalQuestions = 3;
let activeQuestion = null;
const attemptedQuestions = [];
let correctAnswerCount = 0;
let canSelectAnswer = true;

const showOutcome = () => {
  clearInterval(countdownTimer);
  document.querySelector(".quiz-popup").classList.remove("active");
  document.querySelector(".result-popup").classList.add("active");
  const resultMessage = `You answered <b>${correctAnswerCount}</b> out of <b>${totalQuestions}</b> questions correctly. Great effort!`;
  outcomeSection.querySelector(".result-message").innerHTML = resultMessage;
};

const resetCountdown = () => {
  clearInterval(countdownTimer);
  remainingTime = MAX_TIME;
  countdownDisplay.textContent = `${remainingTime}s`;
};

const startCountdown = () => {
  countdownTimer = setInterval(() => {
    remainingTime--;
    countdownDisplay.textContent = `${remainingTime}s`;
    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      canSelectAnswer = false;
      nextBtn.style.visibility = "visible";
      quizSection.querySelector(".quiz-timer").style.background = "#c31402";
      revealCorrectAnswer();
      answerChoices.querySelectorAll(".answer-option").forEach((option) => (option.style.pointerEvents = "none"));
    }
  }, 1000);
};

const fetchRandomQuestion = () => {
  const categoryQuestions = questions.find((category) => category.category.toLowerCase() === selectedCategory.toLowerCase())?.questions || [];
  if (attemptedQuestions.length >= Math.min(totalQuestions, categoryQuestions.length)) {
    return showOutcome();
  }
  const remainingQuestions = categoryQuestions.filter((_, idx) => !attemptedQuestions.includes(idx));
  const randomQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
  attemptedQuestions.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};

const revealCorrectAnswer = () => {
  const correctChoice = answerChoices.querySelectorAll(".answer-option")[activeQuestion.correctAnswer];
  correctChoice.classList.add("correct");
  const iconMarkup = `<span class="material-symbols-rounded"> check_circle </span>`;
  correctChoice.insertAdjacentHTML("beforeend", iconMarkup);
};

const handleAnswerChoice = (selectedOption, choiceIndex) => {
  if (!canSelectAnswer) return;
  clearInterval(countdownTimer);
  canSelectAnswer = false;
  const isCorrect = activeQuestion.correctAnswer === choiceIndex;
  selectedOption.classList.add(isCorrect ? "correct" : "incorrect");
  if (!isCorrect) revealCorrectAnswer();
  else correctAnswerCount++;
  const iconMarkup = `<span class="material-symbols-rounded"> ${isCorrect ? "check_circle" : "cancel"} </span>`;
  selectedOption.insertAdjacentHTML("beforeend", iconMarkup);
  answerChoices.querySelectorAll(".answer-option").forEach((option) => (option.style.pointerEvents = "none"));
  nextBtn.style.visibility = "visible";
};

const displayQuestion = () => {
  activeQuestion = fetchRandomQuestion();
  if (!activeQuestion) return;
  canSelectAnswer = true;
  resetCountdown();
  startCountdown();
  nextBtn.style.visibility = "hidden";
  quizSection.querySelector(".quiz-timer").style.background = "#32313C";
  quizSection.querySelector(".question-text").textContent = activeQuestion.question;
  progressIndicator.innerHTML = `<b>${attemptedQuestions.length}</b> of <b>${totalQuestions}</b> Questions`;
  answerChoices.innerHTML = "";
  activeQuestion.options.forEach((option, idx) => {
    const listItem = document.createElement("li");
    listItem.classList.add("answer-option");
    listItem.textContent = option;
    answerChoices.append(listItem);
    listItem.addEventListener("click", () => handleAnswerChoice(listItem, idx));
  });
};

const beginQuiz = () => {
  document.querySelector(".config-popup").classList.remove("active");
  document.querySelector(".quiz-popup").classList.add("active");
  selectedCategory = settingsContainer.querySelector(".category-option.active").textContent;
  totalQuestions = parseInt(settingsContainer.querySelector(".question-option.active").textContent);
  displayQuestion();
};

settingsContainer.querySelectorAll(".category-option, .question-option").forEach((option) => {
  option.addEventListener("click", () => {
    option.parentNode.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

const restartQuiz = () => {
  resetCountdown();
  correctAnswerCount = 0;
  attemptedQuestions.length = 0;
  document.querySelector(".config-popup").classList.add("active");
  document.querySelector(".result-popup").classList.remove("active");
};

nextBtn.addEventListener("click", displayQuestion);
outcomeSection.querySelector(".try-again-btn").addEventListener("click", restartQuiz);
settingsContainer.querySelector(".start-quiz-btn").addEventListener("click", beginQuiz);
