
// объект с методами для отрисовки графиков

let graphics = {
  // Массив данных для отрисовки трех графиков
   chartData: [
    [0, null, null, null], [1, null, null, null], [2, null, null, null], [3, null, null, null], [4, null, null, null], [5, null, null, null],
    [6, null, null, null], [7, null, null, null], [8, null, null, null], [9, null, null, null], [10, null, null, null]
  ],

  drawBasic() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Накопления');
    data.addColumn('number', 'Data 2');// добавляем новые графики,  
    data.addColumn('number', 'Data 3');// в подмассивах chartData должно быть столько же членов
     
    data.addRows(graphics.chartData);
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, graph_options);
  },

  drawEmptyField() {
    graphics.chartData = [
      [0, null, null, null], [1, null, null, null], [2, null, null, null], [3, null, null, null], [4, null, null, null], [5, null, null, null],
      [6, null, null, null], [7, null, null, null], [8, null, null, null], [9, null, null, null], [10, null, null, null]
    ];
  
    graphics.drawBasic();
  }
  
}

// Класс для создания объекта с методами для считывания и приведения данных с форм на странице
class Input {  
  constructor() { 
    let fieldName = document.getElementById("inquiry-name");
    let fieldBirthday = document.getElementById("inquiry-birthday");
    let fieldRetiredAge = document.getElementById("inquiry-retired");
    let fieldRetiredPension = document.getElementById("inquiry-income");
    let fieldRetiredCharge = document.getElementById("inquiry-payment");
    let fieldInflation = document.getElementById('generalData-inflationRate');
    let fieldUSDrate = document.getElementById('generalData-USDrate');
    let fieldEURrate = document.getElementById('generalData-EURrate');
    let fieldAssets_1 = document.getElementById('assets-title');
    let fieldAssets_2 = document.getElementById('assets-value');
    let fieldAssets_3 = document.getElementById('assets-increase');
    let fieldAssets_4 = document.getElementById('assets-decrease');
    let fieldAssets_5 = document.getElementById('assets-closure');
    let workFundIncrease_zero = document.getElementById("inquiry-fundWorkIncrease-zero");
    let workFundIncrease_inflation = document.getElementById("inquiry-fundWorkIncrease-inflation");
    let workFundIncrease_given = document.getElementById("inquiry-fundWorkIncrease-given");
    let retireFundIncrease_zero = document.getElementById("inquiry-fundRetireIncrease-zero");
    let retireFundIncrease_inflation = document.getElementById("inquiry-fundRetireIncrease-inflation");
    let retireFundIncrease_given = document.getElementById("inquiry-fundRetireIncrease-given");
    let retiredPensionTakeStart = document.getElementById('inquiry-incomeTakeStart');
    let retiredPensionTakeEnd = document.getElementById('inquiry-incomeTakeEnd');
    let retiredChagrePayStart = document.getElementById('inquiry-paymentAtStart');
    let retiredChagrePayEnd = document.getElementById('inquiry-paymentAtEnd');
    let fundIncreaseMonth = document.getElementById('inquiry-increaseMonth');
    let fundIncreaseQuarter = document.getElementById('inquiry-increaseQuarter');
    let fundIncreaseHalfYear = document.getElementById('inquiry-increaseHalfYear');
    let fundIncreaseYear = document.getElementById('inquiry-increaseYear');

    this.dataError = false;

    this.name = fieldName.value.split(' ');
    if (this.name[0] == undefined || this.name[0] == '' || this.name[1] == undefined || this.name[1] == '') {
      this.dataError = true;
      fieldName.classList.add('error');
      document.querySelector("label[for='inquiry-name']").classList.add("error");
    }

    this.birthdayArr = fieldBirthday.value.split('.');
    if (isNaN(this.birthdayArr[0]) ||isNaN(this.birthdayArr[1]) || isNaN(this.birthdayArr[2]) || 
    this.birthdayArr[0] <= 0 || this.birthdayArr[0] > 31 || 
    this.birthdayArr[1] <= 0 || this.birthdayArr[1] > 12 || 
    this.birthdayArr[2] <= 0 || this.birthdayArr[2].length != 4) {
      this.dataError = true;
      fieldBirthday.classList.add('error');
      document.querySelector("label[for='inquiry-birthday']").classList.add("error");
    }

    this.retiredAge = parseInt(fieldRetiredAge.value) * 12;
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth(); // нумерация месяцев начинается с нуля!!!

    let ageMonths = 12 - +this.birthdayArr[1] + 12 * (thisYear - +this.birthdayArr[2] - 1) + +thisMonth + 2;
    if (isNaN(this.retiredAge) || ageMonths >= this.retiredAge) {
      this.dataError = true;
      fieldRetiredAge.classList.add('error');
      document.querySelector("label[for='inquiry-retired']").classList.add("error");
    }

    this.retiredPension = parseInt(fieldRetiredPension.value); 
    if (isNaN(this.retiredPension)) {
      this.dataError = true;
      fieldRetiredPension.classList.add('error');
      document.querySelector("label[for='inquiry-income']").classList.add("error");
    }

    if (retiredPensionTakeStart.checked) this.retiredPensionTaken = 'start';
    if (retiredPensionTakeEnd.checked) this.retiredPensionTaken = 'end';

    this.retiredCharge = parseInt(fieldRetiredCharge.value); 
    if (isNaN(this.retiredCharge)) {
      this.dataError = true;
      fieldRetiredCharge.classList.add('error');
      document.querySelector("label[for='inquiry-payment']").classList.add("error");
    }

    if (retiredChagrePayStart.checked) this.retiredChargePaid = 'start';
    if (retiredChagrePayEnd.checked) this.retiredChargePaid = 'end';

    this.inflation = parseFloat(fieldInflation.value);
    this.USDrate = parseFloat(fieldUSDrate.value);
    this.EURrate = parseFloat(fieldEURrate.value);

    if (fieldAssets_1.value != 0 || fieldAssets_2.value != 0 || fieldAssets_3.value != 0 || fieldAssets_4.value != 0 || fieldAssets_5.value != 0) {
      this.dataError = true;
      let fields = document.querySelectorAll('.fieldAssets');
      for (let i of fields) {
        i.classList.add("error");
      }  
    }

    this.assets = Input.newAssetsArr;
   
    if (workFundIncrease_zero.checked == true) {this.workFundIncrease = 0;}
    else if (workFundIncrease_inflation.checked == true) {this.workFundIncrease = this.inflation;}
    else this.workFundIncrease = parseFloat(workFundIncrease_given.value);
    if (isNaN(this.workFundIncrease)) {
      this.dataError = true;
      document.querySelector('.inquiry-workFieldset').classList.add('error');
    }

    if (retireFundIncrease_zero.checked == true) {this.retireFundIncrease = 0;}
    else if (retireFundIncrease_inflation.checked == true) {this.retireFundIncrease = this.inflation;}
    else this.retireFundIncrease = parseFloat(retireFundIncrease_given.value);
    if (isNaN(this.retireFundIncrease)) {
      this.dataError = true;
      document.querySelector('.inquiry-retireFieldset').classList.add('error');
    }

    if (fundIncreaseMonth.checked == true) { this.fundIncreaseRate = 'month'; }
    if (fundIncreaseQuarter.checked == true) { this.fundIncreaseRate = 'quarter'; }
    if (fundIncreaseHalfYear.checked == true) { this.fundIncreaseRate = 'halfYear'; }
    if (fundIncreaseYear.checked == true) { this.fundIncreaseRate = 'year'; }
  }

