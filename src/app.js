const wheel = document.getElementById("wheel");
const categoryBox = document.getElementById("category");
const questionBox = document.getElementById("question");
const answerBox = document.getElementById("answer");
const showAnswerBtn = document.getElementById("showAnswerBtn");

const categories = Object.keys(questions);

function spinWheel() {
  answerBox.style.display = "none";
  showAnswerBtn.style.display = "none";
  questionBox.innerHTML = "";
  categoryBox.innerHTML = "";

  const randomSpin = Math.floor(Math.random() * 3600) + 2000;
  wheel.style.transform = `rotate(${randomSpin}deg)`;

  setTimeout(() => {
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    categoryBox.innerHTML = "Kategorie: " + selectedCategory;

    const qList = questions[selectedCategory];
    const q = qList[Math.floor(Math.random() * qList.length)];

    questionBox.innerHTML = q.question;
    answerBox.innerHTML = q.answer;

    showAnswerBtn.style.display = "inline-block";

  }, 4000);
}

function showAnswer() {
  answerBox.style.display = "block";
}

