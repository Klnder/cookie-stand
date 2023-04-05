"use strict";

const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];
const shopInformation = [
  { location: "Seattle", minCustomer: 23, maxCustomer: 65, avgCookie: 6.3 },
  { location: "Tokyo", minCustomer: 3, maxCustomer: 24, avgCookie: 1.2 },
  { location: "Dubai", minCustomer: 11, maxCustomer: 38, avgCookie: 3.7 },
  { location: "Paris", minCustomer: 20, maxCustomer: 38, avgCookie: 2.3 },
  { location: "Lima", minCustomer: 2, maxCustomer: 16, avgCookie: 4.6 },
];

const shopList = [];
const parentElement = document.getElementById("list-shop");

function Shop(location, minCustomer, maxCustomer, avgCookie) {
  this.location = location;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookie = avgCookie;
  this.saleByHour = [];
  this.totalSales = 0;
  this.calculateSales = function () {
    for (let i = 0; i < hours.length; i++) {
      let cookieSale = Math.round(randomCustomerNumber(this.minCustomer, this.maxCustomer) * this.avgCookie);
      this.totalSales += cookieSale;
      this.saleByHour.push(cookieSale);
    }
  };
  this.render = function () {
    this.calculateSales();
    let locationName = document.createElement("h2");
    locationName.textContent = this.location;
    parentElement.appendChild(locationName);

    let list = document.createElement("ul");
    for (let i = 0; i < hours.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${hours[i]}: ${this.saleByHour[i]} cookies`;
      list.appendChild(li);
    }
    const li = document.createElement("li");
    li.textContent = `Total: ${this.totalSales} cookies`;
    list.appendChild(li);
    parentElement.appendChild(list);
  };
}

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

function randomCustomerNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
