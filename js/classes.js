
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
    //Input.newAssetsArr = [];

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
    if (fieldDecrease.value != 0) {
      fieldIncrease.classList.add('error');
      fieldDecrease.classList.add('error');
    }
    if (fieldIncrease.value == 0) {
      fieldIncrease.classList.remove('error');
      fieldDecrease.classList.remove('error');
    }
  }
  static ifIncreaseEntered() {
    let fieldDecrease = document.getElementById('assets-decrease');
    let fieldIncrease = document.getElementById('assets-increase');
    if (fieldIncrease.value != 0) {
      fieldIncrease.classList.add('error');
      fieldDecrease.classList.add('error');
    }
    if (fieldDecrease.value == 0) {
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
      let str = `Актив: <b>${assetObj.title}</b>, Сумма/Стоимость: <b>${assetObj.value}</b>, Ставка: <b>${assetObj.valueChange}%</b>, Дата закрытия: <b>${assetObj.closureDateArr[0]}.${assetObj.closureDateArr[1]}</b><br>`;
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

  addAsset() {
    let titleField = document.getElementById('assets-title');
    let valueField = document.getElementById('assets-value');
    let increaseField = document.getElementById('assets-increase');
    let decreaseField = document.getElementById('assets-decrease');
    let increaseInflation = document.getElementById("assets-inflationIncrease");
    let decreaseInflation = document.getElementById("assets-inflationDecrease");
    let closureDateField = document.getElementById('assets-closure');
    let inflationRateField = document.getElementById('generalData-inflationRate');

    valueField.classList.remove('error');
    increaseField.classList.remove('error');
    decreaseField.classList.remove('error');
    closureDateField.classList.remove('error');

    if(increaseField.value != 0 && decreaseField.value != 0) return false;
    if (titleField.value == 0) return false;
    if (!parseInt(valueField.value)) { 
      valueField.classList.add('error');
      return false;
    }

    let answer = {};
    answer.title = titleField.value;
    answer.value = parseInt(valueField.value);
    
    if (increaseField.value != 0) answer.valueChange = parseFloat(increaseField.value);
    if (decreaseField.value != 0) answer.valueChange = parseFloat(decreaseField.value) * (-1);
    if (increaseInflation.checked == true) answer.valueChange = parseFloat(inflationRateField.value);
    if (decreaseInflation.checked == true) answer.valueChange = parseFloat(inflationRateField.value) * (-1);
    if (isNaN(answer.valueChange)) {
      increaseField.classList.add('error');
      decreaseField.classList.add('error');
      return false;
    }

    let closureDate = closureDateField.value.split('.');
    if (closureDate[2] != undefined) {
      closureDate.shift();
    }
    closureDate[0] = +closureDate[0];
    closureDate[1] = +closureDate[1]; 
    if (isNaN(closureDate[0]) || closureDate[0] > 12 || closureDate[0] <= 0 || isNaN(closureDate[1]) || closureDate[1] < new Date().getFullYear()) {
      closureDateField.classList.add('error');
      return false;
    }
    answer.closureDateArr = closureDate; 

    Input.newAssetsArr.push(answer);

    titleField.value = '';
    valueField.value = '';
    increaseField.value = '';
    decreaseField.value = '';
    increaseInflation.checked = false;
    decreaseInflation.checked = false;
    closureDateField.value = '';

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

        
    //вычисляемые свойства:
    let ifRetired = this.number > (client.retiredAge - client.age);
    
    
    this.fundStart = previousFund;
    if (client.retiredCharge.inAction.includes(this.number) && client.retiredCharge.paidAt == 'start') {
      this.fundStart += client.retiredCharge.amount;
    }
  
    if (ifRetired && client.retiredPensionTaken == 'start') {
      this.fundStart -= client.retiredPension;      
    }

    this.fundEnd = this.fundStart;
    if (client.retiredCharge.inAction.includes(this.number) && client.retiredCharge.paidAt == 'end') {
      this.fundEnd += client.retiredCharge.amount;
    }
    if (ifRetired && client.retiredPensionTaken == 'end') {
      this.fundEnd -= client.retiredPension;
    }
    let fundIncreasePersent = null; //процентная ставка для текущего месяца
    if(!ifRetired) {fundIncreasePersent = client.workFundIncrease;}
    if(ifRetired) {fundIncreasePersent = client.retireFundIncrease;}
    let fundIncreaseSum = ((fundIncreasePersent / 100) * this.daysInMonth / this.daysInYear) * this.fundStart;
    this.fundEnd += fundIncreaseSum;    
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
    let monthsArr = [];
    let today = new Date()
    // let previousDateObj = new Date(today.getFullYear(), (today.getMonth() - 1));
    let previousDateObj = new Date(today.getFullYear(), today.getMonth());
    let firstMonth = new this(1, client.initialFund, previousDateObj, client); 
    monthsArr.push(firstMonth);
    
    for (let i = 2; i <= period; i++) {
      let lastMonth = monthsArr[monthsArr.length - 1];
      let newMonth = new this(i, lastMonth.fundEnd, lastMonth.date, client);
      monthsArr.push(newMonth);
    }

    return monthsArr;
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