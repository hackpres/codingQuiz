// "Music: www.bensound.com" or "Royalty Free Music from Bensound"

//()  //()decrement timeLeft on missed question.
//()only allow one answer to be selected for each question.
//()implement points scoring system.
    //()10pts for correct answer.
    //()-5pts for incorrect answer.
    //()15pts for every 10secs left at end of quiz.
    //()1pt for every second under 10 at end of quiz.
    //()-20pts for running out of time.
//()display final score at end of quiz.
//()add functionality to save initials/score to highscore screen.
//add functionality to highscore "menu" on hover 
    //()click for mobile.
//()add remove hide from highscore screen on highscore click.
//()add functionality to restart-btn
//()clear input field on change
//()limit user initials to 3chars

    //* Bonus features to add!
        //* add an animation while calculating final score.
        //()* add difficulty options
            //()easy (more time per question, 10 questions)
            //()hard (less time per question, 20 questions)
        //* add background music
        //()* add audio for correct and wrong selections

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
const highScoreText = document.getElementById("highScore-text");
const menuBar = document.getElementById("menu-bar");
const difficultyToggle = document.getElementById("difficulty");
const audioToggle = document.getElementById("audio");
const printScoreLocation = document.getElementById("quiz-score");
const highScoresList = document.getElementById("highScores-list");
const userInitials = document.getElementById("initials");
const startBtn = document.getElementById("quiz-start-btn");
const restartBtn = document.getElementById("quiz-restart-btn");

const audioCorrect = new Audio();
const audioWrong = new Audio();


audioCorrect.src = "./assets/audio/correctSF.wav";
// audioCorrect.volume = .1;
audioWrong.src = "./assets/audio/wrongSF.wav";
// audioWrong.volume = .1;


//variables
let shuffledQuestions, currentQuestionIndex, intervalId;
//declares a variable timeLeft and sets its value to the total seconds (minutes * 60 + seconds)
var timeLeft = 90;
var score = 0;

//event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
userInitials.addEventListener("change", () => {
    let inputForInitials = userInitials.value;
    let userObject = {userName: inputForInitials, userScore: score};
    highScoreSave(userObject);
    userInitials.value = ""
    userInitials.classList.add("hide");
    document.getElementById("initials-label").classList.add('hide');
    menuBar.classList.remove("hide");
    highScoreText.classList.remove("hide");
    highScoreText.addEventListener("click", () => {
        hideAll()
        highScoresContainer.classList.remove("hide");
        menuBar.classList.remove("hide");
        goBackText.classList.remove("hide");
        getUserStorage();
        clearInterval(intervalId);
        timeLeftDifficultyCheck();
        score = 0;
    });
});
difficultyToggle.addEventListener("change", () => {
    if (difficultyToggle.checked) {
        easyMode();
        difficultyToggle.checked = false
    } else {
        hardMode();
        difficultyToggle.checked = true
    }
})
audioToggle.addEventListener("change", () => {
    if (audioToggle.checked) {
        audioOn();
        audioToggle.checked = false
    } else {
        audioff();
        audioToggle.checked = true
    }
})
highScoreText.addEventListener("click", () => {
    hideAll();
    highScoresContainer.classList.remove("hide");
    menuBar.classList.remove("hide");
    highScoreText.innerText = "return to quiz";
    highScoreText.classList.remove("hide");
    if (difficultyToggle.checked) {
        document.getElementById("settings-difficultyHard-icon").classList.remove("hide");
    } else {
        document.getElementById("settings-difficultyEasy-icon").classList.remove("hide"); 
    }
    if (audioToggle.checked) {
        document.getElementById("settings-audioOff-icon").classList.remove("hide");
    } else {
        document.getElementById("settings-audioOn-icon").classList.remove("hide");
    }
    highScoreText.addEventListener("click", () => {
        highScoreText.innerText = "High Scores";
        highScoresContainer.classList.add("hide");
        restartQuiz();
    })
    getUserStorage();
    clearInterval(intervalId);
    timeLeftDifficultyCheck();
    score = 0;
});

