'use strict'

// Загружаем плагин google.charts
// Плагин отрисовывает поле для графика
// Настройки графика graph_options вынесены в файл graph-options.js

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(graphics.drawBasic);

// Чтобы отрисовать графики нужно поменять graphics.chartData и перезапустить graphics.drawBasic()

// ========================================

document.getElementById('start').onclick = function() {

  // 0. Убираем класс ошибки из полей ввода
  Input.clearErrorFields();

  // 1. Получаем данные из анкеты. Если в данных ошибка - отменяем выполнение функции. 
  let input = new Input(); 
  if (input.dataError) {
    input.dataError = false;
    graphics.drawEmptyField();
    return;
  } 

  // 2. Создаем объект клиента:
  let client = new Client(input);

  // Cчитаем расклад по месяцам на период до возраста... ну пусть до 100 лет
  // на выходе имеем массив объектов months
  let period = 100 * 12 - client.age;
  let months = Month.makeMonthsArr(period, client);

  // Создаем объект с методами, извлекающими из нашего массива объектов months полезную инофрмацию для графика
  let data = new Data(months);

  // Формируем массив данных для передачи графику. 
  // сейчас функция data.getFunds останавливает вычисления, когда значение опускается ниже - 100 тыс.

  let funds = data.getFunds(client);

  // Полученный массив funds передаем графику и строим этот график.active
    graphics.chartData = funds;
    graphics.drawBasic(); 
  
//debugger
}



