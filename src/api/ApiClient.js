import productsData from "../data/products.json";

export const fetchProducts = () => {
  return productsData;
};

export const fetchProductsByType = (type) => {
  const allProducts = fetchProducts();
  return allProducts.filter((product) => product.type === type);
};

export const fetchProduct = (id) => {
  const allProducts = fetchProducts();
  return allProducts.find((product) => product.id === id) || null;
};

export const fetchBundle = (ids) => {
  const allProducts = fetchProducts();
  return allProducts.filter((product) => ids.includes(product.id));
};
