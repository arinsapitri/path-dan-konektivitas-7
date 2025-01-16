const questions = [
  {
    pertanyaan: "Apa yang dimaksud dengan path tertutup dalam graf?",
    jawaban: [
      "Path yang memiliki awal dan akhir yang sama",
      "Path yang tidak memiliki awal dan akhir",
      "Path yang tidak memiliki edge",
    ],
    correctAnswer: 0,
    explanation:
      "Path tertutup adalah path yang memiliki awal dan akhir yang sama, sehingga membentuk siklus.",
  },
  {
    pertanyaan: "Graf berikut ini dikatakan terhubung jika",
    jawaban: [
      "Setiap titik dapat dijangkau dari titik lainnya",
      "Tidak ada edge dalam graf",
      "Setiap titik memiliki derajat 1",
    ],
    correctAnswer: 0,
    explanation:
      "Graf terhubung berarti semua pasangan titik dapat dijangkau, baik langsung maupun melalui jalur tertentu.",
  },
  {
    pertanyaan:
      "Dalam graf berikut, (V, E), V = {A, B, C, D} dan E = {{A, B}, {B, C}, {C, D}, {D, A}}. Apakah graf ini terhubung?",
    jawaban: [
      "Ya, karena semua titik terhubung langsung",
      "Tidak, karena ada titik isolasi",
      "Tidak, karena tidak ada edge",
    ],
    correctAnswer: 0,
    explanation:
      "Semua titik dalam graf terhubung melalui jalur, sehingga graf ini terhubung.",
  },
  {
    pertanyaan: "Apa yang dimaksud dengan graf sederhana?",
    jawaban: [
      "Graf tanpa loop dan edge ganda",
      "Graf tanpa edge",
      "Graf tanpa titik isolasi",
    ],
    correctAnswer: 0,
    explanation:
      "Graf sederhana adalah graf yang tidak memiliki loop (edge dari titik ke dirinya sendiri) atau edge ganda.",
  },
  {
    pertanyaan:
      "Manakah dari berikut ini yang merupakan contoh graf tidak terhubung?",
    jawaban: [
      "Graf dengan dua komponen terhubung",
      "Graf dengan satu komponen terhubung",
      "Graf tanpa edge",
    ],
    correctAnswer: 0,
    explanation:
      "Graf tidak terhubung memiliki lebih dari satu komponen yang tidak saling terhubung.",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleAnswers(questionData) {
  const correctAnswer = questionData.correctAnswer;
  const shuffledAnswers = questionData.jawaban.map((answer, index) => ({
    answer,
    index,
  }));
  shuffledAnswers.sort(() => Math.random() - 0.5);
  const newCorrectAnswerIndex = shuffledAnswers.findIndex(
    (item) => item.index === correctAnswer
  );
  return { shuffledAnswers, newCorrectAnswerIndex };
}

function showQuestion() {
  const questionData = questions[currentQuestionIndex];
  const questionElement = document.getElementById("pertanyaan");
  const answersElement = document.getElementById("jawaban");
  const explanationElement = document.getElementById("penjelasan");
  const nextButton = document.getElementById("next-button");

  questionElement.textContent = questionData.pertanyaan;
  answersElement.innerHTML = "";
  explanationElement.textContent = "";
  nextButton.style.display = "none";

  const { shuffledAnswers, newCorrectAnswerIndex } =
    shuffleAnswers(questionData);

  shuffledAnswers.forEach((item, index) => {
    const button = document.createElement("button");
    button.textContent = item.answer;
    button.onclick = () =>
      checkAnswer(index === newCorrectAnswerIndex, questionData);
    answersElement.appendChild(button);
  });
}

function checkAnswer(isCorrect, questionData) {
  const explanationElement = document.getElementById("penjelasan");
  const nextButton = document.getElementById("next-button");

  if (isCorrect) {
    score += 10;
    explanationElement.textContent =
      "Jawaban Benar! " + questionData.explanation;
  } else {
    const correctAnswerText = questionData.jawaban[questionData.correctAnswer];
    explanationElement.textContent = `Jawaban Salah! Penjelasan: ${questionData.explanation}`;
  }

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <h2>Kuis Selesai!</h2>
    <p>Skor akhir Anda: ${score}</p>
    <button onclick="restartQuiz()">Ulangi Kuis</button>
  `;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <div id="pertanyaan"></div>
    <div id="jawaban"></div>
    <div id="penjelasan" style="margin-top: 20px; font-style: italic; color: gray;"></div>
    <button id="next-button" style="display: none;" onclick="nextQuestion()">Lanjut</button>
  `;
  showQuestion();
}

// Mulai kuis dengan menampilkan soal pertama
document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <div id="pertanyaan"></div>
    <div id="jawaban"></div>
    <div id="penjelasan" style="margin-top: 20px; font-style: italic; color: gray;"></div>
    <button id="next-button" style="display: none;" onclick="nextQuestion()">Lanjut</button>
  `;
  showQuestion();
});
