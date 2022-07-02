import { API_URL } from "../Utils/Constans";

export async function getBannersApi() {
  try {
    const url = `${API_URL}/home-banners?populate=*&sort=position:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