  // Временная заглушка. 
  get initialFund() {
    return 0;
  }

  static clearErrorFields() {
    let fields = document.querySelectorAll(".error");
    for (let i of fields) {
      i.classList.remove("error");
    }
  }

  static clearAssetsRadios() {
    document.getElementById('assets-inflationIncrease').checked = false;
    document.getElementById('assets-inflationDecrease').checked = false;
  }
  static clearValueChange() {
    document.getElementById('assets-decrease').value = '';
    document.getElementById('assets-increase').value = '';
    document.getElementById('assets-decrease').classList.remove('error');
    document.getElementById('assets-increase').classList.remove('error');
  }
  static ifDecreaseEntered() {
    let fieldDecrease = document.getElementById('assets-decrease');
    let fieldIncrease = document.getElementById('assets-increase');
    if (fieldDecrease.value.trim() != '') {
      fieldIncrease.classList.add('error');
      fieldDecrease.classList.add('error');
    }
    if (fieldIncrease.value.trim() == '') {
      fieldIncrease.classList.remove('error');
      fieldDecrease.classList.remove('error');
    }
  }
  static ifIncreaseEntered() {
    let fieldDecrease = document.getElementById('assets-decrease');
    let fieldIncrease = document.getElementById('assets-increase');
    if (fieldIncrease.value.trim() != "") {
      fieldIncrease.classList.add('error');
      fieldDecrease.classList.add('error');
    }
    if (fieldDecrease.value.trim() == "") {
      fieldIncrease.classList.remove('error');
      fieldDecrease.classList.remove('error');
    }
  }

