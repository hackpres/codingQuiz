// be able to start the quiz using start btn
const startBtn = document.getElementById("quiz-start-btn");
const nextBtn = document.getElementById("quiz-next-btn");
const restartBtn = document.getElementById("quiz-restart-btn");
const titleContainer = document.getElementById("title-container");
const questionContainer = document.getElementById("quiz-container");
const completeContainer = document.getElementById("quiz-complete-container");
const timerContainer = document.getElementById("timer-container")
const questionElement = document.getElementById("question");
const answerBtnElements = document.getElementById("answer-btn-container");

var time = document.getElementById("timer");
let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
})
// when quiz starts; a timer begins, main screen clears, and quiz screen loads
// quiz screen components need to be pulled from quiz object
function startQuiz() {
    resetState();
    startBtn.classList.add("hide");
    titleContainer.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    nextQuestion();
    timer(time, 2, 15);
}


function timer(element, minutes, seconds) {
    var timeLeft = minutes * 60 + seconds;
    timerContainer.classList.remove("hide");
    var interval = setInterval(function() {
        
        if (timeLeft == 0) {
            setTimeout(function()  {
                element.innerHTML = "time is up"
            }, 10);

            clearInterval(interval);

            setTimeout(function() {
            questionContainer.classList.add("hide");
            completeContainer.classList.remove("hide");
            }, 1500);

            setTimeout(function() {
                timerContainer.classList.add("hide");
            }, 7000);
        }
        var minutes = Math.floor(timeLeft / 60);
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = timeLeft % 60;
        if (seconds < 10) seconds = "0" + seconds;
        var text = `${minutes}:${seconds}`;
        element.innerHTML = text;
        timeLeft--;
    }, 1000);
    return timeLeft
}

// when the correct answer is chosen a green animation happens on the button and then the next question loads
// when the incorrect answer is chosen a red animation happens on the button, the next question loads, and 10 seconds are removed from the timer.
function nextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question
    resetState();
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

function resetState() {
    while (answerBtnElements.firstChild) {
        answerBtnElements.removeChild(answerBtnElements.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const correct = selectedBtn.dataset.correct;
    Array.from(answerBtnElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextBtn.classList.remove("hide");
    } else {
        setTimeout(function() {
            questionContainer.classList.add("hide");
            completeContainer.classList.remove("hide"); 
        }, 1500);
    }
}

// function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//         element.classList.add("correct");
//     } else {
//         element.classList.add("wrong");
//     }
// }

// function clearStatusClass(element) {
//     element.classList.remove("correct");
//     element.classList.remove("wrong");
// }
// when all questions are answered, or the timer reaches 0 the quiz ends and the quiz complete screen loads

const questions = [
    {question: "Which is not an array method?",
        answers: [
            {text: "forEach()", correct: false},
            {text: "concat()", correct: false},
            {text: "lastIndexOf()", correct: false},
            {text: "length()", correct: true}
        ]},
    {question: "The Math method random() returns what?",
        answers: [
            {text: "a number between 0 and 1", correct: true},
            {text: "a number rounded down", correct: false},
            {text: "a number between 1 - 10", correct: false},
            {text: "a boolean", correct: false},
        ]},
    {question: "What does isNaN() do?",
        answers: [
            {text: "parses a string and returns an integer", correct: false},
            {text: "converts an object's value to a number", correct: false},
            {text: "determines whether a value is an illegal number", correct: true},
            {text: "returns the primitive value of a boolean", correct: false},
        ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
    ]