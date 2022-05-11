/* eslint-disable */

////Task 1 Lab3


function createUser(user, index) {
    const getSpecialty = () => {
        const courseList = ['Mathematics', 'Physics', 'English', 'Computer Science',
            'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];
        return courseList[Math.floor(Math.random() * courseList.length)]
    }
    const getColor = () => {
        const courseList = ['red', 'blue', 'olive', 'yellow',
            'gray', 'white', 'maroon', 'purple', 'navy', 'aquamarine'];
        return courseList[Math.floor(Math.random() * courseList.length)]
    }

    const id = `${user.id.name || ''}${user.id.value  || ''}`;
    const full_name = `${user.name.first|| ''} ${user.name.last || ''}`.trim();
    return {
        id: id || `id${1 + index}`,
        gender: user.gender,
        full_name: user.full_name || full_name,
        course: user.corse  || getSpecialty(),
        bg_color: user.color || getColor(),
        country:user.location.country,
        city: user.location.city,
        state: user.location.state,
        postcode: user.postcode|| user.location.postcode,
        email: user.email,
        phone: user.phone,
        age: user.age || user.dob.age,
        birthday: user.age || user.dob.age,
        picture_large: user.picture.large,
        picture_medium: user.picture.medium,
        favorite: false,
        note: null,
    }
}

function userCreation(user_mock) {
    return user_mock.map(createUser);
}

///////Task2 lab 3
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/

const isString = (obj) => toString.call(obj) === '[object String]';
const isNumber = (obj) => toString.call(obj) === '[object Number]';
const isUpperCase = (word) => isString(word) && word.charAt(0).toUpperCase() === word.charAt(0);
const validIsPhoneNumber = (number) => phoneRegex.test(number);

function ValidationUser(user) {
    console.log(user)
    const fields = [];
    Object.keys(user).forEach((key) => {
        if (
            ['full_name', 'gender', 'note', 'state', 'city', 'country'].includes(key)
        ) {
            fields.push(!!isUpperCase(user[key]));
            console.log(fields)
        } else if (key === 'age') {
            fields.push(!!isNumber(user[key]));
        } else if (key === 'phone') {
            fields.push(!!validIsPhoneNumber(user[key]))
        } else if (key === 'email') {
            fields.push(!!user[key].match(emailRegex));
        } else {
            fields.push(true);
        }
    });
    return !fields.includes(false);
}
//Task 3
function filtration(country = '', age = '', gender = '', favorite, arrayObjects) {


    return arrayObjects.filter(item =>
        item.country === country &&
        item.age === age &&
        item.gender === gender &&
        item.favorite === favorite
    );

}
//Task 4
function sortingUser(prop, order = 'ASC', arrayObjects) {


    if (order === 'ASC') {
        return arrayObjects.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0))
    } else {
        return arrayObjects.sort((a, b) => (b[prop] > a[prop]) ? 1 : ((a[prop] > b[prop]) ? -1 : 0))
    }

}

//Task 5
function FindUser(arrayObjects, field, arg) {
    if (!(arrayObjects && field && arg && arrayObjects[0][field])) return {};
    // return userList.find((user) => user[field] === arg);
    return arrayObjects.filter((user) => user[field] === arg);
}

function getPercent(arrayObjects, field, arg) {
    const foundUsers = FindUser(arrayObjects, field, arg);
    const percent = (foundUsers.length * 100) / arrayObjects.length;
    return Math.round(percent);
}
module.exports = {
    userFormatting: userCreation,
    ValidationUser,
    task3: filtration,
    task4: sortingUser,
    task5: FindUser,
    getPercent
}
