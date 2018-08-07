'use strict';

// grab the sales table and save it to a variable and create the tbody element to be added once the header is created
const salesTable = document.getElementById('sales-table');
const tableBody = document.createElement('tbody');

// function to produce an array of everything that will go into the header row of table
function generateHourMarkers() {
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
  hourMarkers.push('Store Totals');
  return hourMarkers;
}

// function to produce an array of everything that will go into the footer row
function generateTotalsArray() {
  const allRows = document.getElementsByTagName('tr');
  const totalsArray = ['Hour Totals'];
  for (let i = 1; i < 17; i++) {
    let total = 0;
    for (let j = 1 ; j < 6; j++) {
      total += parseInt(allRows[j].getElementsByTagName('td')[i].innerText);
    }
    totalsArray.push(total);
  }
  return totalsArray;
}

// function to create the table header or footer and append table body once the header is created
function createTableHeaderFooter(tag, data) {
  const tableHead = document.createElement(tag);
  salesTable.appendChild(tableHead);
  const tableRow = document.createElement('tr');
  data.forEach((item) => {
    const tableHeading = document.createElement('th');
    tableHeading.appendChild(document.createTextNode(item));
    tableRow.appendChild(tableHeading);
  });
  tableHead.appendChild(tableRow);
  salesTable.appendChild(tableBody);
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

// this is the function that actually creates the table and appends it to the DOM
// the function calls the stat generator function and uses the data from the resulting array
// and turns it into an HTML friendly table
// it also keeps a running total of all customers and cookies to append totals to the end
// of the table
function displayRow() {
  const dataArr = this.getStatsPerHour();
  const newRow = document.createElement('tr');
  tableBody.appendChild(newRow);

  dataArr.forEach((item) => {
    const cookieData = document.createTextNode(item);
    const newCell = document.createElement('td');

    newCell.appendChild(cookieData);
    newRow.appendChild(newCell);
  });
};

// location object constructor
function Location(customerMin, customerMax, avgCookieSale, locationName) {
  this.customerMin = customerMin;
  this.customerMax = customerMax;
  this.avgCookieSale = avgCookieSale;
  this.locationName = locationName;
}

// the methods for generating stats and generating tables for the Location object
Location.prototype.getStatsPerHour = generateRow;
Location.prototype.render = displayRow;

// one object for each location
// each object contains the min and max hourly customers, average cookies sales, and a tableId
// which is used in the generate table function so the function knows which id to append the table to
const pikeLocation = new Location(23, 65, 6.3, '1st & Pike');
const seatacLocation = new Location(3, 24, 1.2, 'Seatac');
const seaCenterLocation = new Location(11, 38, 3.7, 'Seattle Center');
const capHillLocation = new Location(20, 38, 2.3, 'Capitol Hill');
const alkiLocation = new Location(2, 16, 4.6, 'Alki');

// save the header row values array to variable
const headerHours = generateHourMarkers();

// call table header creation function
createTableHeaderFooter('thead', headerHours);

// call the method on each object that creates the table and append it to the DOM
pikeLocation.render();
seatacLocation.render();
seaCenterLocation.render();
capHillLocation.render();
alkiLocation.render();

// save the footer row values array to variable
const footerTotals = generateTotalsArray();

// call table footer creation function
createTableHeaderFooter('tfoot', footerTotals);
