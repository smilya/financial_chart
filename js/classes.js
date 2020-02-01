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

  get initialFund() {
    return 0;
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
    this.birthdayStr = input.birthday; // строка в формате ДД.ММ.ГГГ
    this.retiredAge = parseInt(input.retiredAge) * 12;
    this.retiredPension = parseInt(input.retiredPension);
    this.retiredCharge = assets.retiredChargeObj(parseInt(input.retiredCharge), this.retiredAge, this.age);
    this._initialFund = input.initialFund;
  }

  get birthdayObj() {
    let dayMonthYear = this.birthdayStr.split('.');
    let date = dayMonthYear[0];
    let month = dayMonthYear[1] - 1;
    let year = dayMonthYear[2];
    return new Date(year, month, date);
  }

  get age() {
    let today = new Date();
    let ageNum = today - this.birthdayObj; // Возраст в миллисекундах
    return Math.round(ageNum / (1000 * 60 * 60 * 24 * 30.45)); // Возраст в месяцах!!!!
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

    for (let i = 1; i < this.maxLength; i++) {
      let fundAmount = this.source[i-1].fund;
      let monthFund = [i, fundAmount, null, null];
      answer.push(monthFund);
      if (fundAmount <= -100000) break;
    }
    return answer;
  }
}