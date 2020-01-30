'use strict'

// Значения в объекте year отражают состояние счетов на конец года

class Year {
  constructor(sequenceNumber, previousSpareFund, previousDeposits, previousSalaries, previousLiabilities) {
    this._sequenceNumber = sequenceNumber;
    this.spareFund = previousSpareFund;
   
    this.deposits = [];
      for (let i of previousDeposits) {    
        if(!i.inAction.includes(this.sequenceNumber)) continue;
        let newDeposit = {};

        if (i.interestToSpareFund == true) {
          this.spareFund += +i.amount * i.interest / 100;
          newDeposit.amount = +i.amount;
        }
        else {
          newDeposit.amount = +i.amount + (+i.amount * +i.interest / 100);
        }
        if(!i.inAction.includes(this.sequenceNumber + 1)) {
          this.spareFund += newDeposit.amount;
          //continue; Мешает считать totalIncome
        }

        newDeposit.title = i.title;
        newDeposit.interest = i.interest;
        newDeposit.interestToSpareFund = i.interestToSpareFund;
        newDeposit.inAction = i.inAction;
        this.deposits.push(newDeposit);
      }

    this.salaries = []; 
      for (let i of previousSalaries) {
        if(!i.inAction.includes(this.sequenceNumber)) continue;
        let newSalary = {};
        newSalary.title = i.title;
        this.spareFund += +i.amount;
        newSalary.upgrade = i.upgrade;
        newSalary.amount = +i.amount + (+i.amount) * +i.upgrade / 100;
        newSalary.inAction = i.inAction;
        this.salaries.push(newSalary);
      }

    this.liabilities = [];
      for (let i of previousLiabilities) {
        if (!i.inAction.includes(this.sequenceNumber)) continue;
        let newLiability = {};
        newLiability.title = i.title;
        newLiability.amount = +i.amount;
        this.spareFund -= newLiability.amount;
        newLiability.inAction = i.inAction;
        this.liabilities.push(newLiability);
      }  
  }

  get sequenceNumber() {
    return this._sequenceNumber;
  }

  get totalExpences() {
    let totalExpences = 0;
    for (let i of this.liabilities) {
      totalExpences += i.amount;
    }
    return totalExpences;
  }

  get totalIncome() {
    let salariesPart = 0;
    for (let i of this.salaries) { 
      salariesPart += (100 * i.amount / (100 + i.upgrade));
    }

    let depositsPart = 0;
    for (let i of this.deposits) {
      if (!i.inAction.includes(this.sequenceNumber + 1)) {
        depositsPart += i.amount;
      }
      if (i.interestToSpareFund == true) {
        depositsPart += i.amount * i.interest / 100;
      }
    }

    return salariesPart + depositsPart;

  }

  get totalCapital() {
    let totalCapital = this.spareFund; 

    for (let i of this.deposits) {
      if (i.inAction.includes(this.sequenceNumber + 1)) {
        totalCapital += i.amount;
      }
    }

    return totalCapital;
  }
}

function calculateYears(paramsObj) {
  let { 
    lastYear=50,    
    previousSpareFund=0,
    previousDeposits=[],
    previousSalaries=[],
    previousLiabilities=[] 
  } = paramsObj;

  let years = [];
  let year_1 = new Year(1, previousSpareFund, previousDeposits, previousSalaries, previousLiabilities);
  years.push(year_1);

  for (let i = 2; i < lastYear+1; i++) {
    let previousYear = years[years.length-1];
    let currentYear = new Year(i, previousYear.spareFund, previousYear.deposits, previousYear.salaries, previousYear.liabilities);
    years.push(currentYear);
  }

  return years;
}

// Функция, создающая массивы массивов для передаче рисовальщику графика
// Начнем без опций - пусть создает массив для построения общего капитала (Y) от времени (X)
let chartDataMaker = function (arrOfObjs) {
  let answer = [];

  for (let i of arrOfObjs) {
    let joint = [i.sequenceNumber];
    joint.push(i.totalCapital);
    answer.push(joint);
  }

  return answer;
}

//===================================

let initialDataObj;
let yearsArr;
let chartData;

document.getElementById("calculate").onclick = function() {
  initialDataObj = makeDataObj(initialSalaries, initialDeposits, initialLiabilities);
  yearsArr = calculateYears(initialDataObj);
  chartData = chartDataMaker(yearsArr);
  drawBasic(chartData);
  
  
}

