/* eslint-disable */
import Chart from 'chart.js/auto';

(async () => {
  const testModules = require('./test-module');
  const Api = require('./api/UserApi');
  const Process = require('./process.js');
  const PopupAddTeacher = require('./PopupAddTeacher.js');

  const TeachersList = require('./drawUsers.js');
  const { randomUserMock } = require('./mock/FE4U-Lab3-mock');

  const SearchTeachers = require('./search');
  const FilterTeachers = require('./filter');

  /** ******** Your code here! *********** */
  function createTeacher(teacherData) {
    teacherList.add(teacherData);
    console.log(teacherData);
    // db.post(JSON.stringify(teacherData));
  }

  const api = new Api({ seed: 'HELL' });
  const randomTeachers = await api.getUsers({ count: 50 });
  // console.log(randomUserMock);
  let countTeacher = randomTeachers.length;

  const MAX_TEACHER = 100;

  const a = Process.userFormatting(randomTeachers);

  const searchTeachers = new SearchTeachers();

  const filterTeachers = new FilterTeachers();
  console.log(a);

  const teacherList = new TeachersList('teacherList', a);
  const popupAddTeacher = new PopupAddTeacher();

  teacherList.activeMore(() => {

    const limit = 10;
    countTeacher += limit;

    const page = Math.ceil(countTeacher / 10);
    return Promise.resolve()
      .then(() => api.getLimitedResult({
        page,
        limit
      }))
      .then((teachers) => {
        console.log(teachers);
        if (countTeacher > MAX_TEACHER) {
          return Promise.resolve({ ok: false });
        } else {
          teacherList.addTeachers(teachers);
        }
        return Promise.resolve({ ok: true });
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  });
  popupAddTeacher.FormListener(createTeacher);

  searchTeachers.start((res) => {
    if (res === '') {
      teacherList.applySearchElements('');
      return null;
    }

    const getOpts = createSearchOpts(res);
    console.log(getOpts);
    teacherList.applySearchElements(getOpts);
  });

  filterTeachers.start((res) => {
    if (res === '') {
      teacherList.applySearchElements('');
      return null;
    }
    const getOpts = createFilterOpts(res);
    teacherList.applySearchElements(getOpts);
  });

  function createSearchOpts(rawData) {
    const opts = {};
    console.log(rawData);
    const date = rawData.toLowerCase();
    const searchData = rawData.split(' ' || '-');
    let name = '';

    opts.gender = date.match(/\b(\bmale\b|\bfemale\b)/) ? date.match(/\b(\bmale\b|\bfemale\b)/)[0] : '';
    opts.age = date.match(/\d{2}/) ? date.match(/\d{2}/)[0] : '';
    opts.favorite = !!date.match(/\b(\bfavorite\b)/);
    opts.isPhoto = !!date.match(/\b(\bphoto\b)/);
    searchData.forEach(data => {
      console.log(data);
      let res = data.match(/^(?:(?!\bfemale\b|\bmale\b|\bfavorite\b)[^0-9_!¡?÷¿/\\+=@#$%ˆ&*(){}|~<>;:\s[\]])*/);
      if (res) {
        if (!name) {
          name = res[0];
          opts.firstname = name;
        } else {
          opts.lastname = res[0];
        }
      } else if (data.length > 15) opts['note'] = data;
    });
    Object.keys(opts)
      .forEach(key => {
        if (opts[key] === '' || opts[key] === false) delete opts[key];
      });
    console.log(opts);
    return opts;
  }

  function createFilterOpts(rawData) {
    const opts = {};
    Object.keys(rawData)
      .forEach(key => {
        if (!(rawData[key] === false || rawData[key] === 'not_specify' || rawData[key] === '')) {
          opts[key] = rawData[key];
          if (key === 'age') {
            opts[key] = parseInt(rawData[key]);
          }
        }
      });
    console.log(opts, rawData);
    return opts;
  }

  let xValues = ['Italy', 'France', 'Spain', 'USA', 'Argentina'];
  let yValues = [55, 49, 44, 24, 15];
  let barColors = [
    '#b91d47',
    '#00aba9',
    '#2b5797',
    '#e8c3b9',
    '#1e7145'
  ];

  new Chart('myChart', {
    type: 'pie',
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "World Wide Wine Production 2018"
      }
    }
  });

})();
