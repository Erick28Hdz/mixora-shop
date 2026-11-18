import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";
import CartStepper from "../cart/CartStepper";

type Props = {
  product: Product;
  quantity: number;
  price: string;
  onAdd: () => void;
  onDecrease: () => void;
};

export default function ProductCard({
  product,
  quantity,
  price,
  onAdd,
  onDecrease,
}: Props) {
  return (
    <li
      className={`card${product.disponible ? "" : " soldout"}`}
    >
      <div className="media">
        <ProductImage
          src={product.imagen}
          alt={product.nombre}
        />

        {!product.disponible && (
          <span className="badge badge-out">
            Agotado
          </span>
        )}

        {product.disponible && product.destacado && (
          <span className="badge badge-hot">
            Destacado
          </span>
        )}
      </div>

      <div className="body">
        {product.categoria && (
          <span className="cat">
            {product.categoria}
          </span>
        )}

        <h2 className="name">{product.nombre}</h2>

        {product.descripcion && (
          <p className="desc">{product.descripcion}</p>
        )}

        <div className="row">
          <span className="price">{price}</span>

          {!product.disponible ? (
            <span className="na">No disponible</span>
          ) : quantity === 0 ? (
            <button className="add" onClick={onAdd}>
              Agregar
            </button>
          ) : (
            <CartStepper
              quantity={quantity}
              onDecrease={onDecrease}
              onIncrease={onAdd}
              label={`Cantidad de ${product.nombre}`}
            />
          )}
        </div>
      </div>
    </li>
  );
}