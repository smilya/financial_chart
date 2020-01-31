/* let initialDeposits = [
  {title: 'bank deposit 1', amount: 500, interest: 5, interestToSpareFund: true, inAction: [1]},
  {title: 'bank deposit 2', amount: 1000, interest: 4, interestToSpareFund: false, inAction: [1,2]}, 
];

let initialSalaries = [
  {title: 'main salary', amount: 500, upgrade: 1, inAction: [1,2]},
];

let initialLiabilities = [
  {title: "living expences", amount: 300, inAction: [1,2]},
  {title: "short loan", amount: 120, inAction: [1]},
];

let initialData = {
  lastYear: 4,
  previousSpareFund: 0,
  previousDeposits: initialDeposits,
  previousSalaries: initialSalaries,
  previousLiabilities: initialLiabilities,
}; */

// создать объект initialData и передать его функции calculateYears

let initialSalaries = [];

function addSalary() {
  let salaryName = document.getElementById("salaryName");
  let salaryAmount = document.getElementById("salaryAmount");
  let salaryUpgrade = document.getElementById("salaryUpgrade");
  let salaryInAction = document.getElementById("salaryInAction");

  let newSalary = {};
  newSalary.title = salaryName.value;
  newSalary.amount = salaryAmount.value;
  newSalary.upgrade = salaryUpgrade.value;
  newSalary.inAction = [];
  for (let i=1; i<(+salaryInAction.value + 1); i++) {
    newSalary.inAction.push(i);
  }

  salaryName.value = '';
  salaryAmount.value = '';
  salaryUpgrade.value = '';
  salaryInAction.value = '';
  

  initialSalaries.push(newSalary);

  let str = `Зарплата: <b>${newSalary.title}</b>, сумма: <b>${newSalary.amount}</b>, индексация <b>${newSalary.upgrade}%</b>, в течение <b>${newSalary.inAction.length}</b> лет`;
  let strP = document.createElement('p');
  strP.innerHTML = str;
  document.getElementById('salaryFieldset').append(strP);
}

document.getElementById("addSalary").onclick = function() {addSalary()};

//========================================

let initialDeposits = [];

function addDeposit() {
  let depoName = document.getElementById("depoName");
  let depoAmount = document.getElementById("depoAmount");
  let interest = document.getElementById("interest");
  let interestToSpareFund = document.getElementById("interestToSpareFund");
  let depoInAction = document.getElementById("depoInAction");

  let newDepo = {};
  newDepo.title = depoName.value;
  newDepo.amount = depoAmount.value;
  newDepo.interest = interest.value; 
  newDepo.interestToSpareFund = interestToSpareFund.checked;
  newDepo.inAction = [];
  for (let i=1; i<(+depoInAction.value + 1); i++) {
    newDepo.inAction.push(i);
  }

  depoName.value = '';
  depoAmount.value = '';
  interest.value = '';
  interestToSpareFund.value = '';
  depoInAction.value = '';
  

  initialDeposits.push(newDepo);

  let str = `Депозит: <b>${newDepo.title}</b>, сумма: <b>${newDepo.amount}</b>, годовой процент <b>${newDepo.interest}%</b>, начисления выводим: <b>${newDepo.interestToSpareFund ? "ДА" : 'НЕТ'}</b>, в течение <b>${newDepo.inAction.length}</b> лет`;
  let strP = document.createElement('p');
  strP.innerHTML = str;
  document.getElementById('depoFieldset').append(strP);
}

document.getElementById("addDeposit").onclick = function() {addDeposit()};

//========================================

let initialLiabilities = [];

function addLiability() {
  let liabilityName = document.getElementById("liabilityName");
  let liabilityAmount = document.getElementById("liabilityAmount");
  let liabilityInAction = document.getElementById("liabilityInAction");

  let newLiability = {};
  newLiability.title = liabilityName.value;
  newLiability.amount = liabilityAmount.value;
  newLiability.inAction = [];
  for (let i=1; i<(+liabilityInAction.value + 1); i++) {
    newLiability.inAction.push(i);
  }

  liabilityName.value = '';
  liabilityAmount.value = ''; 
  liabilityInAction.value = '';
  

  initialLiabilities.push(newLiability);

  let str = `Статья расходов: <b>${newLiability.title}</b>, сумма: <b>${newLiability.amount}</b>, в течение <b>${newLiability.inAction.length}</b> лет`;
  let strP = document.createElement('p');
  strP.innerHTML = str;
  document.getElementById('liabilityFieldset').append(strP);
}

document.getElementById("addLiability").onclick = function() {addLiability()};

function makeDataObj(salaries, deposits, liabilities) {
  let answ = {};
  answ.previousDeposits = deposits;
  answ.previousSalaries = salaries;
  answ.previousLiabilities = liabilities;
  answ.lastYear = +document.getElementById("yearsLong").value;;
  answ.previousSpareFund = +document.getElementById("spareFund").value;

  return answ;
}

