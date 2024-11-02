import productsData from "../data/products.json";

export const fetchProducts = () => {
  return productsData;
};

export const fetchProductsByType = (type) => {
  const allProducts = fetchProducts();
  return allProducts.filter((product) => product.type === type);
};
