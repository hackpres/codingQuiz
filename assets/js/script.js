// be able to start the quiz using start btn
const startBtn = document.getElementById("quiz-start-btn");
const nextBtn = document.getElementById("quiz-next-btn");
const restartBtn = document.getElementById("quiz-restart-btn");
const titleContainer = document.getElementById("title-container");
const questionContainer = document.getElementById("quiz-container");
const completeContainer = document.getElementById("quiz-complete-container");
const questionElement = document.getElementById("question");
const answerBtnElements = document.getElementById("answer-btn-container");

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
    console.log("Quiz Started");
    resetState();
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

function resetState() {
    while (answerBtnElements.firstChild) {
        answerBtnElements.removeChild(answerBtnElements.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
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

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
// when all questions are answered, or the timer reaches 0 the quiz ends and the quiz complete screen loads

const questions = [
    {question: "Which is not an array method?",
        answers: [
            {text: "forEach()", correct: false},
            {text: "concat()", correct: false},
            {text: "lastIndexOf()", correct: false},
            {text: "length()", correct: true}
        ]},
    {question: "",
        answers: [
            {text: "", correct: false},
            {text: "", correct: false},
            {text: "", correct: false},
            {text: "", correct: false},
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
    // {question: "",
    //     answers: [
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //         {text: "", correct: false},
    //     ]},
]