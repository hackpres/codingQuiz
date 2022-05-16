// be able to start the quiz using start btn
const startBtn = document.getElementById("quiz-start-btn");
const restartBtn = document.getElementById("quiz-restart-btn");


startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
// when quiz starts; a timer begins, main screen clears, and quiz screen loads
// quiz screen components need to be pulled from quiz object
function startQuiz() {
    console.log("Quiz Started")
}
// when the correct answer is chosen a green animation happens on the button and then the next question loads
// when the incorrect answer is chosen a red animation happens on the button, the next question loads, and 10 seconds are removed from the timer.
function nextQuestion() {

}

function selectAnswer() {

}
// when all questions are answered, or the timer reaches 0 the quiz ends and the quiz complete screen loads