  static newAssetsArr = [];

  static listAssets(assetObjsArr) {
    let paragraphs = document.querySelectorAll('.assets>p');
    if(paragraphs[0] != undefined) {
      for (let i of paragraphs) {
        i.remove();
      }
    }
    for (let assetObj of assetObjsArr) {
      let valueChangeRateStr;
      if(assetObj.valueChangeRate == 'month') {valueChangeRateStr = 'раз в месяц'};
      if(assetObj.valueChangeRate == 'quarter') {valueChangeRateStr = 'раз в квартал'};
      if(assetObj.valueChangeRate == 'halfYear') {valueChangeRateStr = 'раз в полгода'};
      if(assetObj.valueChangeRate == 'year') {valueChangeRateStr = 'раз в год'};

      let closureDateStr = 'НЕТ';
      if (assetObj.closureDateArr != null) {
        closureDateStr = assetObj.closureDateArr[0] + '.' + assetObj.closureDateArr[1];
      }

      let valueToStr;
      if (assetObj.valueChangeTo == 'value') valueToStr = "начисления увеличивают стоимость актива";
      if (assetObj.valueChangeTo == 'fund') valueToStr = "начисления выводятся в фонд";

      let includingLastMonthStr = '';
      if (assetObj.closeAt == 'start') includingLastMonthStr = ' в начале месяца';
      if (assetObj.closeAt == 'end') includingLastMonthStr = ' в конце месяца';

      let incomeChangeRateStr;
      if (assetObj.incomeChangeRate == 'year') {incomeChangeRateStr = 'год'};
      if (assetObj.incomeChangeRate == '2_years') {incomeChangeRateStr = '2 года'};
      
      let str = `Актив: <b>${assetObj.title}</b>, Сумма/Стоимость: <b>${assetObj.value}</b> <b>${assetObj.currencyType}</b>, Ставка: <b>${assetObj.valueChange}%</b>, Капитализация: <b>${valueChangeRateStr}</b>, <b>${valueToStr}</b>,<br>Дата закрытия: <b>${closureDateStr}${includingLastMonthStr}</b>, Доход/мес: <b>${assetObj.income}</b> <b>${assetObj.currencyType}</b>, Динамика дохода: <b>${assetObj.incomeChange}</b>% / <b>${incomeChangeRateStr}</b>`;
      let paragraph = document.createElement('p');
      paragraph.innerHTML = str;
      document.querySelector('#assets-addAsset').after(paragraph);
    }
  }

