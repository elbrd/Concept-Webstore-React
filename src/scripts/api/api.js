import axios from "axios";

export async function getProducts() {

  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
    
}

export async function getProduct(id) {

  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
}


// export async function getProduct(id) {

//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//     const product = await response.json();
//     console.log(product);
//     return product;
    
//   } catch (error) {
//     console.error(error.message);
//   }
// }


// export async function getProducts() {

//   try {
//     const response = await fetch(`https://fakestoreapi.com/products`);
//     const products = await response.json();
//     return products;

//   } catch (error) {
//     console.error(error.message);
//   }
// }