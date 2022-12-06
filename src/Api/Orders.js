import { API_URL } from "../Utils/Constans";

export async function getOrdersApi(auth) {
  try {
    const url = `${API_URL}/orders?populate=product.images&filters[user][id][$eq]=${auth.idUser}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