  static clearFundIncreaseRadiosWork() {
    document.getElementById("inquiry-fundWorkIncrease-zero").checked = false;
    document.getElementById("inquiry-fundWorkIncrease-inflation").checked = false;
  }

  static clearFundIncreaseRadiosRetire() {
    document.getElementById("inquiry-fundRetireIncrease-zero").checked = false;
    document.getElementById("inquiry-fundRetireIncrease-inflation").checked = false;
  }

  static clearFundWorkIncreaseGiven() {
    document.getElementById("inquiry-fundWorkIncrease-given").value = '';
  }

  static clearFundRetireIncreaseGiven() {
    document.getElementById("inquiry-fundRetireIncrease-given").value = '';
  }
  
};

// Объект с методами, формирующими объекты/массивы, 
// описывающиt все факторы прихода/расхода (т.е. пенсионный взнос, зарплаты, траты и пр.)
let assets = {
  retiredChargeObj (retiredChagre, retiredChargePaid, retiredAge, currentAge, startPaymentMonth=1) {
    let answer = {};
    answer.amount = retiredChagre;
    answer.inAction = [];
    let duration = retiredAge - currentAge;

    for (let i = startPaymentMonth; i <= duration; i++) {
      answer.inAction.push(i);
    }

    answer.paidAt = retiredChargePaid;

    return answer;
  },

  fieldErrorFlag: false,

  addAsset() {
    let titleFieldLabel = document.getElementById("assets-titleLabel");
    let titleField = document.getElementById('assets-title');
    let valueFieldLabel = document.getElementById('assets-valueLabel');
    let valueField = document.getElementById('assets-value');
    let increaseFieldLabel = document.getElementById('assets-increaseLabel');
    let increaseField = document.getElementById('assets-increase');
    let decreaseFieldLabel = document.getElementById('assets-decreaseLabel');
    let decreaseField = document.getElementById('assets-decrease');
    let increaseInflation = document.getElementById("assets-inflationIncrease");
    let decreaseInflation = document.getElementById("assets-inflationDecrease");
    let valueChangeToValueField = document.getElementById("assets-increaseToValue");
    let valueChangeToFundField = document.getElementById("assets-increaseToFund");
    let closureDateField = document.getElementById('assets-closure');
    let closeAtStart = document.getElementById('assets-closeAtStart');
    let closeAtEnd = document.getElementById('assets-closeAtEnd');
    let currencyType = document.getElementById('assets-currencyType');
    let assetIncomeField = document.getElementById('assets-income');
    let assetIncomeChangeField = document.getElementById('assets-incomeChange');
    let assetIncomeChangeRate = document.getElementById('assets-incomeChangeRate');
    let assetIncomeChangeInflation = document.getElementById('assets-incomeChangeRateInflation');
    let assetIncreaseMonth = document.getElementById('assets-increaseMonth');
    let assetIncreaseQuarter = document.getElementById('assets-increaseQuarter');
    let assetIncreaseHalfYear = document.getElementById('assets-increaseHalfYear');
    let assetIncreaseYear = document.getElementById('assets-increaseYear');

    let inflationRateField = document.getElementById('generalData-inflationRate');

    let errorFields = document.querySelectorAll('.assets .error');
    
      for (let i of errorFields) {
        i.classList.remove('error');
      }
    
    if(increaseField.value != 0 && decreaseField.value != 0) assets.fieldErrorFlag = true;
    if (titleField.value == '') {
      assets.fieldErrorFlag = true;
      titleFieldLabel.classList.add('error');
      titleField.classList.add('error');
    };
    if (!parseInt(valueField.value) && parseInt(valueField.value) != 0) { 
      valueFieldLabel.classList.add('error');
      valueField.classList.add('error');      
      assets.fieldErrorFlag = true;      
    }

    let answer = {};
    answer.title = titleField.value;
    answer.value = parseInt(valueField.value);
    
    if (increaseField.value.trim() != '' && decreaseField.value.trim() != '') {
      assets.fieldErrorFlag = true; 
      increaseFieldLabel.classList.add('error');
      increaseField.classList.add('error');
      decreaseFieldLabel.classList.add('error');
      decreaseField.classList.add('error');
    }
    if (increaseField.value.trim() != '') answer.valueChange = parseFloat(increaseField.value);
    if (decreaseField.value.trim() != '') answer.valueChange = parseFloat(decreaseField.value) * (-1);
    if (increaseInflation.checked == true) answer.valueChange = parseFloat(inflationRateField.value);
    if (decreaseInflation.checked == true) answer.valueChange = parseFloat(inflationRateField.value) * (-1);
    if (isNaN(answer.valueChange)) {
      increaseFieldLabel.classList.add('error');
      increaseField.classList.add('error');
      decreaseFieldLabel.classList.add('error');
      decreaseField.classList.add('error');
      assets.fieldErrorFlag = true;
    }

    if (valueChangeToValueField.checked == true) answer.valueChangeTo = 'value';
    if (valueChangeToFundField.checked == true) answer.valueChangeTo = 'fund';

    if (assetIncreaseMonth.checked) answer.valueChangeRate = 'month';
    if (assetIncreaseQuarter.checked) answer.valueChangeRate = 'quarter';
    if (assetIncreaseHalfYear.checked) answer.valueChangeRate = 'halfYear';
    if (assetIncreaseYear.checked) answer.valueChangeRate = 'year';

    if (closureDateField.value.trim() == '') answer.closureDateArr = null;
    else {
      let closureDate = closureDateField.value.split('.');
      if (closureDate[2] != undefined) {
        closureDate.shift();
      }
      closureDate[0] = +closureDate[0];
      closureDate[1] = +closureDate[1]; 
      if (isNaN(closureDate[0]) || closureDate[0] > 12 || closureDate[0] <= 0 || isNaN(closureDate[1]) || closureDate[1] < new Date().getFullYear()) {
        closureDateField.classList.add('error');
        assets.fieldErrorFlag = true;
      }
      answer.closureDateArr = closureDate; 
    }

    if (closeAtStart.checked == true) answer.closeAt = 'start';
    if (closeAtEnd.checked == true) answer.closeAt = 'end';    
    
    answer.inAction = 'all';
    if (answer.closureDateArr) {
      let today = new Date();
      let thisYear = today.getFullYear();
      let thisMonth = today.getMonth();
      let subtractOne = 0;
      if (answer.closeAt == 'start') {subtractOne = 1;}
      let lastDate = new Date(answer.closureDateArr[1], answer.closureDateArr[0] - 1 - subtractOne);
      let inActionArr = [];
      let i = 1; // если есть дата начала, то начинаем с нее, не с единицы 
      while(true) { 
        if ( new Date(thisYear, thisMonth + i) > lastDate ) break;
        inActionArr.push(i);
        i++;
      }
      answer.inAction = inActionArr;
    }
      
    answer.currencyType = currencyType.value;

    answer.income = parseInt(assetIncomeField.value);
    if (isNaN(answer.income)) {
      assetIncomeField.classList.add('error');
      assets.fieldErrorFlag = true;
    }

    answer.incomeChange = parseFloat(assetIncomeChangeField.value);
    if (isNaN(answer.incomeChange) && assetIncomeChangeInflation.checked == false) {
      assetIncomeChangeField.classList.add('error');
      assets.fieldErrorFlag = true;
    }

    answer.incomeChangeRate = assetIncomeChangeRate.value;

    if (assets.fieldErrorFlag) {
      assets.fieldErrorFlag = false;
      return false;
    }

    Input.newAssetsArr.push(answer);

    titleField.value = '';
    valueField.value = '';
    increaseField.value = '';
    decreaseField.value = '';
    increaseInflation.checked = false;
    decreaseInflation.checked = false;
    closureDateField.value = '';
    closeAtStart.checked = true;
    currencyType.value = 'rub';
    assetIncomeField.value = 0;
    assetIncomeChangeField.value = '0%';
    assetIncomeChangeRate.value = 'year';
    assetIncreaseYear.checked = true;
    closeAtStart.disabled = true;
    closeAtStart.checked = false;
    closeAtEnd.disabled = true;
    assetIncomeChangeInflation.checked == false;

    return answer;
  },
}

