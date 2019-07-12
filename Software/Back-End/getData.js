const fs = require('fs');

function getHeartList(index=0, heartrate=0) {
    return [index, heartrate]
}

function getData () {
    let data = []
    let sec = new Date().getSeconds();
    data.push(getHeartList(sec, ))
    return data
}

setInterval(() => {
    let sec = new Date().getSeconds();
    document.getElementById('test').innerHTML = sec;
}, 1000)

let data_tested = {
    'abcabc1234': {
        'username': 'abcabc1234',
        'password': '1234',
        'firstname': 'abcabc',
        'lastname': '1234',
        'email': 'abcabc1234@hotmail.com',
        'age': '20',
        'sex': 'male',
        'blood': 'B',
        'allergic': '',
        'phobia': 'hemophobia',
        'other': ''
    }
}

fs.appendFile('abcabc1234', data_tested, (err, fd) => {
    if (err) throw err;
    console.log('sucess')
})