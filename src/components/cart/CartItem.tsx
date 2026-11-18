import type { Product } from "@/lib/types";
import CartStepper from "./CartStepper";

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  formatPrice: (price: number) => string;
};

export default function CartItem({
  product,
  quantity,
  onAdd,
  onDecrease,
  onRemove,
  formatPrice,
}: Props) {
  return (
    <li className="line">
      <div className="line-info">
        <strong>{product.nombre}</strong>
        <span>{formatPrice(product.precio)} c/u</span>
      </div>

      <CartStepper
        quantity={quantity}
        onDecrease={onDecrease}
        onIncrease={onAdd}
        label={`Cantidad de ${product.nombre}`}
        small
      />

      <span className="line-total">
        {formatPrice(product.precio * quantity)}
      </span>

      <button
        className="trash"
        onClick={onRemove}
        aria-label={`Eliminar ${product.nombre}`}
      >
        ✕
      </button>
    </li>
  );
}