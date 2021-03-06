/* eslint-disable */
const Popup = require('./Popup.js');
const teacherFavList = require('./teacherFavoriteList')
const Process = require('./process.js');
const TeacherTableList = require('./teacherTable');
const {SearchUser} = require('./userOperate');


class drawUsers {
  static userCard(teacherCard, teacher) {
    // console.log(`${teacher.picture_large}`);
    teacherCard.innerHTML =
      '<div class="star">&#9733;</div>'+
      '<img alt=\'Avatar\' src=' + teacher.picture_large + ' class=\'avatar\'>' +
      '<h2>' + teacher.full_name + '</h2>' +
      '<h3>' + teacher.specialty + '</h3>' +
      '<h4>' + teacher.country + '<h4>' +
      '</div>';
  }


  static createCard(teacher) {
    const teacherCard = document.createElement('div');
    teacherCard.classList.add('teacherCard');
    teacherCard.id = teacher.id;
    teacherCard.dataset.id = teacher.id;
    drawUsers.userCard(teacherCard, teacher);

    return teacherCard;
  }
  // add(teacherDate) {
  //   console.log(teacherDate)
  //   const teacher = Process.createUser(teacherDate, this.teachers.length + 1, false);
  //   const teacherCard = drawUsers.createCard(teacher);
  //   teacherCard.onclick = () => this.onClickCardTeacher(teacher);
  //   this.teachers.push(teacher);
  //   console.log(teacherCard);
  //   this.teacherList.appendChild(teacherCard);
  //
  //   // this.teacherTableList.add(teacher);
  //   // this.teacherTableList.setupPage(this.teacherTableList.page.current);
  //
  // };
  activeMore(onClickMore) {
    this.loadMoreBtn.addEventListener('click', async () => {
      this.loadMoreBtn.classList.add('active');
      onClickMore()
        .then((res) => {
          this.loadMoreBtn.classList.remove('active');
          if (!res.ok) {
            this.loadMoreBtn.classList.add('not_work');
            this.loadMoreBtn.setAttribute("disabled", "");
          }
        });
    });
  }
  addTeachers(teachers) {
    teachers.forEach((teacher) => this.add(teacher));
    this.resetFilterElements();
    this.teacherlistFiltered = [];
  }
  add(teacherDate) {
    const teacher = Process.createUser(teacherDate, this.teachers.length + 1, true);
    const teacherCard = drawUsers.createCard(teacher);
    teacherCard.onclick = () => this.onClickCardTeacher(teacher);
    this.teachers.push(teacher);
    console.log(this.teacherList);
    this.teacherList.appendChild(teacherCard);

    // this.teacherTableList.add(teacher);
    // this.teacherTableList.setupPage(this.teacherTableList.page.current);

  };

  onClickCardTeacher(teacher) {
    this.popup.initPopup(teacher);
    this.popup.favCallBack = (isFavorite) => this.onClickFavorite(isFavorite, teacher);
  }
  onClickFavorite(isFavorite, teacher) {
    console.log(teacher, isFavorite);
    const teacherCard = document.getElementById(teacher.id);
    if (isFavorite) {
      const cloneTeacherLiEml = drawUsers.createCard(teacher);
      this.teacherFavList.add(cloneTeacherLiEml);
    } else {
      console.log("hello");
      this.teacherFavList.remove(teacher.id);
    }
    teacherCard.getElementsByClassName("star")[0].classList.toggle("selected");

  };
  setStarpPage() {
    if (this.teacherList) return;
    this.teacherList = this.createTeacherList(this.teachers);
    this.teacherList.firstChild && this.teacherGallery.appendChild(this.teacherList);
    this.teachers.forEach((teacher) => {
      // console.log(teacher)
      this.teacherTableList.addTable(teacher);
      if (teacher.favorite) {
        const teacherLiElm = drawUsers.createCard(teacher);
        this.teacherFavList.add(teacherLiElm);
        // this.teacherFavoriteList.updateListElements();
      }
    });
    this.teacherTableList.updateTable();
  //   this.teacherList =this.createTeacherList(this.teachers)
  //
  //   this.teacherGallery.appendChild(this.teacherList)
  }
  createTeacherList(teachers) {
    const teacherList = document.createElement('div')
    teacherList.classList.add("teacher");
    if (teachers.length > 0) {
      teachers.forEach((teacher) => {
        const teacherCard = drawUsers.createCard(teacher);
        teacherCard.onclick = () => this.onClickCardTeacher(teacher);
        teacherList.appendChild(teacherCard);
      });
    }
    return teacherList;
  }
  clear() {
    if (this.teacherList && this.teacherGallery.firstChild === this.teacherList) {
      this.teacherGallery.removeChild(this.teacherList);
    } else if (this.teacherlistFiltered && this.teacherGallery.firstChild === this.teacherlistFiltered) {
      this.teacherGallery.removeChild(this.teacherlistFiltered);
    }
  }

  applySearchElements(opts = {}) {
    if (!Object.keys(opts).length) {
      this.resetFilterElements();
      this.teacherlistFiltered = [];
    } else {
      const teachersSearched = SearchUser(this.teachers, opts);
      console.log(teachersSearched);
      this.teacherlistFiltered = this.createTeacherList(teachersSearched);
      this.teacherGallery.innerHTML = ""
      this.teacherGallery.appendChild(this.teacherlistFiltered);

    }
  }

  resetFilterElements() {
    this.clear();
    this.teacherList.firstChild && this.teacherGallery.appendChild(this.teacherList);
  }
  constructor(listIDm, teachers) {
    this.teacherList = null;

    this.teachers = teachers;
    this.teacherGallery = document.getElementById('teachers');

    // teachers.forEach((object) => this.teacherGallery.appendChild(drawUsers.createCard(object)));
    this.popup = new Popup();
    this.teacherFavList = new teacherFavList();
    this.teacherTableList = new TeacherTableList();
    this.loadMoreBtn = document.getElementById("loadMore");

    this.setStarpPage();

    // this.teacherGallery.appendChild(drawUsers.createCard(teacher));
    // this.teacherTableList = new TeacherTableList();
  };
}

module.exports = drawUsers;
