import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";

import { API_URL, SEARCH_HISTORY } from "../Utils/Constans";
import { sortArrayByDate } from "../Utils/Functions";

export async function getSearchHistoryApi() {
  //await AsyncStorage.removeItem(SEARCH_HISTORY);
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];
    return sortArrayByDate(JSON.parse(history));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateSearchHistoryApi(search) {
  const history = await getSearchHistoryApi();

  if (size(history) > 5) history.pop();

  history.push({
    search: search,
    date: new Date(),
  });
  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export async function searchProductsApi(search) {
  try {
    const url = `${API_URL}/products?populate=*&pagination[page]=1&pagination[pageSize]=30&filters[tags][$contains]=${search}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
