const historyQuiz = [
  {
    question: "Who was the first King of Bhutan?",
    answer: [
      "Jigme Dorji Wangchuck",
      "Zhabdrung Ngawang Namgyal",
      "Jigme Singye Wangchuck",
      "Ugyen Wangchuck",
    ],
    correct: "Ugyen Wangchuck",
  },
  {
    question:
      "In which year did Bhutan officially become a democratic constitutional monarchy?",
    answer: ["2015", "1998", "2008", "1971"],
    correct: "2008",
  },
  {
    question: "Who unified Bhutan in the 17th century?",
    answer: [
      "Jigme Dorji Wangchuck",
      "Padmasambhava",
      "Ugyen Wangchuck",
      "Zhabdrung Ngawang Namgyal",
    ],
    correct: "Zhabdrung Ngawang Namgyal",
  },
  {
    question: "What is the traditional name of Bhutan?",
    answer: ["Zangdok Palri", "Druk Yul", "Lho Mon", "Dorji Ling"],
    correct: "Druk Yul",
  },
  {
    question:
      "Which foreign country had a major influence on Bhutan's early modernization?",
    answer: ["China", "India", "Tibet", "Nepal"],
    correct: "India",
  },
  {
    question: "When did Bhutan join the United Nations?",
    answer: ["1965", "1985", "1971", "1956"],
    correct: "1971",
  },
  {
    question:
      "Which King introduced Gross National Happiness (GNH) as a development philosophy?",
    answer: [
      "Jigme Singye Wangchuck",
      "Jigme Dorji Wangchuck",
      "Ugyen Wangchuck",
      "Jigme Khesar Namgyel Wangchuck",
    ],
    correct: "Jigme Singye Wangchuck",
  },
  {
    question: "What is the capital city of Bhutan?",
    answer: ["Trongsa", "Thimphu", "Paro", "Punakha"],
    correct: "Thimphu",
  },
  {
    question:
      "Which dzong was the first administrative and religious center of Bhutan?",
    answer: [
      "Tashichho Dzong",
      "Rinpung Dzong",
      "Trongsa Dzong",
      "Punakha Dzong",
    ],
    correct: "Punakha Dzong",
  },
  {
    question: "What is the national emblem of Bhutan?",
    answer: ["A snow lion", "A tiger", "A dragon", "A golden eagle"],
    correct: "A dragon",
  },
  {
    question: "Which dynasty has ruled Bhutan since 1907?",
    answer: [
      "Namgyal Dynasty",
      "Wangchuck Dynasty",
      "Chogyal Dynasty",
      "Rinpoche Dynasty",
    ],
    correct: "Wangchuck Dynasty",
  },
  {
    question: "Which historic event took place in Bhutan in 2006?",
    answer: [
      "The signing of the Indo-Bhutan treaty",
      "The abdication of King Jigme Singye Wangchuck",
      "The coronation of the first king",
      "The establishment of democracy",
    ],
    correct: "The abdication of King Jigme Singye Wangchuck",
  },
  {
    question:
      "Which battle in the 17th century helped Bhutan maintain its independence from Tibet?",
    answer: [
      "The Battle of Trongsa",
      "The Battle of Five Lamas",
      "The Battle of Changlimithang",
      "The Punakha Treaty",
    ],
    correct: "The Battle of Five Lamas",
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
Question.innerHTML = historyQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("historypoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = historyQuiz[QuesNo].answer[options];
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
        localStorage.setItem("historypoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = historyQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = historyQuiz[QuesNo].answer[options];
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

      if (selectedAnswer === historyQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            historyQuiz[currentQuesNo].correct
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
