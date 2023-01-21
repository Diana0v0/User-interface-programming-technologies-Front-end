// references and variables
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// array that contains questions and answer options
const quizArray = [
  {
    id: "0",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lasagna", "Nothing"],
    correct: "Hyper Text Markup Language",
  },
  {
    id: "1",
    question: "How many tags are in a regular element?",
    options: ["1", "2", "3", "4"],
    correct: "2",
  },
  {
    id: "2",
    question: "What is an element that does not have a closing tag called?",
    options: ["Tag", "Empty element", "Closed element", "Open element"],
    correct: "Empty element",
  },
  {
    id: "3",
    question: "Where do all items for the same website need to be saved?",
    options: ["In the same folder", "Wherever is fine", "In different folders", "In the browser"],
    correct: "In the same folder",
  },
  {
    id: "4",
    question: "What is the smallest header in HTML by default?",
    options: ["h1", "h2", "h6", "h4"],
    correct: "h6",
  },
  {
    id: "5",
    question: "HTML files are saved by default with the extension?",
    options: [".html", ".h", ".ht", ".site"],
    correct: ".html",
  },
  {
    id: "6",
    question: "Colors are defined in HTML using?",
    options: ["RGB values", "HEX values", "RGBA values", "All are correct"],
    correct: "All are correct",
  },
];

// restart quiz event listener
restart.addEventListener("click", () => {
	initial();
	displayContainer.classList.remove("hide");
	scoreContainer.classList.add("hide");
});

// next question button listener
nextBtn.addEventListener("click",
	(displayNext = () => {
		// increment questionCount
		questionCount += 1;
		// if the last question been answered
		if (questionCount == quizArray.length) {
			// hide question container and display score
			displayContainer.classList.add("hide");
			scoreContainer.classList.remove("hide");
			// show user score
			userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
		} else {
			// display questionCount
			countOfQuestion.innerHTML = "Question " + questionCount  + " of " + quizArray.length;
			// display quiz
			quizDisplay(questionCount);
			count = 11;
			clearInterval(countdown);
			// display timer
			timerDisplay();
		}
	})
);

// timer value calculation function
const timerDisplay = () => {
	countdown = setInterval(() => {
		count--;
		timeLeft.innerHTML = `${count}s`;
		if (count == 0) {
			clearInterval(countdown);
			displayNext();
		}
	}, 1000);
};

// display quiz
const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container-mid");
	// Hide other cards
	quizCards.forEach((card) => {
		card.classList.add("hide");
	});
	// display current question card
	quizCards[questionCount].classList.remove("hide");
};

// function that creates the quiz
function quizCreator() {
	// randomly sort questions
	quizArray.sort(() => Math.random() - 0.5);
	// generate quiz
	for (let i of quizArray) {
		// randomly sort options
		i.options.sort(() => Math.random() - 0.5);
		// create quiz card 
		let div = document.createElement("div");
		div.classList.add("container-mid", "hide");
		// display question number (for the first question
		countOfQuestion.innerHTML = "Question " + 1 + " of " + quizArray.length;
		// display question
		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);
		// display options (on buttons)
		div.innerHTML += `
		<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[3]}</button>
		`;
		quizContainer.appendChild(div);
	}
}

// function that checks whether the option is correct
function checker(userOption) {
	// get user answer
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container-mid")[questionCount];
	let options = question.querySelectorAll(".option-div");
	// if answer chosen by user is the correct option stored in object
	if (userSolution === quizArray[questionCount].correct) {
		userOption.classList.add("correct");
		// raise the score
		scoreCount++;
	} else {
		userOption.classList.add("incorrect");
		// For marking the correct option
		options.forEach((element) => {
			if (element.innerText == quizArray[questionCount].correct) {
				element.classList.add("correct");
			}
		});
	}
	// stop timer
	clearInterval(countdown);
	// disable all options
	options.forEach((element) => {
		element.disabled = true;
	});
}

// initial setup function
function initial() {
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	count = 11;
	clearInterval(countdown);
	timerDisplay();
	quizCreator();
	quizDisplay(questionCount);
}

// event listener for when user clicks on start button
startButton.addEventListener("click", () => {
	startScreen.classList.add("hide");
	displayContainer.classList.remove("hide");
	initial();
});

// hide quiz and display start screen
window.onload = () => {
	startScreen.classList.remove("hide");
	displayContainer.classList.add("hide");
};