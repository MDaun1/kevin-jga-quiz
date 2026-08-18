let wrongStreak = 0;

// Fragen laden
let allQuestions = [];
const categories = Object.keys(questions);
categories.forEach(cat => {
  questions[cat].forEach(q => {
    allQuestions.push({ ...q, category: cat });
  });
});

let remainingQuestions = [...allQuestions];
let answeredCount = 0;
const totalQuestions = allQuestions.length;

// DOM-Elemente holen
const wheel = document.getElementById("wheel");
const categoryBox = document.getElementById("category");
const questionBox = document.getElementById("question");
const answerBox = document.getElementById("answer");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const resultButtons = document.getElementById("resultButtons");
const progressBox = document.getElementById("progress");

// Counter setzen
progressBox.innerHTML = `Beantwortet: ${answeredCount} / ${totalQuestions}`;

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
  remainingQuestions = remainingQuestions.filter(q => q !== currentQuestion);

  answeredCount++;
  progressBox.innerHTML = `Beantwortet: ${answeredCount} / ${totalQuestions}`;

  wrongStreak = 0; // Reset der falschen Serie

  resultButtons.style.display = "none";
  showAnswerBtn.style.display = "none";
  answerBox.style.display = "none";

  // Richtig-Bild anzeigen
  const correctImg = document.getElementById("correctImage");
  correctImg.style.display = "block";

  // Sound abspielen
  const sound = document.getElementById("correctSound");
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    correctImg.style.display = "none";
    questionBox.innerHTML = "";
  }, 3000);
}


function markWrong() {
  answeredCount++;
  progressBox.innerHTML = `Beantwortet: ${answeredCount} / ${totalQuestions}`;

  wrongStreak++;

  resultButtons.style.display = "none";
  showAnswerBtn.style.display = "none";
  answerBox.style.display = "none";

  // Falsch-Bild anzeigen
  const wrongImg = document.getElementById("wrongImage");
  wrongImg.style.display = "block";

  // Sound abspielen
  const sound = document.getElementById("wrongSound");
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    wrongImg.style.display = "none";
    questionBox.innerHTML = "";
  }, 3000);

  // GAME OVER nach 3 falschen Antworten
  if (wrongStreak >= 3) {
    triggerGameOver();
  }
}

function triggerGameOver() {
  // Alles ausblenden
  document.getElementById("wheel-container").style.display = "none";
  document.querySelector("button[onclick='spinWheel()']").style.display = "none";
  categoryBox.style.display = "none";
  questionBox.style.display = "none";
  answerBox.style.display = "none";
  resultButtons.style.display = "none";
  showAnswerBtn.style.display = "none";

  // Game Over Video anzeigen
  const video = document.getElementById("gameOverVideo");
  video.style.display = "block";
  video.play();
}



