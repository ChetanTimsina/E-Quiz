const biologyQuiz = [
  {
    question: "What is the basic unit of life?",
    answer: ["Organ", "Molecule", "Atom", "Cell"],
    correct: "Cell",
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    answer: ["Lungs", "Kidney", "Liver", "Heart"],
    correct: "Heart",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answer: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: "Carbon Dioxide",
  },
  {
    question: "What is the powerhouse of the cell?",
    answer: ["Golgi Apparatus", "Nucleus", "Mitochondria", "Ribosome"],
    correct: "Mitochondria",
  },
  {
    question: "Which vitamin is produced when the skin is exposed to sunlight?",
    answer: ["Vitamin A", "Vitamin B12", "Vitamin D", "Vitamin C"],
    correct: "Vitamin D",
  },
  {
    question: "What is the largest organ in the human body?",
    answer: ["Lungs", "Brain", "Skin", "Liver"],
    correct: "Skin",
  },
  {
    question: "Which blood type is known as the universal donor?",
    answer: ["AB+", "B-", "A+", "O-"],
    correct: "O-",
  },
  {
    question: "What type of blood cells help fight infections?",
    answer: ["Plasma", "Red Blood Cells", "White Blood Cells", "Platelets"],
    correct: "White Blood Cells",
  },
  {
    question: "Which part of the plant is responsible for photosynthesis?",
    answer: ["Leaf", "Root", "Stem", "Flower"],
    correct: "Leaf",
  },
  {
    question: "Which is the longest bone in the human body?",
    answer: ["Tibia", "Humerus", "Femur", "Radius"],
    correct: "Femur",
  },
  {
    question: "Which organ is responsible for filtering waste from the blood?",
    answer: ["Kidney", "Liver", "Heart", "Stomach"],
    correct: "Kidney",
  },
  {
    question:
      "Which animal is known for changing its color to blend with its surroundings?",
    answer: ["Octopus", "Chameleon", "Jellyfish", "Cuttlefish"],
    correct: "Chameleon",
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
Question.innerHTML = biologyQuiz[QuesNo].question;
let options = 0;
let next_text = document.querySelector("#next_text");
let max_points = localStorage.getItem("biologypoints") || 0;
max_points = Number(max_points);
let points = 0;
option.forEach((opt) => {
  opt.innerHTML = biologyQuiz[QuesNo].answer[options];
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
        localStorage.setItem("biologypoints", max_points);
        points = 0;
      }
      QuesNo = 0;
      score = 0;
    }

    Question.innerHTML = biologyQuiz[QuesNo].question;
    let options = 0;
    option.forEach((opt) => {
      opt.innerHTML = biologyQuiz[QuesNo].answer[options];
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

      if (selectedAnswer === biologyQuiz[currentQuesNo].correct) {
        resultDiv.classList.add("correct");
        score++;
      } else {
        resultDiv.classList.add("wrong");
        answereds.forEach((answer) => {
          if (
            answer.querySelector(".option").innerHTML ===
            biologyQuiz[currentQuesNo].correct
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
