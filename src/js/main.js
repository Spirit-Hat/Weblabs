/* eslint-disable */
(async () => {
  const testModules = require('./test-module');
  const  Api = require('./api/UserApi');
  const Process = require('./process.js');
  const PopupAddTeacher = require('./PopupAddTeacher.js');

  const TeachersList = require('./drawUsers.js');
  const {randomUserMock} = require('./mock/FE4U-Lab3-mock');

  /** ******** Your code here! *********** */
  function createTeacher(teacherData) {
    teacherList.add(teacherData);
    console.log(teacherData);
    // db.post(JSON.stringify(teacherData));
  }

  const api = new Api({seed: 'HELL'});
  const randomTeachers = await api.getUsers({count:50});
  // console.log(randomUserMock);

  const a  = Process.userFormatting(randomUserMock)
  console.log(a);


  const teacherList = new TeachersList('teacherList', a);
  const popupAddTeacher = new PopupAddTeacher();

  popupAddTeacher.FormListener(createTeacher);


})();
