type Props = {
  count: number;
  total: string;
  onClick: () => void;
};

export default function CartButton({
  count,
  total,
  onClick,
}: Props) {
  if (count === 0) return null;

  return (
    <button className="floatbar" onClick={onClick}>
      <span>
        Ver pedido · {count}{" "}
        {count === 1 ? "producto" : "productos"}
      </span>

      <strong>{total}</strong>
    </button>
  );
}