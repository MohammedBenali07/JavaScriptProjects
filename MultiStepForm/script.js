const formPage = document.querySelector(".slide-page");
const nextBtnStepOne = document.querySelector(".firstNext");
const prevBtnStepTwo = document.querySelector(".prev-1");
const nextBtnStepTwo = document.querySelector(".next-1");
const prevBtnStepThree = document.querySelector(".prev-2");
const nextBtnStepThree = document.querySelector(".next-2");
const prevBtnStepFour = document.querySelector(".prev-3");
const submitFormBtn = document.querySelector(".submit");
const progressTitles = document.querySelectorAll(".step p");
const progressChecks = document.querySelectorAll(".step .check");
const progressBullets = document.querySelectorAll(".step .bullet");

let currentStep = 1;

nextBtnStepOne.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "-25%";
  progressBullets[currentStep - 1].classList.add("active");
  progressChecks[currentStep - 1].classList.add("active");
  progressTitles[currentStep - 1].classList.add("active");
  currentStep += 1;
});

nextBtnStepTwo.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "-50%";
  progressBullets[currentStep - 1].classList.add("active");
  progressChecks[currentStep - 1].classList.add("active");
  progressTitles[currentStep - 1].classList.add("active");
  currentStep += 1;
});

nextBtnStepThree.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "-75%";
  progressBullets[currentStep - 1].classList.add("active");
  progressChecks[currentStep - 1].classList.add("active");
  progressTitles[currentStep - 1].classList.add("active");
  currentStep += 1;
});

submitFormBtn.addEventListener("click", function(){
  progressBullets[currentStep - 1].classList.add("active");
  progressChecks[currentStep - 1].classList.add("active");
  progressTitles[currentStep - 1].classList.add("active");
  currentStep += 1;
  setTimeout(function(){
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
});

prevBtnStepTwo.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "0%";
  progressBullets[currentStep - 2].classList.remove("active");
  progressChecks[currentStep - 2].classList.remove("active");
  progressTitles[currentStep - 2].classList.remove("active");
  currentStep -= 1;
});

prevBtnStepThree.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "-25%";
  progressBullets[currentStep - 2].classList.remove("active");
  progressChecks[currentStep - 2].classList.remove("active");
  progressTitles[currentStep - 2].classList.remove("active");
  currentStep -= 1;
});

prevBtnStepFour.addEventListener("click", function(event){
  event.preventDefault();
  formPage.style.marginLeft = "-50%";
  progressBullets[currentStep - 2].classList.remove("active");
  progressChecks[currentStep - 2].classList.remove("active");
  progressTitles[currentStep - 2].classList.remove("active");
  currentStep -= 1;
});
