'use strict'

// Значения в объекте year отражают состояние счетов на конец года
let initialDeposits = [
  {title: 'bank deposit 1', amount: 500, interest: 5, interestToSpareFund: true, inAction: [1]},
  {title: 'bank deposit 2', amount: 1000, interest: 4, interestToSpareFund: false, inAction: [1,2]}, 
];

let initialSalaries = [
  {title: 'main salary', amount: 500, upgrade: 1, inAction: [1,2]},
];

let liabilities = [
  {title: "monthlyExpences", yearAmount: 0, inAction: null},
];

class Year {
  constructor(sequenceNumber, previousSpareFund, previousDeposits, previousSalaries, previousLiabilities) {
    this._sequenceNumber = sequenceNumber;
    this.spareFund = previousSpareFund;
    this.deposits = [];
      for (let i of previousDeposits) {    
        if(!i.inAction.includes(this.sequenceNumber)) continue;
        let newDeposit = {};

        if (i.interestToSpareFund == true) {
          this.spareFund += i.amount * i.interest / 100;
          newDeposit.amount = i.amount;
        }
        else {
          newDeposit.amount = i.amount + (i.amount * i.interest / 100);
        }
        if(!i.inAction.includes(this.sequenceNumber + 1)) {
          this.spareFund += newDeposit.amount;
          continue;
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
        this.spareFund += i.amount;
        newSalary.upgrade = i.upgrade;
        newSalary.amount = i.amount + i.amount * i.upgrade / 100;
        newSalary.inAction = i.inAction;
        this.salaries.push(newSalary);
      }


/*     this.liabilities = [];
      for (let i of previousLiabilities) {
        let newLiability = {};
        newLiability
      } */
  }

  get sequenceNumber() {
    return this._sequenceNumber;
  }
}

let year2020 = new Year(1, 0, initialDeposits, initialSalaries);
let year2021 = new Year(2, year2020.spareFund, year2020.deposits, year2020.salaries);
let year2022 = new Year(3, year2021.spareFund, year2021.deposits, year2021.salaries);
let year2023 = new Year(4, year2022.spareFund, year2022.deposits, year2022.salaries);
// let year2024 = new Year(5, year2023.spareFund, year2023.deposits);