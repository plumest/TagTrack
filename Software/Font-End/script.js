function checkUser() {
    let id = document.getElementById('username').value;
    let pwd = document.getElementById('password').value;
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
        },
        'saku39':{
            'username': 'saku39',
            'password': '393939',
            'firstname': 'Sakura',
            'lastname': 'Miyawaki',
            'email': 'saku39@izone.com',
            'age': '21',
            'sex': 'Female',
            'blood': 'A',
            'allergic': '',
            'phobia': 'hemophobia',
            'other': ''
        }
    }
    let wrong = true;
    
    Object.keys(userData).forEach((item) => {
        if (id === userData[item].username) {
            if (pwd === userData[item].password) {
                localStorage.setItem('id' , item);
                window.location.href = '../index.html';
                
            }
        }
    })

    if (wrong === true) {
        document.getElementById('username').setCustomValidity('Username or password Incorrect')
    }
}

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