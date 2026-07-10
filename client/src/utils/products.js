import axios from "axios";
import { API_URL } from "./api";

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await axios.get(`${API_URL}/products`);
  return res.data.products;
}

export async function getProduct(id) {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
}
