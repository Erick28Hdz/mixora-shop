import type { Product } from "@/lib/types";
import CartItem from "./CartItem";

type CartEntry = {
  p: Product;
  qty: number;
};

type Props = {
  open: boolean;
  items: CartEntry[];
  total: number;
  formatPrice: (price: number) => string;
  onClose: () => void;
  onAdd: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSendOrder: () => void;
  whatsapp: string;
  copied: boolean;
};

export default function CartDrawer({
  open,
  items,
  total,
  formatPrice,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
  onClear,
  onSendOrder,
  whatsapp,
  copied,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={onClose} />

      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mi pedido"
      >
        <div className="drawer-head">
          <h2>Mi pedido</h2>

          <button
            className="close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty">
            Todavía no has agregado productos.
          </p>
        ) : (
          <>
            <ul className="lines">
              {items.map(({ p, qty }) => (
                <CartItem
                  key={p.id}
                  product={p}
                  quantity={qty}
                  formatPrice={formatPrice}
                  onAdd={() => onAdd(p.id)}
                  onDecrease={() => onDecrease(p.id)}
                  onRemove={() => onRemove(p.id)}
                />
              ))}
            </ul>

            <div className="drawer-foot">
              <div className="total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button className="send" onClick={onSendOrder}>
                {whatsapp
                  ? "Pedir por WhatsApp"
                  : copied
                    ? "¡Pedido copiado!"
                    : "Copiar pedido"}
              </button>

              {!whatsapp && (
                <p className="hint">
                  Configura WHATSAPP_NUMERO en .env.local
                  para enviar el pedido directo por WhatsApp.
                </p>
              )}

              <button className="link" onClick={onClear}>
                Vaciar pedido
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}