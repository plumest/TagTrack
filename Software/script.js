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
    })
}

let heart = []
getData()

google.charts.load('current', {
  packages: ['corechart', 'line']
});
google.charts.setOnLoadCallback(drawBasic);


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
