const mathQuiz = [
  {
    question: "What is 7 + 8?",
    answer: ["16", "14", "13", "15"],
    correct: "15",
  },
  {
    question: "What is the square root of 64?",
    answer: ["6", "4", "10", "8"],
    correct: "8",
  },
  {
    question: "What is 12 × 5?",
    answer: ["55", "60", "50", "70"],
    correct: "60",
  },
  {
    question: "What is the value of π (pi) rounded to two decimal places?",
    answer: ["3.12", "3.18", "3.14", "3.16"],
    correct: "3.14",
  },
  {
    question: "What is 100 divided by 4?",
    answer: ["40", "50", "20", "25"],
    correct: "25",
  },
  {
    question: "What is the perimeter of a square with side length 6?",
    answer: ["12", "18", "36", "24"],
    correct: "24",
  },
  {
    question: "Which is the smallest prime number?",
    answer: ["1", "3", "5", "2"],
    correct: "2",
  },
  {
    question: "What is 9 squared?",
    answer: ["72", "81", "99", "90"],
    correct: "81",
  },
  {
    question: "What is the sum of angles in a triangle?",
    answer: ["270°", "360°", "90°", "180°"],
    correct: "180°",
  },
  {
    question:
      "If a number is divisible by both 2 and 3, it is also divisible by?",
    answer: ["5", "4", "12", "6"],
    correct: "6",
  },
  {
    question: "What is the next number in the sequence: 2, 4, 8, 16, __?",
    answer: ["24", "32", "40", "20"],
    correct: "32",
  },
];
let Question = document.querySelector("#Question");
let option = document.querySelectorAll(".option");
let next_button = document.querySelector("#next_button");
let QuesNo = 0;
let canGoNext = 0;
let no_question = 11;
let progress_done = document.querySelector("#progress_done");
let Ques_no = document.querySelector("#Ques_no");
progress_done.style.width = `${((QuesNo + 1) / no_question) * 100}%`;
Ques_no.innerHTML = `${QuesNo + 1}/${no_question}`;
Question.innerHTML = mathQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("mathpoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = mathQuiz[QuesNo].answer[options];
  options++;
});

$("#next_button").click(() => {
  if (canGoNext > 0) {
    if (QuesNo + 1 < no_question) {
      QuesNo++;
      next_text.innerHTML = "Next";
    } else {
      next_text.innerHTML = `Your Score is ${score}. Play Again`;
      points = 15 * score;
      // sending points gained here
      if (points > max_points) {
        max_points = points;
        localStorage.setItem("mathpoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = mathQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = mathQuiz[QuesNo].answer[options];
      options++;
    });

    answereds.forEach((answered) => {
      let resultDiv = answered.querySelector(".result");
      resultDiv.classList.remove("wrong");
      resultDiv.classList.remove("correct");
      answered.classList.remove("disabled");
    });

    click = 0;
    canGoNext = 0;
    time = 30;
    progress_done.style.width = `${((QuesNo + 1) / no_question) * 100}%`;
    Ques_no.innerHTML = `${QuesNo + 1}/${no_question}`;
  }
});

let answereds = document.querySelectorAll(".answereds");
let score = 0,
  click = 0;
answereds.forEach((answered) => {
  answered.addEventListener("click", () => {
    if (click === 0) {
      let currentQuesNo = QuesNo;
      let selectedAnswer = answered.querySelector(".option").innerHTML;
      let resultDiv = answered.querySelector(".result");

      if (selectedAnswer === mathQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            mathQuiz[currentQuesNo].correct
          ) {
            answer.querySelector(".result").classList.add("correct");
          }
        });
      }

      for (let ans of answereds) {
        ans.classList.add("disabled");
      }

      canGoNext = 1;
      click++;
    }
  });
});

let time = 30; // in seconds
let countdown = document.querySelector("#countdown");

setInterval(updateCountdown, 1000);
function updateCountdown() {
  if (time > 0) {
    countdown.innerHTML = time;
    time--;
  } else {
    next_button.dispatchEvent(new Event("click"));
    canGoNext = 1;
  }
}