function audioOn() {
    audioCorrect.src = "./assets/audio/correctSF.wav";
    audioWrong.src = "./assets/audio/wrongSF.wav";
    document.getElementById("settings-audioOn-icon").classList.remove("hide");
    document.getElementById("settings-audioOff-icon").classList.add("hide");
}

function audioff() {
    audioCorrect.src = "";
    audioWrong.src = "";
    document.getElementById("settings-audioOn-icon").classList.add("hide");
    document.getElementById("settings-audioOff-icon").classList.remove("hide");
}

function easyMode() {
    questions = questions.slice(0, 10);
    console.log(questions);
    document.getElementById("settings-difficultyEasy-icon").classList.remove("hide");
    document.getElementById("settings-difficultyHard-icon").classList.add("hide");
    clearInterval(intervalId);
    quizContainer.classList.add("hide");
    restartQuiz();
}

function hardMode() {
    questions = questions.concat(questionsHard);
    console.log(questions);
    document.getElementById("settings-difficultyEasy-icon").classList.add("hide");
    document.getElementById("settings-difficultyHard-icon").classList.remove("hide");
    clearInterval(intervalId);
    quizContainer.classList.add("hide");
    restartQuiz();
}

function timeLeftDifficultyCheck() {
    if (difficultyToggle.checked) {
        timeLeft = 130;
    } else {
        timeLeft = 90;
    }
}

