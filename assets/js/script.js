// be able to start the quiz using start btn
const startBtn = document.getElementById("quiz-start-btn");
const restartBtn = document.getElementById("quiz-restart-btn");
const titleContainer = document.getElementById("title-container");
const questionContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerBtnElements = document.getElementById("answer-btn-container");

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
// when quiz starts; a timer begins, main screen clears, and quiz screen loads
// quiz screen components need to be pulled from quiz object
function startQuiz() {
    console.log("Quiz Started");
    startBtn.classList.add("hide");
    titleContainer.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    nextQuestion();
}
// when the correct answer is chosen a green animation happens on the button and then the next question loads
// when the incorrect answer is chosen a red animation happens on the button, the next question loads, and 10 seconds are removed from the timer.
function nextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
    

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtnElements.appendChild(button);
    })
}

function selectAnswer() {

}
// when all questions are answered, or the timer reaches 0 the quiz ends and the quiz complete screen loads

const questions = [
    {
        question: "Which is not an array method?",
        answers: [
            {text: "forEach()", correct: false},
            {text: "concat()", correct: false},
            {text: "lastIndexOf()", correct: false},
            {text: "length()", correct: true}
        ]
    }
]