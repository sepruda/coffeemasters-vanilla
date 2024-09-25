import { getProductById } from "./menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);

  //   Check if the product is already addded
  const results = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id == id
  );

  if (results.length == 1) {
    // Product already in cart
    app.store.cart = app.store.cart.map((p) => {
      return p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p;
    });
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id != id);
}