function generateUserId() {
        //Date.now() returns date and time in miliseconds
        //.toString(36) returns the source code function to the 36th position as a string
            //adds above and below
        //Math.random() returns a random number between 0-1 but never 1
        //.toString(36) returns math.random() the the 36th number as a string
        //.substring(2)  returns the string of 36 math.random numbers starting from index position 2 to the end of the string
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// let menuState = false;
// menuState = !menuState

function hideAll() {
    titleContainer.classList.add("hide");
    quizContainer.classList.add("hide");
    answerBtnElements.classList.add("hide");
    quizControlContainer.classList.add("hide");
    timerContainer.classList.add("hide");
    completeContainer.classList.add("hide");
    highScoresContainer.classList.add("hide");
    highScoreText.classList.add("hide");
    menuBar.classList.add("hide");
    startBtn.classList.add("hide");
    restartBtn.classList.add("hide");
    document.getElementById("settings-difficultyHard-icon").classList.add("hide");
    document.getElementById("settings-difficultyEasy-icon").classList.add("hide");
    document.getElementById("settings-audioOn-icon").classList.add("hide");
    document.getElementById("settings-audioOff-icon").classList.add("hide");
    while (highScoresList.firstChild) {
        highScoresList.removeChild(highScoresList.firstChild);
    }
}

function restartQuiz() {
    timeLeftDifficultyCheck();
    score = 0
    // hideAll();
    titleContainer.classList.remove("hide");
    startBtn.classList.remove("hide");
    menuBar.classList.remove("hide");
    highScoreText.classList.remove("hide");
    highScoreText.addEventListener("click", () => {
        // hideAll();
        highScoresContainer.classList.remove("hide");
        menuBar.classList.remove("hide");
        highScoreText.innerText = "return to quiz";
        highScoreText.classList.remove("hide");
        if (difficultyToggle.checked) {
            document.getElementById("settings-difficultyHard-icon").classList.remove("hide");
        } else {
            document.getElementById("settings-difficultyEasy-icon").classList.remove("hide"); 
        }
        if (audioToggle.checked) {
            document.getElementById("settings-audioOff-icon").classList.remove("hide");
        } else {
            document.getElementById("settings-audioOn-icon").classList.remove("hide");
        }
        highScoreText.addEventListener("click", () => {
            highScoreText.innerText = "High Scores";
            highScoresContainer.classList.add("hide");
            restartQuiz();
        })
        getUserStorage();
        clearInterval(intervalId);
        timeLeftDifficultyCheck();
        score = 0;
    });
}

function startQuiz() { 
        //executes the resetAnswerBtns function (to clear any btns before loading the next question)
    resetAnswerBtns();

    renderTimeLeft(timeLeft);
        //executes the startTimer function with the parameters time (element), 2 (minutes), 15 (seconds).
    timerInterval();
        //adds the class of hide to the title container
    menuBar.classList.add("hide");
    highScoreText.classList.add("hide");
    titleContainer.classList.add("hide");
        //removes the class of hide from the question container
    quizContainer.classList.remove('hide');
    answerBtnElements.classList.remove("hide");
        //adds the class of hide to the startBtn
    startBtn.classList.add("hide");
        //neat way to shuffle. since math random returns a value of 0-1 and sort will sort differently based on + and - integers, when we subtract .5 from Math.random approx half of the returned values will be - and half +, sort will shuffle accordingly.
    shuffledQuestions = questions.sort(() => Math.random() - .5);
        //sets the currentQuestionIndex to 0 (it will later increment from nextQuestion())
    currentQuestionIndex = 0;
        //executes the nextQuestion function to load the next question automatically
    nextQuestion();
    userInitials.classList.remove("hide");
    document.getElementById("initials-label").classList.remove('hide');
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
    setTimeout(function() {
        hideAll()
        quizContainer.classList.add("hide");
        completeContainer.classList.remove("hide");
        quizEndScoreUpdate(timeLeft);
        time.innerHTML = renderTimeLeft(timeLeft);
        clearInterval(intervalId);
        restartBtn.classList.remove("hide");
    }, 650);
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
}

function highScoreSave(userObject) {
    localStorage.setItem(`user${generateUserId()}`, JSON.stringify(userObject));
    getUserStorage()
}


function getUserStorage() {
    let storage = Object.keys(localStorage).map(user => {
        let retrievedUser = localStorage.getItem(user);
        return JSON.parse(retrievedUser)
    });
    
    storage.sort((a, b) => b.userScore - a.userScore).slice(0, 5).forEach((userObject) => {
        var userContainer = document.createElement('div');
        userContainer.classList.add("user__container");
        var usersName = document.createElement('h5');
        usersName.innerText = userObject.userName;
        var usersScore = document.createElement('p');
        usersScore.innerText = userObject.userScore;
        if (!highScoresList.firstChild) {
            usersName.classList.add("highest__score");
            usersScore.classList.add("highest__score");
        }

        userContainer.appendChild(usersName);
        userContainer.appendChild(usersScore);

        highScoresList.appendChild(userContainer);
    });
}

function nextQuestion() {
   //executes the displayQuestion function for the shuffledQuestions at the index position of the currentQuestionIndex
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
}

function displayQuestion(question) {
    //sets the inner text for the question to the value of question in the questions object at the currentQuestionIndex
    questionElement.innerText = question.question;
    resetAnswerBtns();
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
        if (selectedAnswerBtn.innerText === answer.text) {
            if (answer.correct) {
                selectedAnswerBtn.classList.add("correct");
                score += 5;
                audioCorrect.play();
            } else {
                timeLeft = timeLeft - 10
                if (timeLeft < 0) {
                    timeLeft = 0;
                }
                selectedAnswerBtn.classList.add("wrong");
                score -= 5;
                audioWrong.play();
            }
        }
    });
    currentQuestionIndex++;
    if (shuffledQuestions.length < currentQuestionIndex + 1) {
        setTimeout(function() {
        endQuiz();
        })
    } else {
        setTimeout(function() {
        nextQuestion();
    }, 650);}
    
}

