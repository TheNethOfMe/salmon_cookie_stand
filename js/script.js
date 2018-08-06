'use strict';

function generateRandomCookies() {
  let cookiesPerHour = [];
  for (let i = 6; i < 21; i++) {
    const customers = Math.floor(Math.random() * (this.customerMax - this.customerMin) + this.customerMin);
    const cookies = Math.floor(customers * this.avgCookieSale);
    let hourMarker;
    if (i < 12) {
      hourMarker = `${i}am`;
    } else if (i > 12) {
      hourMarker = `${i - 12}pm`;
    } else {
      hourMarker = '12pm';
    }
    cookiesPerHour.push({ [hourMarker]: cookies, });
  }
  return cookiesPerHour;
};

function generateTable() {
  const cookiesArr = this.getCookieSalesPerHour();
  const addToTable = document.getElementById(this.tableId);
  cookiesArr.forEach((item) => {
    const timeData = document.createTextNode(Object.keys(item)[0]);
    const cookieData = document.createTextNode(Object.values(item)[0]);
    const data1 = document.createElement('td');
    const data2 = document.createElement('td');
    const newRow = document.createElement('tr');
    addToTable.appendChild(newRow);
    data1.appendChild(timeData);
    data2.appendChild(cookieData);
    newRow.appendChild(data1);
    newRow.appendChild(data2);
  });
};

const pikeLocation = {
  customerMin: 23,
  customerMax: 65,
  avgCookieSale: 6.3,
  getCookieSalesPerHour: generateRandomCookies,
  tableId: 'pike-table',
  addTableToDOM: generateTable,
};

const seatacLocation = {
  customerMin: 3,
  customerMax: 24,
  avgCookieSale: 1.2,
  getCookieSalesPerHour: generateRandomCookies,
  tableId: 'seatac-table',
  addTableToDOM: generateTable,
};

const seaCenterLocation = {
  customerMin: 11,
  customerMax: 38,
  avgCookieSale: 3.7,
  getCookieSalesPerHour: generateRandomCookies,
  tableId: 'seacenter-table',
  addTableToDOM: generateTable,
};

const capHillLocation = {
  customerMin: 20,
  customerMax: 38,
  avgCookieSale: 2.3,
  getCookieSalesPerHour: generateRandomCookies,
  tableId: 'caphill-table',
  addTableToDOM: generateTable,
};

const alkiLocation = {
  customerMin: 2,
  customerMax: 16,
  avgCookieSale: 4.6,
  getCookieSalesPerHour: generateRandomCookies,
  tableId: 'alki-table',
  addTableToDOM: generateTable,
};

pikeLocation.addTableToDOM();
seatacLocation.addTableToDOM();
seaCenterLocation.addTableToDOM();
capHillLocation.addTableToDOM();
alkiLocation.addTableToDOM();
// const pikeCookies = pikeLocation.getCookieSalesPerHour();
// const pikeTable = document.getElementById('pike-table');

// const data1 = document.createElement('td');
// const data2 = document.createElement('td');
// const newRow = document.createElement('tr');
// const timeData = document.createTextNode('7am');
// const cookieData = document.createTextNode('400');

// pikeTable.appendChild(newRow);
// data1.appendChild(timeData);
// data2.appendChild(cookieData);
// newRow.appendChild(data1);
// newRow.appendChild(data2);