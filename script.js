
// http://brentowen-net.s3-website-us-east-1.amazonaws.com/#/

// PURE JS ARRAY TO HTML LIST AND BOOTSTRAP CLASSES

let mainArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function displayMainArray() {
  const mainDiv = document.getElementById('main')
  mainDiv.innerHTML = `<ul id="list"></ul>`

  mainArray.map(item => {
    const listItem = `<li id="list-item">${item}</li>`
    mainDiv.children[0].innerHTML += listItem
  })
}

function addBootStrapClassesToListItems() {
  const list = document.getElementById('list')
  list.classList.add("list-group")
  list.classList.add("list-group-flush")

  for (let index = 0; index < list.children.length; index++) {
    const element = list.children[index];
    element.classList.add("list-group-item")
  }
}

displayMainArray()

addBootStrapClassesToListItems()


// JS TODO

const formContainer = document.getElementById('todo')

function setupTodoForm() {
  formContainer.innerHTML = 
  `<ul id="todo-list">
  </ul>
  <form>
  <input type="text" id="todo-text">
  <button onClick="createTodo(event)">Add</button>
  </form>`
}

function addBootStrapToTodos() {
  const todoList = formContainer.children[0]
  todoList.classList.add('list-group')
  todoList.classList.add('list-group-flush')

  for (let index = 0; index < todoList.length; index++) {
    const element = todoList[index];
    element.classList.add('list-group-item')
  }
}

function createTodo(e) {
  e.preventDefault()
  const todoList = formContainer.children[0]
  const todoText = document.getElementById('todo-text')
  
  todoList.innerHTML += 
  `<li class="todo-item"><input type="checkbox" style="margin-right: .4em" onClick="completeTodo(this, event)">
  ${todoText.value}</li>`
  todoText.value = ''
}

function completeTodo(t, e) {
  const doneList = document.getElementById('done')
  const todoText = e.currentTarget.parentNode
  if (t.checked) {
    todoText.remove()
  }
}

setupTodoForm()

addBootStrapToTodos()


// JS Clock

