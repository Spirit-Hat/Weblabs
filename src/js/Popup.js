/* eslint-disable */
class Popup {
  closeForm(){
    this.popupData.style.display = "none" ;
  }
  initPopup(teacherData) {
    this.teacherInfo.innerHTML = "";
    this.teacher = teacherData;
    this.teacher.favorite ? this.favbtn.classList.add('selected') : this.favbtn.classList.remove('selected');
    this.popupData.style.display = "block"
    this.teacherInfo.innerHTML =

      '<img alt=\"Avatar\" src=' + teacherData.picture_large + ' class=\'avatar\'>' +
      '<div class=\"info\">'+
      '<h2>' + teacherData.full_name + '</h2>' +
      '<h3>' + teacherData.course + '</h3>' +
      '<h4>' + teacherData.country + '</h4>' +
      '<h4>' + teacherData.age + '</h4>' +
      '<h4>' + teacherData.email + '</h4>' +
      '<h4>' + teacherData.phone + '<h4>' +
      '</div>';

  }
  constructor() {
    this.teacher = null;
    this.favCallBack = null;

    this.favbtn = document.getElementById('ifavorite');

    this.popupData = document.getElementById('UserPopup');
    this.teacherInfo = document.getElementById('teacherInfo');
    this.closePopup = document.getElementById('closeUser')
    this.closePopup.onclick = () => (this.closeForm())
    // this.- = document.getElementById('headerPopup');

    this.favbtn.onclick = () => {
      if (!this.teacher) return;
      this.teacher.favorite = !this.teacher.favorite;
      this.teacher.favorite ? this.favbtn.classList.add('selected') : this.favbtn.classList.remove('selected');
      if (this.favCallBack) this.favCallBack(this.teacher.favorite);
    };

  }
}

module.exports = Popup;

