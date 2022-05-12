/* eslint-disable */
(async () => {
  const testModules = require('./test-module');
  const  Api = require('./api/UserApi');
  const Process = require('./process.js');
  const TeachersList = require('./drawUsers.js');
  const {randomUserMock} = require('./mock/FE4U-Lab3-mock');

  /** ******** Your code here! *********** */


  const api = new Api({seed: 'HELL'});
  const randomTeachers = await api.getUsers({count:50});
  // console.log(randomUserMock);

  const a  = Process.userFormatting(randomUserMock)
  console.log(a)
  // console.log('TASK 1 RESUL',a)
  //
  // console.log('TASK 2 RESUL',Process.ValidationUser(a[0]))
  //
  //
  // console.log('TASK 3 RESULT: ', Process.task3('Germany', 65, 'male', false,a))
  //
  // console.log('TASK 4 RESULT: ', Process.task4('age', 'ASCa',a))
  //
  // console.log('TASK 5 RESULT: ', Process.task5(a,'age', 73))
  //
  // console.log('TASK 6 RESULT: ', Process.getPercent(a,'age', 73),'%')
  const teacherList = new TeachersList('teacherList', a);


})();