// Класс для создания объектов клиентов
class Client {
  constructor(input) {
    this.name = input.name;
    this.birthdayArr = input.birthdayArr; // строка в формате ДД.ММ.ГГГ
    this.retiredAge = input.retiredAge;
    this.retiredPension = input.retiredPension;
    this.retiredPensionTaken = input.retiredPensionTaken;
    this.retiredCharge = assets.retiredChargeObj(input.retiredCharge, input.retiredChargePaid, this.retiredAge, this.age);
    this._initialFund = input.initialFund;
    this.assets = input.assets;
    this.workFundIncrease = input.workFundIncrease;
    this.retireFundIncrease = input.retireFundIncrease;
    this.fundIncreaseRate = input.fundIncreaseRate;
    this.EURrate = input.EURrate;
    this.USDrate = input.USDrate;
  }

  get birthdayObj() {
    let dayMonthYear = this.birthdayArr;
    let date = dayMonthYear[0];
    let month = dayMonthYear[1] - 1;
    let year = dayMonthYear[2];
    return new Date(year, month, date);
  }

  get age() {
    let today = new Date();
    // Вроде более точный способ посчитать возраст в месяцах
    let ageMonths = 12 - +this.birthdayArr[1] + 12 * (today.getFullYear() - +this.birthdayArr[2] - 1) + +today.getMonth() + 2;
    //let ageNum = today - this.birthdayObj; // Возраст в миллисекундах
    //let ageMonths =  Math.round(ageNum / (1000 * 60 * 60 * 24 * 30.45)); // Возраст в месяцах    
    return ageMonths;
  }

