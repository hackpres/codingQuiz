# JavaScript Quiz

## Description

This project was to build a quiz from scratch with questions about JavaScript.

This was the most fun challenge at this point. I enjoyed bringing my own style and creativity into the challenge. Creating an application that is responsive, not just in design but in user experience and interactivity was certainly difficult at times but ultimately very rewarding!

I attempted to go above and beyond the acceptance criteria by adding additional features, such as difficulty modes and audio response for correct and incorrect answers.

The acceptance criteria was as follows:
```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Git Links

github repo link:
https://github.com/hackpres/codingQuiz

github deployed app link:
https://hackpres.github.io/codingQuiz/

## Screenshots of deployed app
![titleMobile](./assets/images/titleMobile.png?raw=true "Mobile Title Screen")
![titleDesktop](./assets/images/titleDesktop.png?raw=true "Desktop Title Screen")

Quiz Questions
![quizMobile](./assets/images/quizMobile.png?raw=true "Mobile Quiz Questions")
![quizDesktop](./assets/images/quizDesktop.png?raw=true "Desktop Quiz Questions")

Quiz Complete Screens
![completeMobile](./assets/images/completeMobile.png?raw=true "Mobile Complete Screen")
![completeDesktop](./assets/images/completeDesktop.png?raw=true "Desktop Complete Screen")

## Usage and Features

I started this challenge by designing the layout I wanted for the mobile screen.

Once I had the design the way I wanted it was just a matter of building the document and stylesheet to bring to the screen. I built "containers" for the title, quiz, complete, and highscore screens and used JavaScript to dynamically apply a class of hide (display: none;) as needed.

The basic function of my quiz is taking my questions, which is an array of objects where each object contains the question, with its text as a string, and answers, which are an array of answers, with their string of text and a parameter of correct with a boolean value to determine if it is the correct answer.
![questions](./assets/images/questions.png?raw=true "The beginning view of my questions, an array of question objects.")

I used a trick I learned during my research for this challenge to "shuffle" the array of question objects. I used questions.sort(() => Math.random() - .5); which uses sort to "shuffle" the questions based on Math.random() - .5 returning not only random numbers but approx. half of them returning negative which caused sort to place them randomly. This was one of the coolest tricks I learned while working on this challenge.
![shuffle](./assets/images/shuffle.png?raw=true "Code to shuffle me questions array.")

Using the same sort() trick as above I shuffled the answers as well before creating the answer btns with a forEach() loop. I added an eventListener to each button that would allow me to check if the button the user selected was correct or not.
![displayQuestions](./assets/images/displayQuestions.png?raw=true "Code to create and display my question buttons.")

The function to check the user selected answer starts by running a function called onlyOnePlease() this simply disables all the buttons when one is clicked. I then run a forEach loop to check the answers to see if the user selected answer includes the correct = true value. If it does the function will change the button color to a green, award the user 5 points, and play a correct tone (if the user has the audio option turned on). If the user selected answer does not inclued correct = true than the timeLeft variable gets 10 seconds subtracted, the button color turns red, the user loses 5 points, and a tone for incorrect plays (again only if the user has kept the audio on).
![selectedAnswer](./assets/images/selectedAnswer.png?raw=true "Code to check the user selected answers correctness.")

Once the quiz is complete and the user types their initials in the input box a user object is generated for the user and stored in local storage. Then the local storage keys are retrieved  and sorted based on score. My high score screen is designed to show only the top 5 scores, although the rest remain accessible via local storage.
![scoreStorage](./assets/images/scoreStorage.png?raw=true "Code showing how my user object is created, stored, retrieved, and printed")
My professor Stanley Lewis assisted me with the code to assign users keys with a randomly generated Id so that once saved, they are safe from being overwritten.
![generateUserId](./assets/images/generateUserId.png?raw=true "Code to generate a safe unique id for storing user info in local storage")

## Additional Features

I decided to challenge myself a bit extra with this assignment and attempt 2 additional features outside the scope of the acceptance criteria.

One was to create an additional Questions array that would be combined with the original array when the user selects "hard mode". The time is also increased overall for hard mode, but the time per question is lower, I also attempted to mix in some more difficult questions to increase the challenge.
![difficultyModes](./assets/images/difficultyModes.png?raw=true "Code functions for easy and hard modes")

The other feature ended up being much easier than I had anticipated, but in my opinion adds so much to the user experience.
I added audio for when the user selects the correct or incorrect answer. The audio was aquired from 99 sound effects (https://99sounds.gumroad.com/l/sound-effects)
![audio](./assets/images/audio.png?raw=true "Variable declarations for the audio files and the volume")
![audioFunctions](./assets/images/audioFunctions.png?raw=true "Code for the audio functions")