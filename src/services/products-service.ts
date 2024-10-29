import { ALMAA_PRODUCTS, Product } from "../data/data";

class ProductsService {
  private products = ALMAA_PRODUCTS;

  getAllProducts(): Product[] {
    return this.products.slice();
  }

  getProduct(id: number): Product {
    return this.products.find((p) => p.id === id);
  }
}

export default new ProductsService();
