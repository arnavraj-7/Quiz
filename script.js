let igenre=localStorage.getItem("genre")
let idifficulty=localStorage.getItem("difficulty")
let inoq=localStorage.getItem("noq");
let itime=localStorage.getItem("time")
let img=["backgrounds/bg-1.avif","backgrounds/bg-3.jpg","backgrounds/bg-2.jpg","backgrounds/bg-4.jpg","backgrounds/bg-5.jpg"]
let body=document.querySelector("body")
// console.log(itime); debugging
// console.log(inoq);debugging
console.log(body);
const changeBackground=()=>{
  img.sort(() => Math.random() - 0.5);
  bg_class=img[0];
  body.style.backgroundImage = `url('${bg_class}')`;
  body.style.backgroundSize = "cover"; // Ensure full coverage
  body.style.backgroundPosition = "center"; 
  body.style.transition = "background 1s ease-in-out"; 
}


function callchangeBackground(){
  setInterval((changeBackground),5000)
}
callchangeBackground()

let APIs={
  Anime:{
    Easy:"https://api.npoint.io/1a55fbb4d4b47fb8dcda",
    Moderate:"https://api.npoint.io/1a55fbb4d4b47fb8dcda", 
    Difficult:"https:/ q/api.npoint.io/c112d73edc2acde87b38"
  },
  Movie:{
    
  }
}
console.log(APIs[igenre][idifficulty]);
async function fetchdata() {
  let res = await fetch(APIs[igenre][idifficulty]);
  let data = await res.json();
  return data;
}
let results;
// let len;
fetchdata().then((data) => {
  storeddata = data;
  results = storeddata.results;
  // len=results.length
  //   console.log(results);
//  len=results.length

  startQuiz();
});
let score = 0;
let storeddata;
let i = 0;
let qdiv = document.querySelector(".question");
let next = document.querySelector(".next");
let mess = document.querySelector(".message");
let prev = document.querySelector(".prev");
let tmr = document.querySelector(".timer");
let t = parseInt(itime);
let starttimer;
let intervalId;//interval id
let ahead;//timeout id
let blurtimeout;
let time_up=document.querySelector(".time-up")
let Final_score=document.querySelector(".Final_score")

function startTimer(){
  if(!intervalId)
 {intervalId = setInterval(timer, 1000);}
}
function toBlur(m,time,element){
  let content=document.querySelector(".content")
  content.classList.add("blur")
  console.log(time_up);
  element.innerHTML=m
  let blurtimeout=setTimeout(()=>
    { time_up.innerHTML=""
      content.classList.remove("blur")
  },time)
}
function timer() {
  if (t >= 0) {
    tmr.innerHTML = t;
    t--;
    return t;
  } else {
    clearInterval(intervalId);
    intervalId=null
    mess.innerHTML="Times up"
    toBlur("Times up",2000,time_up)
    checkans()
    CheckQuizend()
    return;
  }
}

//next function
function nextf(){
  clearTimeout(blurtimeout);
  clearInterval(intervalId);
  clearTimeout(ahead);
  ahead=null; 
  intervalId=null
  console.log(score);
  mess.innerHTML = "";
  i++;
  t=parseInt(itime);
  startQuiz();
}

// next button
next.addEventListener("click", (e) => {
nextf()
});
//prev button
// prev.addEventListener("click", (e) => {
//   console.log(score);
//   mess.innerHTML = "";
//   i--;
//   startQuiz();
// });

//disable button
const disablebutton = () => {
  document.querySelectorAll(".options button").forEach((button) => {
    button.disabled = true;
  });
};

//enable button
const enablebutton = () => {
  document.querySelectorAll(".options button").forEach((button) => {
    button.disabled = false;
  });
};

//display questions
const displayQuestion = function () {
  qdiv.innerHTML = `${i + 1})${String(results[i].question)}`;
  // console.log(results[i].question);
};

//display options
const displayOption = function () {
  startTimer()
  let options = results[i].incorrect_answers;
  //   console.log(options);
  options.push(String(results[i].correct_answer));
  options.sort(() => Math.random() - 0.5);
  let option1 = document.querySelector(".optionA");
  let option2 = document.querySelector(".optionB");
  let option3 = document.querySelector(".optionC");
  let option4 = document.querySelector(".optionD");
  option1.innerHTML = options[0];
  option2.innerHTML = options[1];
  option3.innerHTML = options[2];
  option4.innerHTML = options[3];

  //buttons accessing
  let buttons = document.querySelectorAll(".options button");

  //enabling all buttons
  enablebutton();
  // console.log("Answer:" + results[i].correct_answer);

  //removing prev Event Listeners
  buttons.forEach((element) => {
    element.removeEventListener("click", handleClick);
  });

  
  //reseting white color and adding Event Listeners
  buttons.forEach((element) => {
    element.classList.remove("btn-styles-correct","btn-styles-wrong")
    element.classList.add("btn-styles")
    
    element.addEventListener("click", handleClick);

  });
  return options;
};

function findcorrectbutton() {
  let optionbutton = Array.from(document.querySelectorAll(".options button"));
  // console.log(optionbutton);
  for (let j = 0; j < 4; j++) {
    if (optionbutton[j].innerHTML == results[i].correct_answer) {
      // console.log(optionbutton[j].innerHTML);
      return optionbutton[j];
    }
  }
}


//handling clicks
const handleClick = (event) => {
  let element = event.target;
  clearInterval(intervalId); 
  intervalId=null
  checkans(element, element.innerHTML);
  disablebutton();
  CheckQuizend()
};

//checking answers and updating score
const checkans = (element, selected) => {
  // console.log(results[i].correct_answer);
  console.log("Selected option:" + selected);
  if (selected == results[i].correct_answer) {
    element.classList.remove("btn-styles")
    element.classList.add("btn-styles-correct")
    // m = "Correct Answer";
   ahead=setTimeout(()=>{
     nextf() 
    },3000)

    // message(m);
    score++;
  }
  else if(element==null && selected==null){
    disablebutton()
    findcorrectbutton().classList.add("btn-styles-correct")}
  else {
    // m = `Incorrect Answer ,Correct Answer is ${results[i].correct_answer}`;
    element.classList.remove("btn-styles")
    element.classList.add("btn-styles-wrong")
    findcorrectbutton().classList.add("btn-styles-correct")
    ahead=setTimeout(()=>{
      nextf() 
     },3000)
    // message(m);
  } 

  next.disabled=false
};
function CheckQuizend(){
  if (i >= parseInt(inoq)-1) {
    m = `Your Score is:${score}`;
    message(m);
    let nextContainer=document.querySelector(".next-container")
    toBlur(`Quiz is Over <br>
     Your Score is: ${score}`,5000,Final_score)
    nextContainer.innerHTML = "Quiz is Over";
    clearTimeout(ahead)
    return;
  }
}

// message and displaying it
const message = (m) => {
  mess.innerHTML = m;
};

//main quiz function
function startQuiz() {
  // console.log(results);
  next.disabled=true
  displayQuestion();
  displayOption();
}
