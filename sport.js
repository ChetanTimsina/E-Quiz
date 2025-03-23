const sportsQuiz = [
  {
    question: "Which sport is played at Wimbledon?",
    answer: ["Football", "Tennis", "Basketball", "Cricket"],
    correct: "Tennis",
  },
  {
    question: "How many players are on a standard soccer team?",
    answer: ["9", "7", "11", "13"],
    correct: "11",
  },
  {
    question: "Which sport uses a hoop and a net?",
    answer: ["Tennis", "Basketball", "Baseball", "Volleyball"],
    correct: "Basketball",
  },
  {
    question: "Which country won the 2018 FIFA World Cup?",
    answer: ["Argentina", "France", "Germany", "Brazil"],
    correct: "France",
  },
  {
    question: "What is the national sport of Japan?",
    answer: ["Karate", "Judo", "Sumo Wrestling", "Baseball"],
    correct: "Sumo Wrestling",
  },
  {
    question: "How many rings are on the Olympic flag?",
    answer: ["6", "3", "4", "5"],
    correct: "5",
  },
  {
    question: "Which sport is known as 'America’s pastime'?",
    answer: ["Basketball", "Hockey", "Baseball", "American Football"],
    correct: "Baseball",
  },
  {
    question: "In which sport do you use a shuttlecock?",
    answer: ["Tennis", "Squash", "Golf", "Badminton"],
    correct: "Badminton",
  },
  {
    question: "Which sport features the 'slam dunk' move?",
    answer: ["Volleyball", "Basketball", "Rugby", "Tennis"],
    correct: "Basketball",
  },
  {
    question: "What do you hit in a game of golf?",
    answer: ["Baseball", "Golf ball", "Hockey puck", "Tennis ball"],
    correct: "Golf ball",
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
Question.innerHTML = sportsQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("sportpoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = sportsQuiz[QuesNo].answer[options];
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
        localStorage.setItem("sportpoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = sportsQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = sportsQuiz[QuesNo].answer[options];
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

      if (selectedAnswer === sportsQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            sportsQuiz[currentQuesNo].correct
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
  }
}
