/* eslint-disable */
const L = require('leaflet');

class Popup {
  closeForm(){
    this.popupData.style.display = "none" ;
  }
  initPopup(teacherData) {
    console.log(teacherData)
    let isClicked = false;

    this.teacherInfo.innerHTML = "";
    this.teacher = teacherData;
    this.teacher.favorite ? this.favbtn.classList.add('selected') : this.favbtn.classList.remove('selected');
    this.popupData.style.display = "block"
    this.teacherInfo.innerHTML =

      '<img alt=\"Avatar\" src=' + teacherData.picture_large + ' class=\'avatar\'>' +
      '<div class=\"info\">'+
      '<h2>' + teacherData.full_name + '</h2>' +
      '<h3>' + teacherData.specialty + '</h3>' +
      '<h4>' + teacherData.country + '</h4>' +
      '<h4>' + teacherData.age + '</h4>' +
      '<h4>' + teacherData.email + '</h4>' +
      '<h4>' + teacherData.phone + '<h4>' +
      '</div>';
    if (teacherData.latitude) {
      this.mapbtn.onclick = () => {
        console.log("hello")
        if (isClicked) {
          console.log("212121")

          isClicked = false;
          this.mapPopup.innerHTML = '';
        } else {
          console.log("783784903794798")

          const mapInst = document.getElementById('map');
          if (mapInst) mapInst.remove();
          this.mapPopup.innerHTML = '<div id="map"></div>';
          this.initMap(teacherData);
          isClicked = true;

        }
      }
    }
  }
  initMap(teacherData) {
    const map = L.map('map')
      .setView([teacherData.latitude, teacherData.longitude], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoiam9yZ2VzYW5jaGV6NDE4MyIsImEiOiJja3dpNW54MTQxNTd3Mm9wbXJ4eGM5MXF6In0.QfxusUycYfyzYvbM5xYA9w',
    })
      .addTo(map);

    L.marker([teacherData.latitude, teacherData.longitude])
      .addTo(map);
  }

  constructor() {
    this.teacher = null;
    this.favCallBack = null;

    this.favbtn = document.getElementById('ifavorite');

    this.popupData = document.getElementById('UserPopup');
    this.teacherInfo = document.getElementById('teacherInfo');
    this.closePopup = document.getElementById('closeUser')
    this.closePopup.onclick = () => (this.closeForm())
      this.mapPopup = document.getElementById('map-content');
    this.mapbtn = document.getElementById('map-btn')

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

