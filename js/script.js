'use strict'

// Для отладки выводим в область видимости:
let monthsToSee;
let dataToSee;

// Загружаем плагин google.charts
// Плагин отрисовывает поле для графика
// Настройки графика graph_options вынесены в файл graph-options.js

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(graphics.drawBasic);

// Чтобы отрисовать графики нужно поменять graphics.chartData и перезапустить graphics.drawBasic()

// ========================================

// 0. Устанавливаем логику поведения для полей ввода и кнопок
{ document.getElementById('assets-increase').onfocus = function() {
    Input.clearAssetsRadios();
  }
  document.getElementById('assets-increase').oninput = function() {
    Input.ifDecreaseEntered();
  }
  document.getElementById('assets-decrease').onfocus = function() {
    Input.clearAssetsRadios();
  }
  document.getElementById('assets-decrease').oninput = function() {
    Input.ifIncreaseEntered();
  }
  document.getElementById('assets-inflationIncrease').onfocus = function() {
    Input.clearValueChange();
  }
  document.getElementById('assets-inflationDecrease').onfocus = function() {
    Input.clearValueChange();
  }

  document.getElementById('assets-addAsset').onclick = function() { 
    if (!assets.addAsset()) return; 
    Input.listAssets(Input.newAssetsArr);
  };

  document.getElementById('assets-closure').oninput = function() {
    let closeAtStartField = document.getElementById('assets-closeAtStart');
    let closeAtEndField = document.getElementById('assets-closeAtEnd');
    if (document.getElementById('assets-closure').value != '') {
      closeAtStartField.disabled = false;
      closeAtStartField.checked = true;
      closeAtEndField.disabled = false;
    }
    else {
      closeAtStartField.disabled = true;
      closeAtStartField.checked = false;
      closeAtEndField.disabled = true;  
    }    
  };

  document.getElementById('assets-incomeChangeRateInflation').onclick = function () {
    let checkbox = document.getElementById('assets-incomeChangeRateInflation');
    let changeField = document.getElementById('assets-incomeChange');
    let changeRateField = document.getElementById('assets-incomeChangeRate');
    if (checkbox.checked == true) {
      changeField.value = document.getElementById('generalData-inflationRate').value;
      changeField.disabled = true;
      changeRateField.value = 'year';
      changeRateField.disabled = true;
    }
    else {
      changeField.value = '0%';
      changeField.disabled = false;
      changeRateField.value = 'year';
      changeRateField.disabled = false;
    }
  }

  document.getElementById("inquiry-fundWorkIncrease-given").onclick = function() {
    Input.clearFundIncreaseRadiosWork();
  };

  document.getElementById("inquiry-fundRetireIncrease-given").onclick = function() {
    Input.clearFundIncreaseRadiosRetire();
  };

  document.getElementById("inquiry-fundWorkIncrease-zero").onfocus = function() {
    Input.clearFundWorkIncreaseGiven();
  }
  document.getElementById("inquiry-fundWorkIncrease-inflation").onfocus = function() {
    Input.clearFundWorkIncreaseGiven();
  }

  document.getElementById("inquiry-fundRetireIncrease-zero").onfocus = function() {
    Input.clearFundRetireIncreaseGiven();
  }
  document.getElementById("inquiry-fundRetireIncrease-inflation").onfocus = function() {
    Input.clearFundRetireIncreaseGiven();
  }
}

document.getElementById('start').onclick = function() {

  // 1. Убираем класс ошибки из полей ввода
  Input.clearErrorFields();

  // 2. Получаем данные из анкеты. Если в данных ошибка - отменяем выполнение функции. 
  let input = new Input(); 
  if (input.dataError) {
    input.dataError = false;
    graphics.drawEmptyField();
    return;
  } 
  
  // 3. Создаем объект клиента:
  let client = new Client(input);

  // 4. Cчитаем расклад по месяцам на период до возраста... ну пусть до 100 лет
  // на выходе имеем массив объектов months
  let period = 100 * 12 - client.age;

  let months = client.getData(period);

  monthsToSee = months; // Временно для отладки

  // 5. Создаем объект с методами, извлекающими из нашего массива объектов months полезную инофрмацию для графика
  let data = new Data(months);

  // 6. Формируем массив данных для передачи графику. 

  //let funds = data.getEndFunds();
  let fundsAndCapital = data.getFundAndCapital();

  dataToSee = fundsAndCapital; // Временно для отладки


  // 7. Полученный массив funds передаем графику и строим этот график.active
    // graphics.chartData = funds;
    graphics.chartData = fundsAndCapital;
    graphics.drawBasic(); 
  // debugger
}



