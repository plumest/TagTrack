const baseURL = 'https://exceed.superposition.pknn.dev/data';

function postData(data = {}) {
    let heartrate = {
        // get heartrate data
        'heartrate': [[0, 118], [1, 195], [2, 77], [3, 80], [4, 187], [5, 120], [6, 81], [7, 148], [8, 200], [9, 115], [10, 94], [11, 157], [12, 164], [13, 70], [14, 169], [15, 195], [16, 86], [17, 94], [18, 76], [19, 91], [20, 115], [21, 120], [22, 88], [23, 77], [24, 153], [25, 82], [26, 163], [27, 159], [28, 157], [29, 193], [30, 193], [31, 135], [32, 174], [33, 107], [34, 74], [35, 132], [36, 178], [37, 185], [38, 93], [39, 83], [40, 190], [41, 178], [42, 107], [43, 184], [44, 124], [45, 125], [46, 99], [47, 200], [48, 158], [49, 162], [50, 133], [51, 174], [52, 77], [53, 104], [54, 139], [55, 173], [56, 185], [57, 128], [58, 74], [59, 71]]
    }
    data = heartrate;
    fetch(baseURL + '/jitrada', {
        method: 'POST',
        body: JSON.stringify({"data": heartrate}),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
    
    console.log(heartrate)
    console.log(data)
}

function putData() {
    let heartrate = {
        // get heartrate data
        'heartrate': [[0, 118], [1, 195], [2, 77], [3, 80], [4, 187], [5, 120], [6, 81], [7, 148], [8, 200], [9, 115], [10, 94], [11, 157], [12, 164], [13, 70], [14, 169], [15, 195], [16, 86], [17, 94], [18, 76], [19, 91], [20, 115], [21, 120], [22, 88], [23, 77], [24, 153], [25, 82], [26, 163], [27, 159], [28, 157], [29, 193], [30, 193], [31, 135], [32, 174], [33, 107], [34, 74], [35, 132], [36, 178], [37, 185], [38, 93], [39, 83], [40, 190], [41, 178], [42, 107], [43, 184], [44, 124], [45, 125], [46, 99], [47, 200], [48, 158], [49, 162], [50, 133], [51, 174], [52, 77], [53, 104], [54, 139], [55, 173], [56, 185], [57, 128], [58, 74], [59, 71]]
    }
    fetch(baseURL + '/jitrada', {
        method: 'PUT',
        body: JSON.stringify({'data':heartrate}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err))
    
}