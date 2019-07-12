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
        }
    }
    let wrong = true;
    
    Object.keys(userData).forEach((item) => {
        console.log('item = ', item)
        console.log('id = ', id)
        if ((id === userData[item].username) && (pwd === userData[item].password)) {

            window.location.href = '../index.html';
        }
    })

    if (wrong === true) {
        // document.getElementById('error').innerText = 'username or password incorrect';
        document.getElementById('username').setCustomValidity('Username or password Incorrect')
    }
}