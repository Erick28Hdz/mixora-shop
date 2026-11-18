import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  cart: Record<string, number>;
  formatPrice: (price: number) => string;
  onAdd: (id: string) => void;
  onDecrease: (id: string) => void;
};

export default function ProductGrid({
  products,
  cart,
  formatPrice,
  onAdd,
  onDecrease,
}: Props) {
  return (
    <ul className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id] ?? 0}
          price={formatPrice(product.precio)}
          onAdd={() => onAdd(product.id)}
          onDecrease={() => onDecrease(product.id)}
        />
      ))}
    </ul>
  );
}