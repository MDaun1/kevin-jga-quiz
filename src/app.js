const wheel = document.getElementById("wheel");
const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");

function spinWheel() {
  // Zufällige Drehung zwischen 2000° und 6000°
  const randomSpin = Math.floor(Math.random() * 4000) + 2000;

  wheel.style.transform = `rotate(${randomSpin}deg)`;

  setTimeout(() => {
    loadRandomQuestion();
  }, 3000);
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
