'use strict';

// function to produce an array of everything that will go into the header row of table
function generateHourMarkers(needsTotal) {
  let hourMarkers = [''];
  for (let i = 6; i < 21; i++) {
    if (i < 12) {
      hourMarkers.push(`${i}am`);
    } else if (i > 12) {
      hourMarkers.push(`${i - 12}pm`);
    } else {
      hourMarkers.push('12pm');
    }
  }
  if (needsTotal) hourMarkers.push('Store Totals');
  return hourMarkers;
}

// function to produce an array of everything that will go into the footer row
function generateTotalsArray(table) {
  const allCookieRows = table.getElementsByTagName('tr');
  const allCookieCols = allCookieRows[1].getElementsByTagName('td');
  const totalsArray = ['Hour Totals'];
  for (let i = 1; i < allCookieCols.length; i++) {
    let total = 0;
    for (let j = 1 ; j < allCookieRows.length; j++) {
      total += parseInt(allCookieRows[j].getElementsByTagName('td')[i].innerText);
    }
    totalsArray.push(total);
  }
  return totalsArray;
}

// function to create the table header or footer and append table body once the header is created
function createTableHeaderFooter(tag, data, parent, body) {
  const tableHead = document.createElement(tag);
  parent.appendChild(tableHead);
  const tableRow = document.createElement('tr');
  data.forEach((item) => {
    const tableHeading = document.createElement('th');
    tableHeading.appendChild(document.createTextNode(item));
    tableRow.appendChild(tableHeading);
  });
  tableHead.appendChild(tableRow);
  parent.appendChild(body);
}

// this is the function that creates an array which contains what will be an entire row of table data
function generateRow() {
  let rowArray = [];
  let cookieTotal = 0;
  rowArray.push(this.locationName);
  for (let i = 0; i < 15; i++) {
    const customers = Math.floor(Math.random() * (this.customerMax - this.customerMin) + this.customerMin);
    const cookies = Math.floor(customers * this.avgCookieSale);
    cookieTotal += cookies;
    rowArray.push(cookies);
  }
  rowArray.push(cookieTotal);
  return rowArray;
};

// the function that actually creates the table out of the data
function displayRow(sales, tossers) {
  const dataArr = this.getStatsPerHour();
  const tosserArr = dataArr.slice(0, 16);
  const newRow = document.createElement('tr');
  const tossRow = document.createElement('tr');
  sales.appendChild(newRow);
  tossers.appendChild(tossRow);
  dataArr.forEach((item) => {
    const cookieData = document.createTextNode(item);
    const newCell = document.createElement('td');
    newCell.appendChild(cookieData);
    newRow.appendChild(newCell);
  });
  tosserArr.forEach((item) => {
    const tossers = parseInt(Math.ceil(item / 20));
    const textData = isNaN(tossers) ? item : tossers;
    const tosserData = document.createTextNode(textData);
    const tossCell = document.createElement('td');
    tossCell.appendChild(tosserData);
    tossRow.appendChild(tossCell);
  });
};

// an array for containing all Location objects
let storeLocationArray = [];

// location object constructor which also pushes the object into the storeLocationArray
function Location(customerMin, customerMax, avgCookieSale, locationName) {
  this.customerMin = customerMin;
  this.customerMax = customerMax;
  this.avgCookieSale = avgCookieSale;
  this.locationName = locationName;
  storeLocationArray.push(this);
}

// the methods for generating stats and generating tables for the Location object added to constructor with prototype
Location.prototype.getStatsPerHour = generateRow;
Location.prototype.render = displayRow;

// create our locations with constructors
// const pikeLocation = new Location(23, 65, 6.3, '1st & Pike');
// const seatacLocation = new Location(3, 24, 1.2, 'Seatac');
// const seaCenterLocation = new Location(11, 38, 3.7, 'Seattle Center');
// const capHillLocation = new Location(20, 38, 2.3, 'Capitol Hill');
// const alkiLocation = new Location(2, 16, 4.6, 'Alki');

