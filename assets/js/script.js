//gather variables for the html elements
const titleContainer = document.getElementById("title-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question")
const answerBtnElements = document.getElementById("answer-btn-container");
const quizControlContainer = document.getElementById("quiz-controlBtn-container");
const timerContainer = document.getElementById("timer-container");
const time = document.getElementById("timer");
const completeContainer = document.getElementById("quiz-complete-container");
const highScoresContainer = document.getElementById("highScores-container");
const highScoreHamburger = document.getElementsByClassName("highScore__menu__icon");
const highScoreText = document.getElementsByClassName("highScore__text");
const goBackText = document.getElementsByClassName("goBack__text");
const menuBar = document.getElementsByClassName("highScore__bar");
const printScoreLocation = document.getElementById("quiz-score");
const printTimeLocation = document.getElementById("quiz-time");
const highScoresList = document.getElementById("highScores-list");
const userInitials = document.getElementById("initials");
const startBtn = document.getElementById("quiz-start-btn");
const nextBtn = document.getElementById("quiz-next-btn");
const restartBtn = document.getElementById("quiz-restart-btn");

//variables
let shuffledQuestions, currentQuestionIndex, intervalId;
//declares a variable timeLeft and sets its value to the total seconds (minutes * 60 + seconds)
var timeLeft = 15;

//event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
});

//start quiz
function startQuiz() { 
        //executes the resetAnswerBtns function (to clear any btns before loading the next question)
    resetAnswerBtns();

    renderTimeLeft(timeLeft);
        //executes the startTimer function with the parameters time (element), 2 (minutes), 15 (seconds).
    timerInterval();
        //adds the class of hide to the title container
    titleContainer.classList.add("hide");
        //removes the class of hide from the question container
    quizContainer.classList.remove('hide');
        //adds the class of hide to the startBtn
    startBtn.classList.add("hide");
        //neat way to shuffle. since math random returns a value of 0-1 and sort will sort differently based on + and - integers, when we subtract .5 from Math.random approx half of the returned values will be - and half +, sort will shuffle accordingly.
    shuffledQuestions = questions.sort(() => Math.random() - .5);
        //sets the currentQuestionIndex to 0 (it will later increment from nextQuestion())
    currentQuestionIndex = 0;
        //executes the nextQuestion function to load the next question automatically
    nextQuestion();
}

function resetAnswerBtns() {
    while (answerBtnElements.firstChild) {
        answerBtnElements.removeChild(answerBtnElements.firstChild);
    }
}

function renderTimeLeft(timeRemaining) {
    var minutes = Math.floor(timeRemaining / 60);
    if (minutes < 10) 
        minutes = "0" + minutes;
    var seconds = timeRemaining % 60;
    if (seconds < 10)
        seconds = "0" + seconds;
    var text = `${minutes}:${seconds}`;
    time.innerHTML = text;
}

let timerInterval = () => {
    timerContainer.classList.remove("hide");
    intervalId = setInterval(() => {
        if (timeLeft == 0) {
            return stopTimer();
        }
        timeLeft--;
        renderTimeLeft(timeLeft);
    }, 1000);
}

function stopTimer(timeRemaining) {
    time.innerHTML = "time is up"
    clearInterval(intervalId);
    setTimeout(function() {
        quizContainer.classList.add("hide");
        completeContainer.classList.remove("hide");
    }, 1500);
    setTimeout(function() {
        timerContainer.classList.add("hide");          
    }, 5000);
}

function endQuiz() {
    
    let finishedBtn = document.createElement("button");
    finishedBtn.classList.add("next__btn");
    finishedBtn.innerHTML = "Finish";
    finishedBtn.addEventListener("click", () => {
        quizContainer.classList.add("hide");
        completeContainer.classList.remove("hide");
    })
    nextBtn.classList.add("hide");
    quizControlContainer.appendChild(finishedBtn);
}

function nextQuestion() {
    console.log(shuffledQuestions.length);
    console.log(currentQuestionIndex);
    if (shuffledQuestions.length === currentQuestionIndex + 1) {
        nextBtn.classList.add("hide");
        displayQuestion(shuffledQuestions[currentQuestionIndex]);
        endQuiz();
    } else {
        //executes the displayQuestion function for the shuffledQuestions at the index position of the currentQuestionIndex
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

function displayQuestion(question) {
    //sets the inner text for the question to the value of question in the questions object at the currentQuestionIndex
    questionElement.innerText = question.question;
    resetAnswerBtns();
    nextBtn.classList.remove("hide");
    var shuffledAnswers = question.answers.sort(() => Math.random() - .5)
    //recreates the answerBtns for each answer in the questions object at the currentQuestionIndex
    shuffledAnswers.forEach(answer => {
            //creates the btn elements
        const btn = document.createElement("button");
            //adds the answer.text, from the questions object, to the btns
        btn.innerText = answer.text;
            //styles the answerBtns by adding the class="answer-btn"
        btn.classList.add("answer-btn");
            //adds an eventListener on the new buttons that will execute the selectedAnswer function.
        btn.addEventListener("click", (e) => selectedAnswer(e));
            //appends the btns to the answer btn container.
        answerBtnElements.appendChild(btn);
    });
}
    
function selectedAnswer(e) {
    let selectedAnswerBtn = e.target;
    shuffledQuestions[currentQuestionIndex].answers.forEach(answer => {
        // console.log(selectedAnswerBtn.innerText, answer.text);
        if (selectedAnswerBtn.innerText === answer.text) {
            if (answer.correct) {
                selectedAnswerBtn.classList.add("correct");
            } else {
                selectedAnswerBtn.classList.add("wrong");
            }
        }
    })
}

let questions = [
    {
        question: "Which is not an array method?",
        answers: [
            {text: "forEach()", correct: false},
            {text: "concat()", correct: false},
            {text: "lastIndexOf()", correct: false},
            {text: "length()", correct: true}
        ]
    },
    {
        question: "The Math method random() returns what?",
        answers: [
            {text: "a number between 0 and 1", correct: true},
            {text: "a number rounded down", correct: false},
            {text: "a number between 1 - 10", correct: false},
            {text: "a boolean", correct: false},
        ]
    },
    {
        question: "What does isNaN() do?",
        answers: [
            {text: "parses a string and returns an integer", correct: false},
            {text: "converts an object's value to a number", correct: false},
            {text: "determines whether a value is an illegal number", correct: true},
            {text: "returns the primitive value of a boolean", correct: false},
        ]
    },
]
//end quiz

//add player object info to highScore list
