/* eslint-disable */

class drawUsers {
  static userCard(teacherCard, teacher) {
    console.log(`${teacher.picture_large}`)
    teacherCard.innerHTML =
      "<img alt='Avatar' src="+teacher.picture_large+" class='avatar'>" +
      "<h2>" +teacher.full_name+ "</h2>" +
      "<h3>" +teacher.course+  "</h3>" +
      "<h4>" +teacher.location+ "<h4>" +
      '</div>';
  }

  static createCard(teacher) {
    const teacherCard = document.createElement('div');
    teacherCard.classList.add('teacherCard');
    teacherCard.id = teacher.id;
    drawUsers.userCard(teacherCard, teacher);

    return teacherCard;
  }

  constructor(listIDm, teachers) {
    this.teachers = teachers;
    this.teacherGallery = document.getElementById('teacher');
    teachers.forEach((object) =>this.teacherGallery.appendChild(drawUsers.createCard(object)) )
    // this.teacherGallery.appendChild(drawUsers.createCard(teacher));
    // this.teacherTableList = new TeacherTableList();
  };
}

module.exports = drawUsers;
