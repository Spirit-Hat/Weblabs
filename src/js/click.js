/* eslint-disable */
// const PopupaddTeacher = require('./PopupAddTeacher');
const formAddTeacher = document.getElementById("myForm");
// function openForm() {
//   document.getElementById("myForm").style.display = "block";
// }
//
// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }

$("button.addTeacher").on('click', function () {
  formAddTeacher.style.display = "block";
  // content.classList.toggle("background");
});
$("div.closeForm").on('click', function () {
  console.log("jmofjmeiofjwojfoi3wjo")
  formAddTeacher.style.display = "none";
});

