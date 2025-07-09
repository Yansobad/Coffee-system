// let cargoHold = [
//   'oxygen tanks',
//   'space suits',
//   'parrot',
//   'instruction manual',
//   'meal packs',
//   'slinky',
//   'security blanket'
// ];

// // Thay 'slinky' bằng 'space tether'
// let slinkyIndex = cargoHold.indexOf('slinky');
// if (slinkyIndex !== -1) {
//   cargoHold[slinkyIndex] = 'space tether';
// }
// console.log(cargoHold);

// // Xóa phần tử cuối dùng pop
// let removedLast = cargoHold.pop();
// console.log('Phần tử bị xóa (cuối):', removedLast);
// console.log(cargoHold);

// // Xóa phần tử đầu dùng shift
// let removedFirst = cargoHold.shift();
// console.log('Phần tử bị xóa (đầu):', removedFirst);
// console.log(cargoHold);

// // Thêm 1138 vào đầu và '20 meters' vào cuối
// cargoHold.unshift(1138);
// cargoHold.push('20 meters');
// console.log(cargoHold);

// // In mảng cuối cùng kèm chiều dài
// console.log(`Mảng cuối cùng: ${cargoHold}, chiều dài: ${cargoHold.length}`);


// const firebaseConfig = {
//     apiKey: "AIzaSyBfj8AZgFR_sCXU92dbA94qLosn8Au5Oc0",
//     authDomain: "coffee-management-5c0a0.firebaseapp.com",
//     projectId: "coffee-management-5c0a0",
//     storageBucket: "coffee-management-5c0a0.appspot.com",
//     messagingSenderId: "29355541928",
//     appId: "1:29355541928:web:e29709c05e5cb220d2899d",
//     measurementId: "G-ET3P65MTQ4"
// };
//  const app = initializeApp(firebaseConfig);
//     console.log("Firebase đã được kết nối thành công!", app);


document.addEventListener("DOMContentLoaded", function() {
  // URL of your Firebase Function
  const functionUrl = "https://us-central1-quickquiz-4cb8a.cloudfunctions.net/getFirebaseConfig";

  // Fetch the data from the Firebase Function
  fetch(functionUrl)
    .then(response => response.json()) // Assuming the function returns a JSON response
    .then(data => {
        firebase.initializeApp(data);
      // Initialize Firebase Authentication
        const auth = firebase.auth(); 
        
        const playBtn = document.getElementById('playBtn');
        const category = document.getElementById('categ');
        const type = document.getElementById('typ');

        playBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.setItem('category',category.value);
          localStorage.setItem('type',type.value);
          auth.signInAnonymously().catch(function(error) {
              var errorMessage = error.message;
              console.log(errorMessage);
          }).then(cred=>{
              window.location.assign('/game.html');
          });
      });

    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
});


const BONUS = 10;
const neg = -2;
const MAX_QUESTIONS = 10;

document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = {};
    let acceptingAnswers = false;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];
    let link = "";
    const question = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text'));
    const questionCounterText = document.getElementById('questionCounter');
    const scoreText = document.getElementById('score');
    const spinner = document.getElementsByClassName('spinner')[0];
    const game = document.getElementById('game');

    var category = localStorage.getItem('category');
    const difficulty = localStorage.getItem('type');
    //console.log(typeof category);
    if (category === "any") {
        link = "https://opentdb.com/api.php?amount=20&type=multiple";
    }
    else {
        link = "https://opentdb.com/api.php?amount=20&category=" + category + "&difficulty=" + difficulty + "&type=multiple";
    }

    fetch(link).then((res) => {
        return res.json();
    })
        .then((loadedQuestions) => {
            questions = loadedQuestions.results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: decodeHTMLEntities(loadedQuestion.question),
                };

                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    decodeHTMLEntities(loadedQuestion.correct_answer)
                );

                answerChoices.forEach((choice, index) => {
                    formattedQuestion['choice' + (index + 1)] = decodeHTMLEntities(choice);
                });

                return formattedQuestion;
            });
            if (spinner) {
                spinner.setAttribute("style", "display: none;");
            } else {
                console.error('Spinner object is undefined');
            }
            game.removeAttribute('style');
            startGame();
        })
        .catch((err) => {
            console.error(err);
        });

    function decodeHTMLEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
    };

    getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('recentScore', score);
            return window.location.assign('/end.html');
        }
        //updating question counter text
        questionCounter++;
        questionCounterText.innerHTML = `<h2>${questionCounter}/${MAX_QUESTIONS}</h2>`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach((choice) => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    };

    choices.forEach((choice) => {
        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            if (classToApply === "correct")
                updateScore(BONUS);
            else
                updateScore(neg);
            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    updateScore = (num) => {
        score += num;
        scoreText.innerHTML = `<h2>${score}</h2>`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
  // URL of your Firebase Function
  const functionUrl = "https://us-central1-quickquiz-4cb8a.cloudfunctions.net/getFirebaseConfig";

  // Fetch the data from the Firebase Function
  fetch(functionUrl)
    .then(response => response.json()) // Assuming the function returns a JSON response
    .then(data => {
      firebase.initializeApp(data);
      const db = firebase.firestore();

      const scorelist = document.querySelector('#score-list');
      function renderScore(doc) {
        let li = document.createElement('li');
        let username = document.createElement('span');
        let score = document.createElement('div');
        li.setAttribute('data-id', doc.id);
        username.textContent = doc.data().username;
        score.textContent = doc.data().score;
        li.appendChild(username);
        li.appendChild(score);
        scorelist.appendChild(li);
      };

      db.collection('scores').orderBy('score', "desc").limit(10).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderScore(doc);
        });
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

