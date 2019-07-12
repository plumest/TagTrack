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