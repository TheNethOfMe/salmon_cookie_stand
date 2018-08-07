'use strict';

// this is the function that creates an array of random data
// the array contains objects and each object has a time, cumstomer, and cookie properties
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

// this is the function that actually creates the table and appends it to the DOM
// the function calls the stat generator function and uses the data from the resulting array
// and turns it into an HTML friendly table
// it also keeps a running total of all customers and cookies to append totals to the end
// of the table
function generateTable() {
  const cookiesArr = this.getStatsPerHour();
  const addToTable = document.getElementById(this.tableId);
  let totalCustomers = 0;
  let totalCookies = 0;
  cookiesArr.forEach((item) => {
    totalCustomers += item.customers;
    totalCookies += item.cookies;

    const newRow = document.createElement('tr');
    addToTable.appendChild(newRow);

    const timeData = document.createTextNode(item.time);
    const customerData = document.createTextNode(item.customers);
    const cookieData = document.createTextNode(item.cookies);
    const data1 = document.createElement('td');
    const data2 = document.createElement('td');
    const data3 = document.createElement('td');

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

// location object constructor
function Location(customerMin, customerMax, avgCookieSale, tableId) {
  this.customerMin = customerMin;
  this.customerMax = customerMax;
  this.avgCookieSale = avgCookieSale;
  this.tableId = tableId;
}

// the methods for generating stats and generating tables for the Location object
Location.prototype.getStatsPerHour = generateRandomStats;
Location.prototype.addTableToDOM = generateTable;

// one object for each location
// each object contains the min and max hourly customers, average cookies sales, and a tableId
// which is used in the generate table function so the function knows which id to append the table to
const pikeLocation = new Location(23, 65, 6.3, 'pike-table');
const seatacLocation = new Location(3, 24, 1.2, 'seatac-table');
const seaCenterLocation = new Location(11, 38, 3.7, 'seacenter-table');
const capHillLocation = new Location(20, 38, 2.3, 'caphill-table');
const alkiLocation = new Location(2, 16, 4.6, 'alki-table');

// call the method on each object that creates the table
// and appends it to the DOM
pikeLocation.addTableToDOM();
seatacLocation.addTableToDOM();
seaCenterLocation.addTableToDOM();
capHillLocation.addTableToDOM();
alkiLocation.addTableToDOM();
