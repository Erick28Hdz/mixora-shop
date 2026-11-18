
type Props = {
  count: number;
  total: string;
  onClick: () => void;
};

export default function FloatingCart({
  count,
  total,
  onClick,
}: Props) {
  if (count === 0) return null;

  return (
    <button
      className="floatbar"
      onClick={onClick}
      aria-label={`Ver pedido: ${count} productos, total ${total}`}
    >
      <span>
        Ver pedido · {count}{" "}
        {count === 1 ? "producto" : "productos"}
      </span>

      <strong>{total}</strong>
    </button>
  );
}
