import { API_URL } from "../Utils/Constans";

export async function getLastProductsApi(start = 0, limit = 10) {
  try {
    const url = `${API_URL}/products?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort=createdAt:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductApi(idProduct) {
  try {
    const url = `${API_URL}/products/${idProduct}?populate=*`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsByPage(page) {
  try {
    const url = `${API_URL}/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10&sort=createdAt:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
