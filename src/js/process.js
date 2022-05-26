/* eslint-disable */

////Task 1 Lab3
const getField = (obj, ...date) => date.reduce((el, level) => el && el[level], obj);


// function createUser(user, index) {
//     const getSpecialty = () => {
//         const courseList = ['Mathematics', 'Physics', 'English', 'Computer Science',
//             'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];
//         return courseList[Math.floor(Math.random() * courseList.length)]
//     }
//     const getColor = () => {
//         const courseList = ['red', 'blue', 'olive', 'yellow',
//             'gray', 'white', 'maroon', 'purple', 'navy', 'aquamarine'];
//         return courseList[Math.floor(Math.random() * courseList.length)]
//     }
//     const get = (...date) => {
//         const res = getField(user, ...date);
//         return res && typeof res !== 'object' ? res : null;
//
//     }
//
//     const id = `${user.id.name || ''}${user.id.value  || ''}`;
//     const firstname = get('name', 'first') || get("name") || '';
//     const lastname = get('name', 'last') || get("lastname") || '';
//     const full_name = firstname + " " + lastname;
//     // const full_name = `${user.name.first|| ''} ${user.name.last || ''}`.trim();
//     return {
//         id: id || `id${1 + index}`,
//         gender: user.gender,
//         full_name: user.full_name || full_name,
//         course: user.corse  || getSpecialty(),
//         bg_color: user.color || getColor(),
//         country:user.location.country,
//         city: user.location.city,
//         state: user.location.state,
//         postcode: user.postcode|| user.location.postcode,
//         email: user.email,
//         phone: user.phone,
//         age: user.age || user.dob.age,
//         birthday: user.age || user.dob.age,
//         picture_large: user.picture.large,
//         picture_medium: user.picture.medium,
//         favorite: false,
//         note: null,
//     }
// }
function createUser(user, index, form = false) {
    let birthday = "";
    let age = "";
    let idForm = "";
    const get = (...date) => {
        const res = getField(user, ...date);
        return res && typeof res !== 'object' ? res : null;

    }

    const getSpecialty = () => {
        const courseList = ['Mathematics', 'Physics', 'English', 'Computer Science',
            'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];
        return courseList[Math.floor(Math.random() * courseList.length)]    }

    const id = get('id') || `${get('id', 'name') || ''}${get('id', 'value') || ''}`;

    const firstname = get('name', 'first') || get("firstname") || '';
    const lastname = get('name', 'last') || get("lastname") || '';
    const full_name = firstname + " " + lastname;

    const location = `${get('location', 'country') || get('country' || "")}, ${get('location', 'city') || get('city') || ""}`.trim();
    if (!form) {
        birthday = new Date(user.fyear, user.fmonth, user.fday);
        age = new Date().getFullYear() - user.fyear;
        idForm = `FORM${index}`;
    }
    return {
        id: id || idForm || `NEW${1000 + index}`,
        gender: get('gender'),
        full_name: get('full_name') || full_name,
        firstname: firstname,
        lastname: lastname,
        // state: get('state') || get('location', 'state'),
        country: get('location', 'country') || get('country' || ""),
        city: get('location', 'city') || get('city') || "",
        // location: get('location') || location,
        postcode: get('postcode') || get('location', 'postcode') || null,

        email: get('email'),
        phone: get('phone'),

        age: get('age') || get('dob', 'age') || age,
        birthday: get('birthday') || get('dob', 'date') || birthday,
        picture_large: get('picture_large') || get('picture', 'large') || "../res/2.jpg",
        specialty: get('specialty') || getSpecialty(),

        latitude: get('latitude') || get('location', 'coordinates', 'latitude') || '',
        longitude: get('longitude') || get('location', 'coordinates', 'longitude') || '',
        isPhoto: !!get('picture', 'large'),
        favorite: false,
        note: get("note") || null,
    }
}

function userCreation(user_mock) {
    let list = user_mock.map(createUser);

    const uniqueOption = (list) => {
        const result = []
        const optionsRegion = document.getElementById("select-region");

        for (let obj of list) {
            if (!result.includes(obj.country)) {
                result.push(obj.country);
                optionsRegion.append(new Option(obj.country, obj.country));

            }
        }
    }

    uniqueOption(list)
    return list;
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
    createUser,
    task3: filtration,
    task4: sortingUser,
    task5: FindUser,
    getPercent
}