let questions = [
    {
        question: "Which is not an array method?",
        answers: [
            {text: "length()", correct: true},
            {text: "forEach()", correct: false},
            {text: "concat()", correct: false},
            {text: "lastIndexOf()", correct: false},
        ]
    },
    {
        question: "The Math method random() returns what?",
        answers: [
            {text: "a number between 0 and 1", correct: true},
            {text: "a number rounded down", correct: false},
            {text: "a number between 1 - 10", correct: false},
            {text: "a boolean", correct: false}
        ]
    },
    {
        question: "What does isNaN() do?",
        answers: [
            {text: "determines whether a value is an illegal number", correct: true},
            {text: "parses a string and returns an integer", correct: false},
            {text: "converts an object's value to a number", correct: false},
            {text: "returns the primitive value of a boolean", correct: false}
        ]
    },
    {
        question: "Math.floor...",
        answers: [
            {text: "rounds down to the nearest integer", correct: true},
            {text: "returns a random number between 0 and 1", correct: false},
            {text: "resets the current value to 0", correct: false},
            {text: "returns the absolute value of a number", correct: false}
        ]
    },
    {
        question: "To convert a number to a string use?",
        answers: [
            {text: "num.toString()", correct: true},
            {text: ".toString(num)", correct: false},
            {text: ".toDateString()", correct: false},
            {text: ".toString()", correct: false}
        ]
    },
    {
        question: "The symbol for a Modulus is?",
        answers: [
            {text: "%", correct: true},
            {text: "*=", correct: false},
            {text: "!==", correct: false},
            {text: "||", correct: false}
        ]
    },
    {
        question: "What returns the type of a variable, object, function, or expression?",
        answers: [
            {text: "typeof", correct: true},
            {text: "delete", correct: false},
            {text: "instanceof", correct: false},
            {text: "void", correct: false}
        ]
    },
    {
        question: "What does var do?",
        answers: [
            {text: "declares a variable", correct: true},
            {text: "iterates over a code block", correct: false},
            {text: "declares an immutable variable", correct: false},
            {text: "executes a block of code based on user input", correct: false}
        ]
    },
    {
        question: "The correct bracket symbol for an array is?",
        answers: [
            {text: "[ ]", correct: true},
            {text: "{ }", correct: false},
            {text: "( )", correct: false},
            {text: "< >", correct: false}
        ]
    },
    {
        question: "Which button below contains a string?",
        answers: [
            {text: "`'This cant possibly be the right answer.'`", correct: true},
            {text: "467", correct: false},
            {text: "true", correct: false},
            {text: "undefined", correct: false}
        ]
    },
]
let questionsHard = [
    {
        question: "What keyword refers to the object that the function is a property of?",
        answers: [
            {text: "this", correct: true},
            {text: "that", correct: false},
            {text: "function", correct: false},
            {text: "theOther", correct: false},
        ]
    },
    {
        question: "What is DOM?",
        answers: [
            {text: "a programming interface for HTML and XML documents", correct: true},
            {text: "the browser window", correct: false},
            {text: "a character from the Fast and the Furious movie franchise", correct: false},
            {text: "Document Objective Modal", correct: false}
        ]
    },
    {
        question: "A function that will be executed after another function gets executed is called?",
        answers: [
            {text: "a callback", correct: true},
            {text: "memoization", correct: false},
            {text: "a constructor function", correct: false},
            {text: "call()", correct: false}
        ]
    },
    {
        question: "Which is not a type of scope in JS?",
        answers: [
            {text: "code scope", correct: true},
            {text: "global scope", correct: false},
            {text: "local scope", correct: false},
            {text: "block scope", correct: false}
        ]
    },
    {
        question: "which will return true?",
        answers: [
            {text: "isNaN(`'Hello World'`)", correct: true},
            {text: "isNaN(872)", correct: false},
            {text: "isNaN(`'1'`)", correct: false},
            {text: "isNaN(false)", correct: false}
        ]
    },
    {
        question: "What operator compares values and not types?",
        answers: [
            {text: "==", correct: true},
            {text: "*=", correct: false},
            {text: "&&", correct: false},
            {text: "||", correct: false}
        ]
    },
    {
        question: "The difference between __ and __ is that the first compares values and the second compares value and type?",
        answers: [
            {text: "== , ===", correct: true},
            {text: "!== , &", correct: false},
            {text: ">= , ||", correct: false},
            {text: "< , !>=", correct: false}
        ]
    },
    {
        question: "When a variable is declared but not assigned, it has a value of __.",
        answers: [
            {text: "undefined", correct: true},
            {text: "null", correct: false},
            {text: "undeclared", correct: false},
            {text: "true", correct: false}
        ]
    },
    {
        question: "What does an arrow function NOT do?",
        answers: [
            {text: "has the ability to be used as a constructor", correct: true},
            {text: "declares a function without the function keyword", correct: false},
            {text: "returns value by default", correct: false},
            {text: "allows us to write shorter function syntax", correct: false}
        ]
    },
    {
        question: "Which method removes the last element from an array?",
        answers: [
            {text: "pop()", correct: true},
            {text: "concat()", correct: false},
            {text: "push()", correct: false},
            {text: "charAt()", correct: false}
        ]
    },
]