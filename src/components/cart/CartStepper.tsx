type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  label?: string;
  small?: boolean;
};

export default function CartStepper({
  quantity,
  onDecrease,
  onIncrease,
  label,
  small = false,
}: Props) {
  return (
    <div
      className={`stepper${small ? " small" : ""}`}
      role="group"
      aria-label={label ?? "Cantidad"}
    >
      <button
        onClick={onDecrease}
        aria-label="Quitar uno"
      >
        −
      </button>

      <span aria-live="polite">{quantity}</span>

      <button
        onClick={onIncrease}
        aria-label="Agregar uno"
      >
        +
      </button>
    </div>
  );
}