new Location(23, 65, 6.3, '1st & Pike');
new Location(3, 24, 1.2, 'Seatac');
new Location(11, 38, 3.7, 'Seattle Center');
new Location(20, 38, 2.3, 'Capitol Hill');
new Location(2, 16, 4.6, 'Alki');

// where all the magic happens
function generateAllTables() {
  // grab the ids for the sales table and tosser table and save them into variables
  const salesTable = document.getElementById('sales-table');
  const tosserTable = document.getElementById('tosser-table');

  // we'll remove all of the elements within both of those in case the tables were already there and we want to create
  // new one's with new data
  while (salesTable.firstChild) {
    salesTable.removeChild(salesTable.firstChild);
  }

  while (tosserTable.firstChild) {
    tosserTable.removeChild(tosserTable.firstChild);
  }

  // with clean id tags, we create the tag body elements for both tables that will contain that table's data and
  // be appended later
  const tableBody = document.createElement('tbody');
  const tosserBody = document.createElement('tbody');

  // save the header row values array to variables for both tables, arguments indicate headers are for sales table
  const headerHours = generateHourMarkers(true);
  const tosserHours = generateHourMarkers(false);

  // call table header creation function for both tables with proper arguments
  createTableHeaderFooter('thead', headerHours, salesTable, tableBody);
  createTableHeaderFooter('thead', tosserHours, tosserTable, tosserBody);

  // call the method on each object that creates the table and append it to the DOM
  storeLocationArray.forEach((franchise) => {
    franchise.render(salesTable, tosserTable);
  });

  // save the footer row values array to variables for both tables
  const footerTotals = generateTotalsArray(salesTable);
  const tosserTotals = generateTotalsArray(tosserTable);

  // call table footer creation function for both tables
  createTableHeaderFooter('tfoot', footerTotals, salesTable, tableBody);
  createTableHeaderFooter('tfoot', tosserTotals, tosserTable, tosserBody);
}

// run the function to create the tables when page starts
generateAllTables();

// functions and variables related to the new location form follow
const newLocationForm = document.getElementById('new-location-form');
const errorList = document.getElementById('error-list');

// clears all errors before displaying new errors or upon successful submit
function clearErrors() {
  while (errorList.firstChild) {
    errorList.removeChild(errorList.firstChild);
  }
}

// handle errors from the user submitted form
function errorHandling(data) {
  let errors = [];
  if (typeof data.newLocationName !== 'string' || !data.newLocationName.length) {
    errors.push('Your location needs a name.');
  }
  if (isNaN(data.newMaxCustomers) || isNaN(data.newMinCustomers) || isNaN(data.newAvgCookies)) {
    errors.push('Your minimum customers, maximum customers, and average sales must be numbers.');
  }
  if (data.newMaxCustomers < data.newMinCustomers) {
    errors.push('Maximum customers can\'t be fewer than your minimum customers.');
  }
  return errors;
}

// when the form is submitted
function addNewLocation(e) {
  e.preventDefault();
  let formResults = {};
  formResults.newLocationName = e.target.locationName.value;
  formResults.newMinCustomers = parseFloat(e.target.minCustomers.value);
  formResults.newMaxCustomers = parseFloat(e.target.maxCustomers.value);
  formResults.newAvgCookies = parseFloat(e.target.avgCookies.value);
  const errorsArray = errorHandling(formResults);
  if (errorsArray.length) {
    clearErrors();
    errorsArray.forEach((err) => {
      const errMsg = document.createTextNode(err);
      const errListItem = document.createElement('li');
      errListItem.appendChild(errMsg);
      errorList.appendChild(errListItem);
    });
  } else {
    clearErrors();
    new Location(formResults.newMinCustomers, formResults.newMaxCustomers, formResults.newAvgCookies, formResults.newLocationName);
    generateAllTables();
    e.target.locationName.value = '';
    e.target.minCustomers.value = '';
    e.target.maxCustomers.value = '';
    e.target.avgCookies.value = '';
  }
}

newLocationForm.addEventListener('submit', addNewLocation);