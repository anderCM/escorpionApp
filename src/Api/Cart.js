import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";

import { API_URL, SEARCH_CART } from "../Utils/Constans";

export async function getProductCartApi() {
  /* await AsyncStorage.removeItem(SEARCH_CART); */
  try {
    const cart = await AsyncStorage.getItem(SEARCH_CART);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addProductCartApi(idProduct, quantity) {
  try {
    const cart = await getProductCartApi();
    if (!cart) throw "Error al obtener el carrito";
    if (size(cart) === 0) {
      cart.push({
        idProduct: idProduct,
        quantity: quantity,
      });
    } else {
      let found = false;
      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });
      if (!found) {
        cart.push({
          idProduct: idProduct,
          quantity: quantity,
        });
      }
    }
    await AsyncStorage.setItem(SEARCH_CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    const newCart = filter(cart, (product) => {
      return product.idProduct !== idProduct;
    });
    await AsyncStorage.setItem(SEARCH_CART, JSON.stringify(newCart));
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function inCreaseProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        return (product.quantity += 1);
      }
    });
    await AsyncStorage.setItem(SEARCH_CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function decreaseProductCartApi(idProduct) {
  let isDelete = false;
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });
    if (isDelete) {
      await deleteProductCartApi(idProduct);
    } else {
      await AsyncStorage.setItem(SEARCH_CART, JSON.stringify(cart));
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createPayment(auth, products, address, email) {
  const addressShipping = address;
  /* delete addressShipping.id;
  delete addressShipping.attributes.createdAt;
  delete addressShipping.attributes.updatedAt;
  delete addressShipping.attributes.publishedAt; */
  const items = [];
  const totalProducts = products;
  totalProducts?.map((product) => {
    const price = product.data.attributes.price;
    const disscount =
      product.data.attributes.discount == null
        ? 0
        : product.data.attributes.discount;
    const totalPrice = price - (price * disscount) / 100;
    const url = `${product.data.attributes.images.data[0].attributes.formats.small.url}`;

    const item = {
      title: product.data.attributes.title,
      description: product.data.attributes.description,
      picture_url: url,
      category_id: product.data.attributes.sku,
      quantity: product.quantity,
      unit_price: totalPrice,
    };
    items.push(item);
  });
  try {
    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        items,
        idUser: auth.idUser,
        addressShipping,
        email,
        createUrl: 1,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function savePayment(auth, idPayment, products, address, email) {
  const addressShipping = address;
  const productsItems = [];
  const totalProducts = products;
  totalProducts?.map((product) => {
    const price = product.data.attributes.price;
    const disscount =
      product.data.attributes.discount == null
        ? 0
        : product.data.attributes.discount;
    const totalPrice = price - (price * disscount) / 100;
    const url = `${product.data.attributes.images.data[0].attributes.formats.small.url}`;

    const item = {
      id: product.data.id,
      title: product.data.attributes.title,
      description: product.data.attributes.description,
      picture_url: url,
      category_id: product.data.attributes.sku,
      quantity: product.quantity,
      unit_price: totalPrice,
    };
    productsItems.push(item);
  });
  try {
    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      Headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        idPayment,
        productsItems,
        idUser: auth.idUser,
        addressShipping,
        createUrl: 0,
        email
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCartApi() {
  try {
    await AsyncStorage.removeItem(SEARCH_CART);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
