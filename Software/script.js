google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      let data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'User');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 150]
      ]);

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
            0: {side: 'top'}
          }
        }
      };


      let chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }

    $('.tab a').on('click', function (e) {
    
        e.preventDefault();
        
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        
        target = $(this).attr('href');
      
        // console.log(target)
        // $('.tab-content > div').not(target).hide();
        // $('.tab-content > div').is(target).show();
        if(target === '#DashBoard') {
          document.getElementById('DashBoard').style.display = 'block';
          document.getElementById('Profile').style.display = 'none';
        } else {
          document.getElementById('Profile').style.display = 'block';
          document.getElementById('DashBoard').style.display = 'none';
        }
        
        // $(target).fadeIn(600);
        
      });