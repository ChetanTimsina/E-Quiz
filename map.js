const mapQuiz = [
  {
    question: "Which is the largest continent by land area?",
    answer: ["Europe", "Africa", "Asia", "North America"],
    correct: "Asia",
  },
  {
    question: "Which ocean is the largest?",
    answer: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correct: "Pacific Ocean",
  },
  {
    question: "Which country has the most borders with other countries?",
    answer: ["China", "Germany", "Brazil", "Russia"],
    correct: "China",
  },
  {
    question: "Which is the longest river in the world?",
    answer: [
      "Amazon River",
      "Yangtze River",
      "Mississippi River",
      "Nile River",
    ],
    correct: "Nile River",
  },
  {
    question: "Which is the smallest country in the world?",
    answer: ["Maldives", "Vatican City", "Monaco", "San Marino"],
    correct: "Vatican City",
  },
  {
    question: "Which mountain is the tallest in the world?",
    answer: ["K2", "Mount Everest", "Mount Kilimanjaro", "Mount Denali"],
    correct: "Mount Everest",
  },
  {
    question: "Which desert is the largest by area?",
    answer: [
      "Sahara Desert",
      "Gobi Desert",
      "Kalahari Desert",
      "Antarctic Desert",
    ],
    correct: "Antarctic Desert",
  },
  {
    question:
      "Which line divides the Earth into the Northern and Southern Hemispheres?",
    answer: [
      "Tropic of Cancer",
      "Prime Meridian",
      "Equator",
      "International Date Line",
    ],
    correct: "Equator",
  },
  {
    question: "Which U.S. state has the longest coastline?",
    answer: ["Florida", "California", "Alaska", "Hawaii"],
    correct: "Alaska",
  },
  {
    question: "Which European country has the most islands?",
    answer: ["Norway", "Greece", "United Kingdom", "Sweden"],
    correct: "Sweden",
  },
  {
    question: "Which country is both in Europe and Asia?",
    answer: ["Kazakhstan", "Turkey", "Russia", "Georgia"],
    correct: "Russia",
  },
  {
    question: "Which African country is the largest by land area?",
    answer: ["Algeria", "Sudan", "Democratic Republic of Congo", "Egypt"],
    correct: "Algeria",
  },
];

let Question = document.querySelector("#Question");
let option = document.querySelectorAll(".option");
let next_button = document.querySelector("#next_button");
let QuesNo = 0;
let canGoNext = 0;
let no_question = 10;
let progress_done = document.querySelector("#progress_done");
let Ques_no = document.querySelector("#Ques_no");
progress_done.style.width = `${((QuesNo + 1) / no_question) * 100}%`;
Ques_no.innerHTML = `${QuesNo + 1}/${no_question}`;
Question.innerHTML = mapQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("mappoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = mapQuiz[QuesNo].answer[options];
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
        localStorage.setItem("mappoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = mapQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = mapQuiz[QuesNo].answer[options];
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

      if (selectedAnswer === mapQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            mapQuiz[currentQuesNo].correct
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
