// const fs = require('fs');

function getHeartList(index=0, heartrate=0) {
    return [index, heartrate]
}

function getData () {
    let data = []
    let sec = new Date().getSeconds();
    data.push(getHeartList(sec, ))
    return data
}

// setInterval(() => {
//     let sec = new Date().getSeconds();
//     document.getElementById('test').innerHTML = sec;
// }, 1000)

let userData = {
    'abcabc1234': {
        'username': 'abcabc1234',
        'password': '1234',
        'firstname': 'Abc',
        'lastname': 'Abc',
        'email': 'abcabc1234@hotmail.com',
        'age': '20',
        'sex': 'Male',
        'blood': 'B',
        'allergic': '',
        'phobia': 'hemophobia',
        'other': ''
    },
    'hello555':{
        'username': 'hello555',
        'password': '555',
        'firstname': 'Hel',
        'lastname': 'Lo',
        'email': 'hello555@gmail.com',
        'age': '25',
        'sex': 'Male',
        'blood': 'AB',
        'allergic': '',
        'phobia': 'arophobia',
        'other': ''
    },
    'sofee777':{
        'username': 'sofee777',
        'password': '777',
        'firstname': 'Sofee',
        'lastname': 'Seven',
        'email': 'sososo@ku.th',
        'age': '19',
        'sex': 'Female',
        'blood': 'O',
        'allergic': '',
        'phobia': 'hemophobia',
        'other': ''
    }
}

// fs.appendFile('abcabc1234', data_tested, (err, fd) => {
//     if (err) throw err;
//     console.log('sucess')
// })


function sentData (name='abcabc1234') {
    let userInfo = userData[name];
    document.getElementById('logName').innerText = `:  ${userInfo.firstname} ${userInfo.lastname}`;
    document.getElementById('logAge').innerText = `:  ${userInfo.age}`;
    document.getElementById('logSex').innerText = `:  ${userInfo.sex}`;
    document.getElementById('logBlood').innerText = `:  ${userInfo.blood}`;
    document.getElementById('logAllergic').innerText = `:  ${userInfo.allergic}`;
    document.getElementById('logPhobia').innerText = `:  ${userInfo.phobia}`;
    document.getElementById('logOther').innerText = `:  ${userInfo.other}`;
}
sentData()