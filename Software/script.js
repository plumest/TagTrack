function getData() {
  fetch('https://exceed.superposition.pknn.dev/data/jitrada', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then((data) => {
      // console.log(data.heartrate)
      console.log('before', heart)
      heart = data.heartrate
      console.log('after', heart)
      google.charts.load('current', {
        packages: ['corechart', 'line']
      });
      google.charts.setOnLoadCallback(drawBasic);
    })
}


// Real data
let heart = []
setInterval(getData , 2000)

// Mock data
// let heart = [[0,118],[1,195],[2,77],[3,80],[4,187],[5,120],[6,81],[7,148],[8,200],[9,115],[10,94],[11,157],[12,164],[13,70],[14,169],[15,195],[16,86],[17,94],[18,76],[19,91],[20,115],[21,120],[22,88],[23,77],[24,153],[25,82],[26,163],[27,159],[28,157],[29,193],[30,193],[31,135],[32,174],[33,107],[34,74],[35,132],[36,178],[37,185],[38,93],[39,83],[40,190],[41,178],[42,107],[43,184],[44,124],[45,125],[46,99],[47,200],[48,158],[49,162],[50,133],[51,174],[52,77],[53,104],[54,139],[55,173],[56,185],[57,128],[58,74],[59,71]];
// setInterval(randomHeart, 1000)



function drawBasic() {

  let data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'User');

  console.log('onDraw', heart)
  data.addRows(heart)
  // Heart are nest list off data

  let options = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Heart Rate'
    },
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)'
    },
    width: 700,
    height: 400,
    axes: {
      x: {
        0: {
          side: 'top'
        }
      }
    }
  };


  let chart = new google.visualization.LineChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}

function randomHeart() {
  heart.shift()
  heart.forEach((arr) => arr[0]--)
  let randomHeartrate = Math.random(70, 200);
  heart.push([59, randomHeartrate])

  google.charts.load('current', {
    packages: ['corechart', 'line']
  });
  google.charts.setOnLoadCallback(drawBasic);
}