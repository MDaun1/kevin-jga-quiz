const wheel = document.getElementById("wheel");
const categoryBox = document.getElementById("category");
const questionBox = document.getElementById("question");
const answerBox = document.getElementById("answer");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const resultButtons = document.getElementById("resultButtons");
const progressBox = document.getElementById("progress");

const categories = Object.keys(questions);

// Alle Fragen in ein einziges Array packen
let allQuestions = [];
categories.forEach(cat => {
  questions[cat].forEach(q => {
    allQuestions.push({ ...q, category: cat });
  });
});

// Fragen, die noch nicht richtig beantwortet wurden
let remainingQuestions = [...allQuestions];

// Zähler
let answeredCount = 0;

// Aktuelle Frage
let currentQuestion = null;

function spinWheel() {
  answerBox.style.display = "none";
  showAnswerBtn.style.display = "none";
  resultButtons.style.display = "none";
  questionBox.innerHTML = "";
  categoryBox.innerHTML = "";

  if (remainingQuestions.length === 0) {
    categoryBox.innerHTML = "🎉 Alle Fragen richtig beantwortet!";
    return;
  }

  const randomSpin = Math.floor(Math.random() * 3600) + 2000;
  wheel.style.transform = `rotate(${randomSpin}deg)`;

  setTimeout(() => {
    // Kategorie zufällig auswählen
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    categoryBox.innerHTML = "Kategorie: " + selectedCategory;

    // Frage aus remainingQuestions dieser Kategorie holen
    const filtered = remainingQuestions.filter(q => q.category === selectedCategory);

    // Falls diese Kategorie leer ist → andere Kategorie wählen
    let q;
    if (filtered.length === 0) {
      q = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    } else {
      q = filtered[Math.floor(Math.random() * filtered.length)];
    }

    currentQuestion = q;

    questionBox.innerHTML = q.question;
    answerBox.innerHTML = q.answer;

    showAnswerBtn.style.display = "inline-block";

  }, 4000);
}

function showAnswer() {
  answerBox.style.display = "block";
  resultButtons.style.display = "block";
}

function markCorrect() {
  // Frage aus remainingQuestions entfernen
  remainingQuestions = remainingQuestions.filter(q => q !== currentQuestion);

  answeredCount++;
  progressBox.innerHTML = "Beantwortet: " + answeredCount;

  resultButtons.style.display = "none";
  showAnswerBtn.style.display = "none";
  answerBox.style.display = "none";

  questionBox.innerHTML = "✔️ Richtig beantwortet!";
}

function markWrong() {
  // Falsch beantwortete Fragen bleiben im Pool
  answeredCount++;
  progressBox.innerHTML = "Beantwortet: " + answeredCount;

  resultButtons.style.display = "none";
  showAnswerBtn.style.display = "none";
  answerBox.style.display = "none";

  questionBox.innerHTML = "❌ Falsch beantwortet!";
}
