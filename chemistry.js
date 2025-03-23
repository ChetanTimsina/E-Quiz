const chemistryQuiz = [
  {
    question: "What is the chemical symbol for water?",
    answer: ["H2O", "CO2", "H2", "O2"],
    correct: "H2O",
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answer: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
    correct: "Carbon Dioxide",
  },
  {
    question: "Which element is known as the 'King of Chemicals'?",
    answer: ["Sulfuric Acid", "Oxygen", "Nitrogen", "Hydrogen"],
    correct: "Sulfuric Acid",
  },
  {
    question: "What is the most abundant gas in Earth's atmosphere?",
    answer: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"],
    correct: "Nitrogen",
  },
  {
    question: "What is the pH value of pure water?",
    answer: ["9", "7", "5", "12"],
    correct: "7",
  },
  {
    question: "Which gas is known as 'laughing gas'?",
    answer: ["Chlorine", "Nitrous Oxide", "Methane", "Carbon Monoxide"],
    correct: "Nitrous Oxide",
  },
  {
    question: "Which element has the highest electrical conductivity?",
    answer: ["Silver", "Gold", "Aluminum", "Copper"],
    correct: "Silver",
  },
  {
    question: "Which metal is liquid at room temperature?",
    answer: ["Iron", "Mercury", "Lead", "Zinc"],
    correct: "Mercury",
  },
  {
    question: "Which element is necessary for breathing?",
    answer: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correct: "Oxygen",
  },
  {
    question: "What is the atomic number of Carbon?",
    answer: ["14", "6", "12", "8"],
    correct: "6",
  },
  {
    question: "Which acid is found in lemons?",
    answer: [
      "Acetic Acid",
      "Sulfuric Acid",
      "Citric Acid",
      "Hydrochloric Acid",
    ],
    correct: "Citric Acid",
  },
  {
    question: "What is the lightest element in the periodic table?",
    answer: ["Lithium", "Oxygen", "Hydrogen", "Helium"],
    correct: "Hydrogen",
  },
  {
    question: "What is the common name for sodium chloride?",
    answer: ["Sugar", "Salt", "Baking Soda", "Vinegar"],
    correct: "Salt",
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
Question.innerHTML = chemistryQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("chemistrypoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = chemistryQuiz[QuesNo].answer[options];
  options++;
});

next_button.addEventListener("click", () => {
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
        localStorage.setItem("chemistrypoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = chemistryQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = chemistryQuiz[QuesNo].answer[options];
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

      if (selectedAnswer === chemistryQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            chemistryQuiz[currentQuesNo].correct
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
