"use strict"

// Класс для создания объектов "год" и создания массивов из этих объектов
class Year {
  constructor(number, initialSpareFund) {
    this._number = number;
    this._spareFund = initialSpareFund;    
  }

  get number() {
    return this._number;
  }

  get spareFund() {
    return this._spareFund;
  }
  
  //--Static props and meths----------------

  static data = [];

  static makeYearsArr(period, initialSpareFund) {
    let yearsArr = [];
    let firstYear = new this(1, initialSpareFund);
    yearsArr.push(firstYear);

    for (let i = 2; i <= period; i++) {
      let lastYear = yearsArr[yearsArr.length - 1];
      let newYear = new this(i, lastYear.spareFund);
      yearsArr.push(newYear);
    }

    this.data = yearsArr;
  }

}

// Класс для создания объектов с методами подготовки данных для графика (или для таблицы)
class Data {
  constructor(obj) {
    this.source = obj;
  }
  
  spareFund() {
    let answ = [];
    for (let i of this.source.data) {
      let nextItem = [i.number];
      nextItem.push(i.spareFund);
      answ.push(nextItem);
    }
    return answ;
  }
}

// Создаем объект для работы с .data из объекта Year
let data = new Data(Year);

