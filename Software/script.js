google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      let data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'User');

      data.addRows([
        
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