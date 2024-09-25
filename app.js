import Store from "./services/store.js";
import API from "./services/API.js";
import { loadData } from "./services/menu.js";
import Router from "./services/router.js";

// Web Components - needs to be imported here to work throughout the app
import { MenuPage } from "./components/menu-page.js";
import { DetailsPage } from "./components/details-page.js";
import { OrderPage } from "./components/order-page.js";
import ProductItem from "./components/product-item.js";
import { CartItem } from "./components/cart-item.js";

// Making the store globally available on the window object, since Modules are not global
window.app = {
  store: Store,
  router: Router,
};

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});

window.addEventListener("app-cart-changed", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});

// Setting shorthands and aliases to make code less verbose
const $ = function (args) {
  return document.querySelector(args);
};
const $$ = function (args) {
  return document.querySelectorAll(args);
};

HTMLElement.prototype.on = function (a, b, c) {
  return this.addEventListener(a, b, c);
};
HTMLElement.prototype.off = function (a, b) {
  return this.removeEventListener(a, b);
};
HTMLElement.prototype.$ = function (s) {
  return this.querySelector(s);
};
HTMLElement.prototype.$$ = function (s) {
  return this.querySelectorAll(s);
};
