// Класс для создания объекта с методами для считывание данных с форм на странице
class Input {
  get name() {
    return document.getElementById("inquiry-name").value;
  }

  get birthday() {
    return document.getElementById("inquiry-birthday").value;
  }

  get retiredAge() {
    return document.getElementById("inquiry-retired").value;
  } 

  get retiredPension() {
    return document.getElementById("inquiry-income").value;
  }

  get retiredCharge() {
    return document.getElementById("inquiry-payment").value;
  }
  
};

// Класс для создания объектов клиентов
class Client {
  constructor(name, birthday, retiredAge, retiredPension, retiredCharge, initialFund=0) {
    this.name = name;
    this.birthdayStr = birthday; // строка в формате ДД.ММ.ГГГ
    this.retiredAge = parseInt(retiredAge);
    this.retiredPension = parseInt(retiredPension);
    //this.givenRetiredCharge = parseInt(retiredCharge); // вместо этого свойства придется делать массив объектов amount & inAction
      let inActionArr = [];
      for (let i = 1; i <= this.monthsToRetire; i++) {
        inActionArr.push(i);
      }
    this.retiredCharge = { 
      amount: parseInt(retiredCharge),
      inAction: inActionArr,
    };
    this._initialFund = initialFund;
  }

  get birthdayObj() {
    let dayMonthYear = this.birthdayStr.split('.');
    let date = dayMonthYear[0];
    let month = dayMonthYear[1] - 1;
    let year = dayMonthYear[2];
    return new Date(year, month, date);
  }

  get ageMonths() {
    let today = new Date();
    let ageNum = today - this.birthdayObj; // Возраст в миллисекундах
    return Math.round(ageNum / (1000 * 60 * 60 * 24 * 30.45)); // Возраст в месяцах!!!!
  }

  get initialFund() {
    return this._initialFund;
  }
  
  get monthsToRetire() {
    return (this.retiredAge * 12 - this.ageMonths);
  }

  getData(period) {
    return Month.makeMonthsArr(period, this.initialFund, this.retiredCharges)
  }
}

// Класс для создания объектов "месяц" и создания массивов из этих объектов
class Month {
  constructor(number, initialFund, retiredCharge) {
    this._number = number;
    this.retiredCharge = retiredCharge; // процедура, как вычислять 

    //вычисляемые свойства:
    this.fund = initialFund + retiredCharge;
  } 

  get number() {return this._number};

  //Статические методы и свойства:
  static makeMonthsArr(period, initialFund, retiredCharges) {
    let monthsArr = [];
    let firstMonth = new this(1, initialFund, retiredCharges); 
    monthsArr.push(firstMonth);
    
    for (let i = 2; i <= period; i++) {
      let lastMonth = monthsArr[monthsArr.length - 1];
      let newMonth = new this(i, lastMonth.fund, retiredCharges);
      monthsArr.push(newMonth);
    }

    return monthsArr;
  }
}