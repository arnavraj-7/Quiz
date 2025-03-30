let submit = document.querySelector(".submit");
let form = document.querySelector("form");
let igenre;
let idifficulty;
let inoq;
let itime;
window.onload = function () {
  document.querySelector(".container").classList.remove("opacity-0");
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  igenre = document.querySelector(".genre").value;
  idifficulty = document.querySelector(".difficulty").value;
  inoq = document.querySelector(".noq").value;
  itime=document.querySelector(".time").value;
  console.log([igenre,idifficulty,inoq,itime]);
  localStorage.setItem("genre", igenre);
  localStorage.setItem("difficulty", idifficulty);
  localStorage.setItem("noq", inoq);
  localStorage.setItem("time", itime);
  window.location.href = "quiz.html";
});

