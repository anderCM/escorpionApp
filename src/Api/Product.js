import { API_URL } from "../Utils/Constans";

export async function getLastProductsApi(limit = 30) {
  try {
    const url = `${API_URL}/products?populate=*&pagination[page]=1&pagination[pageSize]=${limit}&sort=createdAt:desc`;
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