function displayTime() {
  let clock = document.getElementById('clock-container')

  let timeNow = new Date()

  let hours = timeNow.getHours()
  let mins = timeNow.getMinutes()
  let seconds = timeNow.getSeconds()
  let amPm = 'AM'

  if (hours >= 6 && hours <= 19) {
    clock.classList.remove('night')
    clock.classList.add('day')
  } else {
    clock.classList.remove('day')
    clock.classList.add('night')
  }

  if (hours >= 12) {
    amPm = 'PM'
  }

  if (hours > 12) {
    hours = hours - 12
  }

  if (mins < 10) {
    mins = `0${mins}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  let clockFace = hours + ':' + mins + ':' + seconds + amPm

  clock.innerText = clockFace
}

setInterval( displayTime, 1000 )


// JS Tip Calc

const tipFormContainer = document.getElementById('tip-container')
const tipPerc = [5, 10, 15, 20, 25]

function createTipForm() {
  tipFormContainer.innerHTML = 
  `<label>How much was the bill?</label>
  <input type="number" id="bill"><br><br>
  <label>Tip Amount?</label>
  <select id="tip-amount"></select><br><br>
  <p id="tip-total"></p>
  <button onClick="calcTipAmount()">Calc Tip</button>
  `
  const tipAmount = document.getElementById('tip-amount')
  for (let index = 0; index < tipPerc.length; index++) {
    const element = tipPerc[index];
    tipAmount.innerHTML += `<option value=${element}>${element}</option>`
  }
}

function calcTipAmount() {
  const tip = document.getElementById('tip-amount').value
  const bill = document.getElementById('bill').value
  const tipTotal = document.getElementById('tip-total')

  tipTotal.innerHTML = '$' + Math.round((tip / 100 * bill) * 100) / 100
console.log(bill)
}

createTipForm()


// JS ANIMATED NAVIGATION

const navContainer = document.getElementById('nav-container')
let navlinks = ["Home", "Dashboard", "Settings"]

function createNavBar() {
  navContainer.innerHTML =
  `<div class="navbar-container">
  <div class="logo">
  <h1>AnimatedNav</h1>
  </div>
  <div class="nav-link-container">
  <i class="fas fa-bars" onClick="showNavLinksList()"></i>
  </div>
  </div>
  <div class="nav-links-container hidden transform">
  <ul class="nav-links"></ul>
  </div>`
}

function addNavLinks() {
  const navList = document.querySelector('.nav-links')
  navlinks.map(item => {
    navList.innerHTML += `<li>${item}</li>`
  })
}

function showNavLinksList() {
  const navList = document.querySelector('.nav-links-container')

  if (navList.classList.contains('hidden')) {
    navList.classList.remove('hidden')
    navList.classList.add('show')
  } else {
    navList.classList.remove('show')
    navList.classList.add('hidden')
  }
}

createNavBar()

addNavLinks()


// JS QUIZ

const questions = [
  {
    question: "What does JS stand for?", 
    answer: "JavaScript", 
    possibleAnswers: ["Java", "JavaScript", "Juicy Stuff"]
  },
  {
    question: "Where do script tags go in HTML?", 
    answer: "End Of Body", 
    possibleAnswers: ["Head", "Body", "End Of Body"]
  },
  {
    question: "Where should you link stylesheets?",
    answer: "Head",
    possibleAnswers: ["Head", "Body", "Script Tag"]
  }

]

const quiz = document.getElementById('quiz-container')
let correctAnswer = ''
let choice = ''
let correct = 0
let incorrect = 0
let position = 0

function startQuiz() {
  if (questions[position] == undefined) {
    let totalQuestions = correct + incorrect
    quiz.innerHTML = `
    <h3>End of quiz</h3>
    <p>
    You had ${correct} correct answers out of ${totalQuestions} questions
    </p>
    <p>
    You scored ${Math.round((correct / totalQuestions) * 100)}%
    `
    return
  }

  correctAnswer = questions[position].answer

  quiz.innerHTML = `
    <h3>${questions[position].question}</h3>
    <div id="answers"></div>
  `
  questions[position].possibleAnswers.map(a => {
    quiz.innerHTML += `<p class="answer" onClick="select(this)">${a}</p>`
  })

  quiz.innerHTML += `
  <button class="next" onClick="checkAnswerNextQuestion(event)">Submit</button>
  `
}

function select(t) {
  choice = t.innerText
  let choiceElements = document.querySelectorAll(".answer")
  
  for (let index = 0; index < choiceElements.length; index++) {
    const element = choiceElements[index];

    if (element.classList.contains("selected")) {
      element.classList.remove("selected")
    }

    if (element.innerText === choice) {
      element.classList.add("selected")
    }
  }
}

function checkAnswerNextQuestion(e) {
  e.preventDefault()

  if (choice === correctAnswer) {
    window.alert("Correct!!")
    ++correct
    ++position
    startQuiz()
  } else {
    window.alert("Wrong!!")
    ++incorrect
    ++position
    startQuiz()
  }
}

startQuiz()


// JS WEATHER APP WITH API
let loading = false
let latt = 35.045631
let lon = -85.309677

const wContainer = document.getElementById('weather-container')
let sevenDayWeather = ''
let weatherTable = ''

async function getWeatherJson() {
  let WEATHER_API = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${latt}&product=civillight&output=json`
  loading = true

  fetch(WEATHER_API)
  .then(res => res.json())
  .then(data => 
    {
      sevenDayWeather = data.dataseries
      wContainer.innerHTML = `
      <label for="lon">Longitude</label>
      <input type="text" id="lon">
      <label for="latt">Lattitude</label>
      <input type="text" id="latt">
      <button onClick="updateLocation(event)">Submit</button>
      <br>
      <p>Current Location: <strong>${latt}, ${lon}</strong></p>
      <div id="weather-table">
      <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
      </div>
      </div>
      `

      weatherTable = document.getElementById('weather-table')
    })
    .then(() => {
      sevenDayWeather.forEach(element => {
        const maxTemp = element.temp2m.max
        const minTemp = element.temp2m.min
        const m = JSON.stringify(element.date).slice(4, 6)
        const d = JSON.stringify(element.date).slice(6)

        let precImg = ''

        function getImg() {
          switch (element.weather) {
            case 'clear':
              precImg = "./assets/about_civil_clear.png"
              break;

            case 'cloudy':
              precImg = "./assets/about_civil_cloudy.png"
              break;

            case 'pcloudy':
              precImg = "./assets/about_civil_pcloudy.png"
              break;

            case 'lightrain':
              precImg = "./assets/about_civil_lightrain.png"
              break;

            case 'ishower':
              precImg = "./assets/about_civil_ishower.png"
              break;

            case 'fog':
              precImg = "./assets/about_civil_fog.png"
              break;

            case 'lightsnow':
              precImg = "./assets/about_civil_lightsnow.png"
              break;

            case 'mcloudy':
              precImg = "./assets/about_civil_mcloudy.png"
              break;

            case 'oshower':
              precImg = "./assets/about_civil_oshower.png"
              break;

            case 'rain':
              precImg = "./assets/about_civil_rain.png"
              break;

            case 'rainsnow':
              precImg = "./assets/about_civil_rainsnow.png"
              break;

            case 'snow':
              precImg = "./assets/about_civil_snow.png"
              break;

            case 'tsrain':
              precImg = "/.assets/about_civil_tsrain.png"
              break;

            case 'tstorm':
              precImg = "./assets/about_civil_tstorm.png"
              break;

            case 'rain':
              precImg = "./assets/about_civil_rain.png"
              break;

            default:
              break;
          }
        }

        getImg()

        weatherTable.innerHTML.remove
        loading = false
        weatherTable.innerHTML += `
        <div class="data">
        <div class="data-set">
        <span>${m}/${d}</span>
        <img src=${precImg}>
        <div class="high-low">
        <span>High Low</span>
        <span>
        ${Math.round(maxTemp * 9/5) + 32}&#176; / ${Math.round(minTemp * 9/5) + 32}&#176;
        </span>
        </div>
        </div>
        </div>
        `
      });
    })
  .catch(error => console.error(error))
}

getWeatherJson()

async function updateLocation(e) {
  e.preventDefault()
  loading = true
  weatherTable.innerHTML.remove
  weatherTable.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>
  `
  const lattitude = document.getElementById('latt').value
  const longitude = document.getElementById('lon').value

  latt = lattitude
  lon = longitude

  await getWeatherJson()
}

// IS STRING AN ISOGRAM ?
const isIsoDiv = document.getElementById('isIso-container');
isIsoDiv.innerHTML += `
    <label>Enter word to see if it's an isogram</label>
    <input type="text" id="iso"></input>
    <button onClick="isIsogram(event)">Check</button>
`
function isIsogram(e){
    e.preventDefault();
    const str = document.getElementById('iso').value.toLowerCase();
    let same = 0;
    
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < str.length; j++) {
            value1 = str[i].toLowerCase();
            value2 = str[j].toLowerCase();

            if (value1 < value2 || value1 > value2 || i === j) {
                continue;
            } else {
                same++
            }
        }
    }
    
    const isIso = same > 0 ? false : true;

    if (isIso) {
        isIsoDiv.innerHTML = `It's an ISOGRAM <button onClick="restIso(event)">Try again</button>`;
    } else {
        isIsoDiv.innerHTML = `Not an ISOGRAM <button onClick="restIso(event)">Try again</button>`;
    }
  }

  function restIso(e) {
    e.preventDefault();
    isIsoDiv.innerHTML = `
    <label>Enter word to see if it's an isogram</label>
    <input type="text" id="iso"></input>
    <button onClick="isIsogram(event)">Check</button>
`
  }

  // COUNT THE VOWELS
  const vowelsDiv = document.getElementById('vowels-container');
  vowelsDiv.innerHTML = `
    <label>Enter text to see how may vowels</label>
    <input id="vowelStr" type="text"></input>
    <button onClick="countVowels(event)">Count</button>
  `
  function countVowels(e) {
    const str = document.getElementById('vowelStr').value;

    let vowelsCount = 0;

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            vowelsCount++
        }
    }

    vowelsDiv.innerHTML = `
        There are ${vowelsCount} vowels!!!
        <button onClick="resetVowel(event)">Reset</button>
    `
  }

  function resetVowel(e) {
      e.preventDefault();
    vowelsDiv.innerHTML = `
        <label>Enter text to see how may vowels</label>
        <input id="vowelStr" type="text"></input>
        <button onClick="countVowels(event)">Count</button>
    `
  }