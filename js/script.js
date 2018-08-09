'use strict';

// grab the ids for the sales table and tosser table and create tbodies for both
const salesTable = document.getElementById('sales-table');
const tosserTable = document.getElementById('tosser-table');
const tableBody = document.createElement('tbody');
const tosserBody = document.createElement('tbody');

// functions to produce the data for header, rows, and footer for tables
function generateHeaderData(needsTotal) {
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

function generateCookieRow() {
  let rowArray = [];
  let cookieTotal = 0;
  rowArray.push(this.locationName);
  for (let i = 0; i < 15; i++) {
    const customers = Math.floor(Math.random() * (this.customerMax - this.customerMin + 1) + this.customerMin);
    const cookies = Math.floor(customers * this.avgCookieSale);
    cookieTotal += cookies;
    rowArray.push(cookies);
  }
  rowArray.push(cookieTotal);
  return rowArray;
}

function generateFooterData(table) {
  const allCookieRows = table.getElementsByTagName('tr');
  const allCookieCols = allCookieRows[1].getElementsByTagName('td');
  const totalsArray = ['Hour Totals'];
  for (let i = 1; i < allCookieCols.length; i++) {
    let total = 0;
    for (let j = 1; j < allCookieRows.length; j++) {
      total += parseInt(allCookieRows[j].getElementsByTagName('td')[i].innerText);
    }
    totalsArray.push(total);
  }
  return totalsArray;
}

// functions to display all of the tables
function displayHeader(data, parent, body) {
  const tableHead = document.createElement('thead');
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

function displayCookieRow(sales, tossers) {
  const dataArr = this.getCookieRow();
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
}

function displayFooter(data, parent) {
  const tableFoot = document.createElement('tfoot');
  parent.appendChild(tableFoot);
  const tableRow = document.createElement('tr');
  data.forEach((item) => {
    const tableData = document.createElement('th');
    tableData.appendChild(document.createTextNode(item));
    tableRow.appendChild(tableData);
  });
  tableFoot.appendChild(tableRow);
}

// an array for containing all StoreLocation objects
let storeLocationArray = [];

// location object constructor which also pushes the object into the storeLocationArray
function StoreLocation(customerMin, customerMax, avgCookieSale, locationName) {
  this.customerMin = customerMin;
  this.customerMax = customerMax;
  this.avgCookieSale = avgCookieSale;
  this.locationName = locationName;
  storeLocationArray.push(this);
}

// a separate function for generating the footers so they can be re-generated when new store is added
function createAllFooters() {
  [salesTable, tosserTable].forEach((table) => {
    table.deleteTFoot();
    const total = generateFooterData(table);
    displayFooter(total, table);
  });
}

// the methods for generating stats and generating tables for the Location object added to constructor with prototype
StoreLocation.prototype.getCookieRow = generateCookieRow;
StoreLocation.prototype.render = displayCookieRow;

// create all StoreLocations
new StoreLocation(23, 65, 6.3, '1st & Pike');
new StoreLocation(3, 24, 1.2, 'Seatac');
new StoreLocation(11, 38, 3.7, 'Seattle Center');
new StoreLocation(20, 38, 2.3, 'Capitol Hill');
new StoreLocation(2, 16, 4.6, 'Alki');

// generate all tables on page load
const headerHours = generateHeaderData(true);
const tosserHours = generateHeaderData(false);
displayHeader(headerHours, salesTable, tableBody);
displayHeader(tosserHours, tosserTable, tosserBody);
storeLocationArray.forEach((franchise) => {
  franchise.render(tableBody, tosserBody);
});
createAllFooters();

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
  if (typeof data.locationName !== 'string' || !data.locationName.length) {
    errors.push('Your location needs a name.');
  }
  if (!data.maxCustomers || !data.minCustomers || !data.avgCookies) {
    errors.push('Your minimum customers, maximum customers, and average sales must be numbers.');
  }
  if (data.maxCustomers < data.minCustomers) {
    errors.push('Maximum customers can\'t be fewer than your minimum customers.');
  }
  return errors;
}

// when the form is submitted
function addNewLocation(e) {
  e.preventDefault();
  let formResults = {};
  const propertiesArr = ['locationName', 'minCustomers', 'maxCustomers', 'avgCookies'];
  propertiesArr.forEach((prop) => {
    formResults[prop] = parseFloat(e.target[prop].value) || e.target[prop].value;
  });
  const errorsArray = errorHandling(formResults);
  clearErrors();
  if (errorsArray.length) {
    errorsArray.forEach((err) => {
      const errListItem = document.createElement('li');
      errorList.appendChild(errListItem);
      errListItem.innerText = err;
    });
  } else {
    const newLocation = new StoreLocation(formResults.minCustomers, formResults.maxCustomers, formResults.avgCookies, formResults.locationName);
    newLocation.render(tableBody, tosserBody);
    createAllFooters();
    propertiesArr.forEach((prop) => {
      e.target[prop].value = '';
    });
  }
}

newLocationForm.addEventListener('submit', addNewLocation);