  get initialFund() {
    return this._initialFund;
  }
  
  get monthsToRetire() {
    return (this.retiredAge - this.age);
  }

  getData(period) {
    return Month.makeMonthsArr(period, this)
  }
}

// Класс для создания объектов "месяц" и создания массивов из этих объектов
class Month {
  constructor(number, previousFund, previousDateObj, client) {
    this._number = number;
    this.date = new Date(previousDateObj.getFullYear(), (previousDateObj.getMonth() + 1));
    this.toAddToNextFundStart = 0; // вспомогательное свойство - буфер, из которого добавлять к фонду начала след. месяца
        
    //вычисляемые свойства:
    let ifRetired = this.number > (client.retiredAge - client.age);
    
    //процентная ставка для текущего месяца
    if(!ifRetired) {this.fundIncreasePersent = client.workFundIncrease;}
    if(ifRetired) {this.fundIncreasePersent = client.retireFundIncrease;}

    this.fundStart = previousFund;
    if (Month.monthsArr[this.number - 2]) {
      this.fundStart += Month.monthsArr[this.number - 2].toAddToNextFundStart;
    }

    if (client.retiredCharge.inAction.includes(this.number) && client.retiredCharge.paidAt == 'start') {
      this.fundStart += client.retiredCharge.amount;
    }
  
    if (ifRetired && client.retiredPensionTaken == 'start') {
      this.fundStart -= client.retiredPension;      
    }

    for (let assetObj of client.assets) { 
      // перебираем массив объектов assets. Чтобы добавить сумму, если она будет внесена в начале месяца через Активы

      if (assetObj.inAction.length == 0 && assetObj.value > 0 && (this.date.getMonth() + 1) == assetObj.closureDateArr[0] && this.date.getFullYear() == assetObj.closureDateArr[1]) {
        this.fundStart += Month.exchangeToRubs(assetObj, assetObj.value); 
      }
    }  

// --------------fundEnd computed---(no fundStart change allowed------------
    this.fundEnd = this.fundStart;
    if (client.retiredCharge.inAction.includes(this.number) && client.retiredCharge.paidAt == 'end') {
      this.fundEnd += client.retiredCharge.amount;
    }
    if (ifRetired && client.retiredPensionTaken == 'end') {
      this.fundEnd -= client.retiredPension;
    }

    
    //Вычисляем суммы начислений по процентам на пенсионные сбережения
    // две вспомогательные функциии
    function getMonthDelta(month) {
      return ((month.fundIncreasePersent / 100) * month.daysInMonth / month.daysInYear) * month.fundStart;
    }

    function getTotalFundIncrease(monthsNum, currentThis) {
      let totalFundIncreaseSum = 0;
      for (let i = monthsNum; i > 1; i--) {
        let currentMonth = Month.monthsArr[currentThis.number - i];
        totalFundIncreaseSum += getMonthDelta(currentMonth);
      }
      totalFundIncreaseSum += getMonthDelta(currentThis);
      return totalFundIncreaseSum;
    }
    //--------------------------------------------
    if (client.fundIncreaseRate == 'month') {
      let fundIncreaseSum = getMonthDelta(this);
      this.fundEnd += fundIncreaseSum;    
    }

    if (client.fundIncreaseRate == 'quarter' && this.number % 3 == 0) {
      let currentThis = this;
      let fundIncreaseSum = getTotalFundIncrease(3, currentThis);
      this.fundEnd += fundIncreaseSum;      
    }

    if (client.fundIncreaseRate == 'halfYear' && this.number % 6 == 0) {
      let currentThis = this;
      let fundIncreaseSum = getTotalFundIncrease(6, currentThis);
      this.fundEnd += fundIncreaseSum;  
    }

    if (client.fundIncreaseRate == 'year' && this.number % 12 == 0) {
      let currentThis = this;
      let fundIncreaseSum = getTotalFundIncrease(12, currentThis);
      this.fundEnd += fundIncreaseSum;  
    }


    // Вычисляем начисления по активам и общую стоимость активов
    let totalAssetsValueAtStart = 0;
    let totalAssetsValueAtEnd = 0;
    for (let assetObj of client.assets) { 
      // перебираем массив объектов. assetObj - объект со всеми свойствами актива
      if (!assetObj.inAction.includes(this.number) && assetObj.inAction != 'all') continue;

      totalAssetsValueAtStart += assetObj.value;

      // функции для расчета прироста по вкладу за период
      function getMonthValueChange(month) {
        return assetObj.value * assetObj.valueChange * month.daysInMonth / month.daysInYear / 100;
      }
      function getTotalValueChange(monthsNum, currentThis) {
        let answer = 0;
        for (let i = monthsNum; i > 1; i--) {
          let currentMonth = Month.monthsArr[currentThis.number - i];
          answer += getMonthValueChange(currentMonth);
        }
        answer += getMonthValueChange(currentThis);
        return answer;
      }

      function transferMoney(sum, month) {
        if (assetObj.valueChangeTo == 'value') {
          assetObj.value += sum;
         }
        if (assetObj.valueChangeTo == 'fund') {
          sum = Month.exchangeToRubs(assetObj, sum);
          month.fundEnd += sum;
         }
      } 

      if (assetObj.valueChangeRate == 'month') {
        let valueChangeSum = getMonthValueChange(this);
        transferMoney(valueChangeSum, this);
      }

      if (assetObj.valueChangeRate == 'quarter' && this.number % 3 == 0) {
        let totalValueChangeSum = getTotalValueChange(3, this);
        transferMoney(totalValueChangeSum, this);
      }

      if (assetObj.valueChangeRate == 'halfYear' && this.number % 6 == 0) {
        let totalValueChangeSum = getTotalValueChange(6, this);
        transferMoney(totalValueChangeSum);
      }

      if (assetObj.valueChangeRate == 'year' && this.number % 12 == 0) {
        let totalValueChangeSum = getTotalValueChange(12, this);
        transferMoney(totalValueChangeSum);
      }
     
      //Если последни месяц инЭкшн, снимаем деньги и переводим в фонд, пересчитав их на рубли с валюты
      if (!assetObj.inAction.includes(this.number + 1) && assetObj.inAction != 'all') {
        let totalSum = assetObj.value;
        totalSum = Month.exchangeToRubs(assetObj, totalSum);
        if (assetObj.closeAt == 'end') {          
          this.fundEnd += totalSum;
        }
        if (assetObj.closeAt == 'start') { 
          this.toAddToNextFundStart += totalSum;
        }
      }

      // Вычисляем доход по активам
      function incomeChange(years, month) {
        if (month.number != 1 && month.number % (12 * years) == 1) {
          assetObj.income += assetObj.income * assetObj.incomeChange / 100;
        }
      }
      // считаем изменение дохода на указанный процент раз в указанный период
      if (assetObj.incomeChangeRate == 'year') {
        incomeChange(1, this);
      }

      if (assetObj.incomeChangeRate == '2_years') {
        incomeChange(2, this);
      }

      if (assetObj.incomeChangeRate == '3_years') {
        incomeChange(3, this);
      }
      // Добавляем доход к fundEnd
      let incomeInRubs = Month.exchangeToRubs(assetObj, assetObj.income);
      this.fundEnd += incomeInRubs;

      totalAssetsValueAtEnd += assetObj.value;
    }

    this.capitalStart = this.fundStart + totalAssetsValueAtStart;
    this.capitalEnd = this.fundEnd + totalAssetsValueAtEnd;

  } 
  

