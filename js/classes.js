
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

    this.retiredCharge = parseInt(fieldRetiredCharge.value); 
    if (isNaN(this.retiredCharge)) {
      this.dataError = true;
      fieldRetiredCharge.classList.add('error');
      document.querySelector("label[for='inquiry-payment']").classList.add("error");
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
  
};

// Объект с методами, формирующими объекты/массивы, 
// описывающиt все факторы прихода/расхода (т.е. пенсионный взнос, зарплаты, траты и пр.)
let assets = {
  retiredChargeObj (retiredChagre, retiredAge, currentAge, startPaymentMonth=1) {
    let answer = {};
    answer.amount = retiredChagre;
    answer.inAction = [];
    let duration = retiredAge - currentAge;

    for (let i = startPaymentMonth; i <= duration; i++) {
      answer.inAction.push(i);
    }

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
    this.retiredCharge = assets.retiredChargeObj(input.retiredCharge, this.retiredAge, this.age);
    this._initialFund = input.initialFund;
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
    return Month.makeMonthsArr(period, this.initialFund, this.retiredCharges)
  }
}

// Класс для создания объектов "месяц" и создания массивов из этих объектов
class Month {
  // constructor(number, initialFund, retiredCharge, retiredAge, age, retiredPension) {
  constructor(number, initialFund, client) {
     this._number = number;
    
    //вычисляемые свойства:
    this.fund = initialFund;
    if (client.retiredCharge.inAction.includes(this.number)) {
      this.fund += client.retiredCharge.amount;
    }
    if (this.number > (client.retiredAge - client.age)) {
      this.fund -= client.retiredPension;
    }


  } 

  get number() {return this._number};

  // Статические методы и свойства:
  // static makeMonthsArr(period, initialFund, retiredCharge, retiredAge, age, retiredPension) {
  static makeMonthsArr(period, client) {
    let monthsArr = [];
    let firstMonth = new this(1, client.initialFund, client); 
    monthsArr.push(firstMonth);
    
    for (let i = 2; i <= period; i++) {
      let lastMonth = monthsArr[monthsArr.length - 1];
      let newMonth = new this(i, lastMonth.fund, client);
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

  getFunds(client) {
    let answer = [];

    answer.push([0, client.initialFund, null, null]);

    for (let i = 1; i <= this.maxLength; i++) {
      let fundAmount = this.source[i-1].fund;
      if (fundAmount < 0) break;
      let monthFund = [i, fundAmount, null, null];
      answer.push(monthFund);
    }
    return answer;
  }
}