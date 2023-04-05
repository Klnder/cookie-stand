"use strict";
//variables
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];
const shopInformation = [
  { location: "Seattle", minCustomer: 23, maxCustomer: 65, avgCookie: 6.3 },
  { location: "Tokyo", minCustomer: 3, maxCustomer: 24, avgCookie: 1.2 },
  { location: "Dubai", minCustomer: 11, maxCustomer: 38, avgCookie: 3.7 },
  { location: "Paris", minCustomer: 20, maxCustomer: 38, avgCookie: 2.3 },
  { location: "Lima", minCustomer: 2, maxCustomer: 16, avgCookie: 4.6 },
];

const shopList = [];
//dom manipulation
const table = document.getElementById("data-shop");
let tableData = document.createElement("td");
let line = document.createElement("tr");
let tableHeader = document.createElement("th");

//constructor
function Shop(location, minCustomer, maxCustomer, avgCookie) {
  this.location = location;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookie = avgCookie;
  this.saleByHour = [];
  this.totalSales = 0;
}
Shop.prototype.calculateSales = function () {
  for (let i = 0; i < hours.length; i++) {
    let cookieSale = Math.round(randomCustomerNumber(this.minCustomer, this.maxCustomer) * this.avgCookie);
    this.totalSales += cookieSale;
    this.saleByHour.push(cookieSale);
  }
};
Shop.prototype.render = function () {
  this.calculateSales();
  line = document.createElement("tr");
  //initiate the line with location name
  tableData = document.createElement("td");
  tableData.textContent = this.location;
  tableData.setAttribute("class", "tableheader");
  line.appendChild(tableData);
  //for each hour, add the data in the table
  for (let i = 0; i < hours.length; i++) {
    tableData = document.createElement("td");
    tableData.textContent = this.saleByHour[i];
    line.appendChild(tableData);
  }
  //add total at the end of the line
  tableData = document.createElement("td");
  tableData.textContent = this.totalSales;
  line.appendChild(tableData);
  table.appendChild(line);
};

//generate objects and add the data to the table
headerTable();

for (let i = 0; i < shopInformation.length; i++) {
  const tempShop = new Shop(
    shopInformation[i].location,
    shopInformation[i].minCustomer,
    shopInformation[i].maxCustomer,
    shopInformation[i].avgCookie
  );
  shopList[i] = tempShop;
  tempShop.render();
}

footerTable();

function headerTable() {
  // initialisation of the table
  line = document.createElement("tr");
  line.setAttribute("class", "tableheader");
  tableHeader = document.createElement("th");
  tableHeader.textContent = "";
  line.appendChild(tableHeader);

  //for every hour, create a new column
  for (let i = 0; i < hours.length; i++) {
    tableHeader = document.createElement("th");
    tableHeader.textContent = hours[i];
    line.appendChild(tableHeader);
  }
  // add total column
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Daily location Total";
  line.appendChild(tableHeader);
  table.appendChild(line);
}

function footerTable() {
  //add total line per hour
  line = document.createElement("tr");
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Totals";
  tableHeader.setAttribute("class", "tableheader");
  line.appendChild(tableHeader);

  let totalOfTotal = 0;
  for (let i = 0; i < hours.length; i++) {
    tableHeader = document.createElement("th");
    let totalByHour = 0;
    for (let j = 0; j < shopList.length; j++) {
      totalByHour += shopList[j].saleByHour[i];
    }
    totalOfTotal += totalByHour;
    tableHeader.textContent = totalByHour;
    line.appendChild(tableHeader);
  }
  tableHeader = document.createElement("th");
  tableHeader.textContent = totalOfTotal;
  line.appendChild(tableHeader);
  table.appendChild(line);
}

function randomCustomerNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
