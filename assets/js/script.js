//()  //decrement timeLeft on missed question.
//()only allow one answer to be selected for each question.
//()implement points scoring system.
    //()10pts for correct answer.
    //()-5pts for incorrect answer.
    //()15pts for every 10secs left at end of quiz.
    //()1pt for every second under 10 at end of quiz.
    //()-20pts for running out of time.
    //-20pts for skipped questions
//()display final score at end of quiz.
//add functionality to save initials/score to highscore screen.
//add functionality to highscore "menu" on hover 
    //()click for mobile.
//add remove hide from highscore screen on highscore click.
//add functionality to restart-btn


    //* Bonus features to add!
        //* add an animation while calculating final score.
        //* add difficulty options
            //easy (more time, low number of questions)
            //medium (average time, medium number of questions) 
            //hard (less time, high number of questions)
        //* add background music
        //* add audio for correct and wrong selections.


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
const menuHamburgerBtn = document.getElementById("menu-hamburger");
const highScoreText = document.getElementById("highScore-text");
const goBackText = document.getElementById("goBack-text");
const menuBar = document.getElementById("menu-bar");
const menuList = document.getElementById("menu-bkgrd");
const printScoreLocation = document.getElementById("quiz-score");
const highScoresList = document.getElementById("highScores-list");
const userInitials = document.getElementById("initials");
const startBtn = document.getElementById("quiz-start-btn");
const nextBtn = document.getElementById("quiz-next-btn");
const restartBtn = document.getElementById("quiz-restart-btn");

//variables
let shuffledQuestions, currentQuestionIndex, intervalId;

//declares a variable timeLeft and sets its value to the total seconds (minutes * 60 + seconds)
var timeLeft = 135;
var score = 0;

//event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
});
menuHamburgerBtn.addEventListener("click", () => {
    openMenu();
});

//start quiz
function openMenu() {
    menuBar.classList.remove("hide");
    highScoreText.classList.remove("hide");
    menuList.classList.remove("hide");
    menuBar.addEventListener("click", () => {
        closeMenu()
    });
    highScoreText.addEventListener("click", () => {
        closeMenu()
    });
}

function closeMenu() {
    menuBar.classList.add("hide");
    highScoreText.classList.add("hide");
    menuList.classList.add("hide");
}

function restartQuiz() {
    timeLeft = 135;
    score = 0
    completeContainer.classList.add("hide");
    quizControlContainer.removeChild(finishedBtn);
    startQuiz();
}

function startQuiz() { 
    restartBtn.classList.add("hide");
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
    return text;
}

let timerInterval = () => {
    timerContainer.classList.remove("hide");
    intervalId = setInterval(() => {
        if (timeLeft <= 0) {
            return stopTimer();
        }
        timeLeft--;
        renderTimeLeft(timeLeft);
    }, 1000);
}

function stopTimer() {
    time.innerHTML = "time is up"
    clearInterval(intervalId);
    quizContainer.classList.add("hide");
    completeContainer.classList.remove("hide");
    setTimeout(function() {
        timerContainer.classList.add("hide");          
    }, 3500);
}

function endQuiz() {
    let finishedBtn = document.createElement("button");
    finishedBtn.classList.add("next__btn");
    finishedBtn.innerHTML = "Finish";
    finishedBtn.addEventListener("click", () => {
        quizContainer.classList.add("hide");
        completeContainer.classList.remove("hide");
        quizEndScoreUpdate(timeLeft);
        time.innerHTML = renderTimeLeft(timeLeft);
        clearInterval(intervalId);
    })
    nextBtn.classList.add("hide");
    quizControlContainer.appendChild(finishedBtn);

}

function quizEndScoreUpdate(timeRemaining) {
    if (timeRemaining > 0) {
        var addedPoints10secs = Math.floor(timeRemaining / 10);
        var addedPointsUnder10sec = timeRemaining % 10;
        addedPoints10secs = addedPoints10secs * 15;
        addedPointsUnder10sec = addedPointsUnder10sec * 1;
        score += addedPoints10secs + addedPointsUnder10sec;
    } else {
        score -= 20
    }
    console.log(`current score is... ${score}`);
    printScoreLocation.innerText = score;
    restartBtn.classList.remove("hide");
}

function nextQuestion() {
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

function onlyOnePlease() {
    document.querySelectorAll('button.answer-btn').forEach(elem => {
        elem.disabled = true;
    });
}
    
function selectedAnswer(e) {
    onlyOnePlease();
    let selectedAnswerBtn = e.target;
    shuffledQuestions[currentQuestionIndex].answers.forEach(answer => {
        // console.log(selectedAnswerBtn.innerText, answer.text);
        if (selectedAnswerBtn.innerText === answer.text) {
            if (answer.correct) {
                selectedAnswerBtn.classList.add("correct");
                score += 10
            } else {
                timeLeft = timeLeft - 10
                if (timeLeft < 0) {
                    timeLeft = 0;
                }
                selectedAnswerBtn.classList.add("wrong");
                score -= 5
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
