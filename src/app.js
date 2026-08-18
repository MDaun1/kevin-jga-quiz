const wheel = document.getElementById("wheel");
const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");

function spinWheel() {
  // einfache Fake-Animation: Farbe wechseln
  wheel.style.transition = "transform 2s ease-out";
  wheel.style.transform = "rotate(" + (Math.random() * 2000 + 1000) + "deg)";

  setTimeout(() => {
    wheel.style.transform = "rotate(0deg)";
    loadRandomQuestion();
  }, 2000);
}

function loadRandomQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  questionBox.innerHTML = q.question;
  answersBox.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.innerHTML = ans;

    div.onclick = () => {
      if (i === q.correct) {
        div.classList.add("correct");
        alert("🔥 RICHTIG! Meme‑Power aktiviert!");
      } else {
        div.classList.add("wrong");
        alert("💀 FALSCH! Kevin verliert ein Leben!");
      }
    };

    answersBox.appendChild(div);
  });
}
