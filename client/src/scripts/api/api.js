import axios from "axios";

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await axios.get("http://localhost:8083/api/products");
  return res.data.products;
}

export async function getProduct(id) {
  const res = await axios.get(`http://localhost:8083/api/products/${id}`);
  return res.data;
}

/*
export async function getProduct(id) {

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    console.log(product);
    return product;

  } catch (error) {
    console.error(error.message);
  }
}

export async function getProducts() {

  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const products = await response.json();
    return products;

  } catch (error) {
    console.error(error.message);
  }
}
*/
