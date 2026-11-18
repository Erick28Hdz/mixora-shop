
type Props = {
  negocio: string;
};

export default function CatalogFooter({ negocio }: Props) {
  return (
    <footer className="footer wrap">
      <p>
        {negocio} · Los precios y la disponibilidad se
        actualizan automáticamente desde nuestra hoja de
        productos.
      </p>

      <p>
        Los productos se elaboran por encargo y están
        sujetos a disponibilidad. Cada producto cuenta
        con una sola unidad. No incluye cajas de muestra.
      </p>

      <p className="footer-credit">
        Página web desarrollada por{" "}
        <a
          href="https://satcore.solutions"
          target="_blank"
          rel="noopener noreferrer"
        >
          SatCore Solutions
        </a>
        .
      </p>
    </footer>
  );
}
