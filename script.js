function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const question_elem = document.getElementById("question");
const answer_elem = document.getElementById("answer")
const answer_form_elem = document.getElementById("answer_form");

answer_form_elem.addEventListener("submit", (event) => {
  event.preventDefault(); // stop page reload

  if (answer_elem.value === "" || Number.isNaN(answer_elem.value)) {
    return; // block invalid input
  }

  onAnswerSubmit(answer_elem.value);
});


let start_time;
let attempt_history = JSON.parse(localStorage.getItem("attempt_history")) || [];

// QUESTION STUFF
let question = [0, 0, 0];
newQuestion();

function generateQuestion() {
  let a = rand(3, 9);
  let b = rand(3, 9);
  let c = a * b;
  return [a, b, c];
}

function showQuestion(question) {
  question_elem.textContent = `${question[0]} · ${question[1]} =`;
}

// ANSWER STUFF
function onAnswerSubmit(answer) {
  let response_time = (Date.now() - start_time);
  logAttempt(question[0], question[1], answer, response_time)

  if (answer == question[2]) {
    console.log("correct");
  }
  else {
    console.log("wrong");
  }

  answer_elem.value = ""; //clear input field
  newQuestion()
}

function newQuestion() {
  question = generateQuestion()
  showQuestion(question);
  start_time = Date.now();
}

function logAttempt(a, b, answer, response_time) {
  const attempt = {
    a: a,
    b: b,
    answer: Number(answer),
    response_time: response_time,
    correct: Number(answer) === a * b,
   };

  //console.log(JSON.stringify(attempt));

  attempt_history.push(attempt);
  localStorage.setItem("attempt_history", JSON.stringify(attempt_history));
}
