type Props = {
  negocio: string;
  count: number;
  onOpenCart: () => void;
};

export default function CatalogHeader({
  negocio,
  count,
  onOpenCart,
}: Props) {
  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <a className="brand" href="#">
          {negocio}
        </a>

        <button
          className="cartbtn"
          onClick={onOpenCart}
          aria-label={`Abrir pedido, ${count} productos`}
        >
          <span>Mi pedido</span>
          <span className="count" aria-hidden="true">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}