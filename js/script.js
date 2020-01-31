'use strict'

// Загружаем плагин google.charts
// Плагин отрисовывает поле для графика
// Настройки графика graph_options вынесены в файл graph-options.js

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Data 1');
  data.addColumn('number', 'Data 2');// добавляем новые графики,  
  data.addColumn('number', 'Data 3');// в подмассивах chartData должно быть столько же членов
   
  data.addRows(chartData);
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, graph_options);
}

// Массив данных для отрисовки трех графиков
let chartData = [
  [0, null, null, null], [1, null, null, null], [2, null, null, null], [3, null, null, null], [4, null, null, null], [5, null, null, null],
  [6, null, null, null], [7, null, null, null], [8, null, null, null], [9, null, null, null], [10, null, null, null]
];

// Теперь чтобы отрисовать графики нужно поменять chartData и перезапустить drawBasic()

// ========================================

// 1. Получаем данные из анкеты 
let input = new Input();

// 2. Создаем объект клиента:
let client = new Client(input.name, input.birthday, input.retiredAge, input.retiredPension, input.retiredCharge);

// СДЕЛАТЬ В Month ПРОЦЕДУРУ ВЫЧИСЛЕНИЯ retiredCharge