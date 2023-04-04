"use strict";

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
const parentElement = document.getElementById("list-shop");

function shopCreator(location, minCustomer, maxCustomer, avgCookie) {
  let shop = {
    location: location,
    minCustomer: minCustomer,
    maxCustomer: maxCustomer,
    avgCookie: avgCookie,
    saleByHour: [],
    totalSales: 0,
    calculateSales() {
      for (let i = 0; i < hours.length; i++) {
        let cookieSale = Math.round(
          randomCustomerNumber(this.minCustomer, this.maxCustomer) *
            this.avgCookie
        );
        this.totalSales += cookieSale;
        this.saleByHour.push(cookieSale);
      }
    },
    render() {
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
    },
  };

  return shop;
}

const seattle = shopCreator("Seattle", 23, 65, 6.3);
const tokyo = shopCreator("Tokyo", 3, 24, 1.2);
const dubai = shopCreator("Dubai", 11, 38, 3.7);
const paris = shopCreator("Paris", 20, 38, 2.3);
const lima = shopCreator("Lima", 2, 16, 4.6);

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();

function randomCustomerNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
