'use strict'

google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic); // это запускает отрисовку при загрузке

function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Amount');
  // Чтобы добавить еще один график, добавляем колонки
  // data.addColumn('number', 'New');
  // И в каждом подмассиве data добавляем третий показатель - координаты нового графика
  
  data.addRows(chartData);

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

  chart.draw(data, options);

}
