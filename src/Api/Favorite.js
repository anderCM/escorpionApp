import { API_URL } from "../Utils/Constans";
import { size } from "lodash";

export async function isFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/favorites?populate=product&filters[product][id][$eq]=${idProduct}&filters[user][id][$eq]=${auth.idUser}`;
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

export async function addFavoriteApi(auth, favoriteData) {
  try {
    const url = `${API_URL}/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        data: favoriteData,
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

export async function deleteFavoriteApi(auth, idProduct) {
  try {
    const dataFound = await isFavoriteApi(auth, idProduct);
    if (size(dataFound.data) > 0) {
      const url = `${API_URL}/favorites/${dataFound.data[0].id}`;
      const params = {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoritesApi(auth) {
  try {
    const url = `${API_URL}/favorites?populate=product.images&filters[user][id][$eq]=${auth.idUser}&sort=createdAt:desc`;
    const params = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [null];
  }
}
