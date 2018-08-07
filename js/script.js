'use strict';

function generateRandomStats() {
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
    cookiesPerHour.push({ time: hourMarker, customers, cookies, });
  }
  return cookiesPerHour;
};

function generateTable() {
  const cookiesArr = this.getStatsPerHour();
  const addToTable = document.getElementById(this.tableId);
  let totalCustomers = 0;
  let totalCookies = 0;
  cookiesArr.forEach((item) => {
    totalCustomers += item.customers;
    totalCookies += item.cookies;
    const timeData = document.createTextNode(item.time);
    const customerData = document.createTextNode(item.customers);
    const cookieData = document.createTextNode(item.cookies);
    const data1 = document.createElement('td');
    const data2 = document.createElement('td');
    const data3 = document.createElement('td');
    const newRow = document.createElement('tr');
    addToTable.appendChild(newRow);
    data1.appendChild(timeData);
    data2.appendChild(customerData);
    data3.appendChild(cookieData);
    newRow.appendChild(data1);
    newRow.appendChild(data2);
    newRow.appendChild(data3);
  });
  document.getElementById(`${this.tableId}-customers`).appendChild(document.createTextNode(totalCustomers));
  document.getElementById(`${this.tableId}-cookies`).appendChild(document.createTextNode(totalCookies));
};

const pikeLocation = {
  customerMin: 23,
  customerMax: 65,
  avgCookieSale: 6.3,
  getStatsPerHour: generateRandomStats,
  tableId: 'pike-table',
  addTableToDOM: generateTable,
};

const seatacLocation = {
  customerMin: 3,
  customerMax: 24,
  avgCookieSale: 1.2,
  getStatsPerHour: generateRandomStats,
  tableId: 'seatac-table',
  addTableToDOM: generateTable,
};

const seaCenterLocation = {
  customerMin: 11,
  customerMax: 38,
  avgCookieSale: 3.7,
  getStatsPerHour: generateRandomStats,
  tableId: 'seacenter-table',
  addTableToDOM: generateTable,
};

const capHillLocation = {
  customerMin: 20,
  customerMax: 38,
  avgCookieSale: 2.3,
  getStatsPerHour: generateRandomStats,
  tableId: 'caphill-table',
  addTableToDOM: generateTable,
};

const alkiLocation = {
  customerMin: 2,
  customerMax: 16,
  avgCookieSale: 4.6,
  getStatsPerHour: generateRandomStats,
  tableId: 'alki-table',
  addTableToDOM: generateTable,
};

pikeLocation.addTableToDOM();
seatacLocation.addTableToDOM();
seaCenterLocation.addTableToDOM();
capHillLocation.addTableToDOM();
alkiLocation.addTableToDOM();
