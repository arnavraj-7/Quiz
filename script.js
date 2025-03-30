async function fetchdata() {
  // let res = await fetch("https://api.npoint.io/c074ba1ef8b8c8214011");
  // let res = await fetch("https://api.npoint.io/bc69bd408e05c99dafea");
  let res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
  );
  let data = await res.json();
  return data;
}
let len;
fetchdata().then((data) => {
  storeddata = data;
  results = storeddata.results;
  //   console.log(results);
 len=results.length

  startQuiz();
});
let score = 0;
let storeddata;
let results;
let i = 0;
let qdiv = document.querySelector(".question");
let next = document.querySelector(".next");
let mess = document.querySelector(".message");
let prev = document.querySelector(".prev");
let tmr = document.querySelector(".timer");
let t = 5;
let starttimer;
let intervalId;
let time_up=document.querySelector(".time-up")

function startTimer(){
  if(!intervalId)
 {intervalId = setInterval(timer, 1000);}
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
    let content=document.querySelector(".content")
    content.classList.add("blur")
    console.log(time_up);
    time_up.innerHTML="Time Up"
    setTimeout(()=>
      { time_up.innerHTML=""
        content.classList.remove("blur")
    },2000)
    
    checkans()
    return;
  }
}

// next button
next.addEventListener("click", (e) => {
  clearInterval(intervalId); 
  intervalId=null
  console.log(score);
  mess.innerHTML = "";
  i++;
  t=5;
  startQuiz();

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
  console.log("Answer:" + results[i].correct_answer);

  //removing prev Event Listeners
  buttons.forEach((element) => {
    element.removeEventListener("click", handleClick);
  });

  // for(let j=0;j<4;j++){
  //   if(options[j]==results[i].correct_answer){
  //     ci=j
  //   }

  // }

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
  console.log(optionbutton);
  for (let j = 0; j < 4; j++) {
    if (optionbutton[j].innerHTML == results[i].correct_answer) {
      console.log(optionbutton[j].innerHTML);
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
  if (i >= len-1) {
    m = `Your Score is:${score}`;
    message(m);
    let nextContainer=document.querySelector(".next-container")
    nextContainer.innerHTML = "Quiz is Over";
    return;
  }
};
// "#4CAF50"C 
// "#E74C3C"W
//checking answers and updating score
const checkans = (element, selected) => {
  // console.log(results[i].correct_answer);
  console.log("Selected option:" + selected);
  if (selected == results[i].correct_answer) {
    element.classList.remove("btn-styles")
    element.classList.add("btn-styles-correct")
    m = "Correct Answer";
    findcorrectbutton();
    // message(m);
    score++;
  }
  else if(element==null && selected==null){
    findcorrectbutton().classList.add("btn-styles-correct")}
  else {
    // m = `Incorrect Answer ,Correct Answer is ${results[i].correct_answer}`;
    element.classList.remove("btn-styles")
    element.classList.add("btn-styles-wrong")
    findcorrectbutton().classList.add("btn-styles-correct")
    // message(m);
  } 

  next.disabled=false
};

//message and displaying it
const message = (m) => {
  mess.innerHTML = m;
};

//main quiz function
function startQuiz() {
  console.log(results);
  console.log(len);
  next.disabled=true
  displayQuestion();
  displayOption();
}
