export type Product = {
  name: string; brand: string; presentation: string;
  price: number; category: "Gomitas"|"Softgels"|"Tabletas";
  desc: string; image: string;
};
export const products: Product[] = [/* tus items */];