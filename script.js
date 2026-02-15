const startBtn = document.querySelector(".start_button button");
const infoBox = document.querySelector(".information_box");
const quizBox = document.querySelector(".quiz_box");
const quitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");
const optionList = document.querySelector(".option_list");
const questionText = document.querySelector(".question span");
const timerSec = document.querySelector(".timer_sec");
const counterText = document.querySelector(".question_counter");
const progressCircle = document.querySelector(".progress");
const circleLength = 163;
const nextBtn = document.querySelector(".next_btn");
const exitBtn = document.querySelector(".exit_btn");

let questionIndex = 0;
let score = 0;
let timeValue = 15;
let counter;

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag creates hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: "<a>",
  },
  {
    question: "Which tag inserts image?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    answer: "<img>",
  },
  {
    question: "CSS stands for?",
    options: [
      "Creative Style Sheet",
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Colorful Style System",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which property changes text color?",
    options: ["font-color", "color", "text-style", "bg-color"],
    answer: "color",
  },
  {
    question: "Which property changes background?",
    options: ["background-color", "bg", "color", "paint"],
    answer: "background-color",
  },
  {
    question: "How to select class?",
    options: ["#name", ".name", "*name", "classname"],
    answer: ".name",
  },
  {
    question: "How to select id?",
    options: ["#id", ".id", "id", "*id"],
    answer: "#id",
  },
  {
    question: "Which property sets font size?",
    options: ["size", "font-style", "font-size", "text-size"],
    answer: "font-size",
  },
  {
    question: "Which property makes bold?",
    options: ["bold", "font-weight", "font-style", "text-bold"],
    answer: "font-weight",
  },
  {
    question: "JS comment symbol?",
    options: ["<!-- -->", "//", "##", "**"],
    answer: "//",
  },
  {
    question: "Console print?",
    options: ["print()", "console.log()", "echo()", "write()"],
    answer: "console.log()",
  },
  {
    question: "Declare variable?",
    options: ["var", "int", "string", "define"],
    answer: "var",
  },
  {
    question: "Create function?",
    options: ["method", "function", "func", "define"],
    answer: "function",
  },
  {
    question: "Call function test?",
    options: ["call test", "test[]", "test()", "run test"],
    answer: "test()",
  },
  {
    question: "Equality operator?",
    options: ["=", "==", "===", "Both B and C"],
    answer: "Both B and C",
  },
  {
    question: "Decision statement?",
    options: ["for", "if", "loop", "switcher"],
    answer: "if",
  },
  {
    question: "Loop while true?",
    options: ["for", "while", "if", "do"],
    answer: "while",
  },
  {
    question: "Add to array?",
    options: ["add()", "push()", "insert()", "append()"],
    answer: "push()",
  },
  {
    question: "DOM stands for?",
    options: [
      "Data Object Model",
      "Document Object Model",
      "Digital Object Method",
      "Document Order Model",
    ],
    answer: "Document Object Model",
  },
];

// Duplicate to reach 50
while (questions.length < 50) {
  questions.push(...questions.slice(0, 50 - questions.length));
}

startBtn.onclick = () => {
  infoBox.style.display = "block";
  startBtn.parentElement.style.display = "none";
};

quitBtn.onclick = () => {
  infoBox.style.display = "none";
  startBtn.parentElement.style.display = "block";
};

continueBtn.onclick = () => {
  infoBox.style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
  startTimer();
};

nextBtn.onclick = () => {
  clearInterval(counter);
  nextQuestion();
};

exitBtn.onclick = () => {
  clearInterval(counter);
  location.reload();
};

function showQuestion() {
  timeValue = 15;
  timerSec.textContent = timeValue;

  let q = questions[questionIndex];
  questionText.textContent = q.question;
  optionList.innerHTML = "";

  counterText.textContent = `Question ${questionIndex + 1} of ${questions.length}`;

  q.options.forEach((option) => {
    let div = document.createElement("div");
    div.classList.add("option");
    div.textContent = option;
    div.onclick = () => selectAnswer(div, q.answer);
    optionList.appendChild(div);
  });
}

function selectAnswer(element, correct) {
  clearInterval(counter);

  document.querySelectorAll(".option").forEach((opt) => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    }
  });

  if (element.textContent === correct) {
    score++;
  } else {
    element.classList.add("wrong");
  }

  setTimeout(nextQuestion, 1000);
}

function startTimer() {
  progressCircle.style.strokeDashoffset = 0;

  counter = setInterval(() => {
    timeValue--;
    timerSec.textContent = timeValue;

    let progress = circleLength - (circleLength * timeValue) / 15;
    progressCircle.style.strokeDashoffset = progress;

    if (timeValue <= 0) {
      clearInterval(counter);
      showCorrect();
    }
  }, 1000);
}

function showCorrect() {
  let correct = questions[questionIndex].answer;

  document.querySelectorAll(".option").forEach((opt) => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    }
  });

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.innerHTML = `
    <div style="padding:30px;text-align:center">
      <h2>You scored ${score} out of ${questions.length}</h2>
      <button onclick="location.reload()">Restart Quiz</button>
    </div>
  `;
}