  get number() {return this._number};

  get daysInMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  }

  get daysInYear() {
    let lastFebDate = new Date(this.date.getFullYear(), 2, 0).getDate();
    if (lastFebDate == 29) return 366;
    if (lastFebDate == 28) return 365;
  }

  // Статические методы и свойства:
  static makeMonthsArr(period, client) {
    this.monthsArr = [];
    let today = new Date()
    // let previousDateObj = new Date(today.getFullYear(), (today.getMonth() - 1));
    let previousDateObj = new Date(today.getFullYear(), today.getMonth());
    let firstMonth = new this(1, client.initialFund, previousDateObj, client); 
    this.monthsArr.push(firstMonth);
    
    for (let i = 2; i <= period; i++) {
      let lastMonth = this.monthsArr[this.monthsArr.length - 1];
      let newMonth = new this(i, lastMonth.fundEnd, lastMonth.date, client);
      this.monthsArr.push(newMonth);
    }

    return this.monthsArr;
  }

  static exchangeToRubs(assetObj, sum) {
    if(assetObj.currencyType == 'eur') {
      return sum * client.EURrate;
    }
    if (assetObj.currencyType == 'usd') {
      return sum * client.USDrate;
    }
    if (assetObj.currencyType == 'rub') {
      return sum;
    }
  }
}

// Класс для создния объекта с методами, подготавливающими данные для построения графика
class Data {
  constructor(arrOfObjs) {
    this.source = arrOfObjs;
    this.maxLength = arrOfObjs.length;
  }

  getEndFunds(client) {
    let answer = [];

    answer.push([0, client.initialFund, null, null]);

    for (let i = 1; i <= this.maxLength; i++) {
      let fundAmount = this.source[i-1].fundEnd;
      if (fundAmount < 0) break;
      let monthFund = [i, fundAmount, null, null];
      answer.push(monthFund);
    }
    return answer;
  }
}