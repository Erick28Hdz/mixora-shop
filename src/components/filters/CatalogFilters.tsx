type Props = {
  categorias: string[];
  query: string;
  categoria: string;
  soloDisp: boolean;
  onQueryChange: (value: string) => void;
  onCategoriaChange: (value: string) => void;
  onSoloDispChange: (value: boolean) => void;
};

export default function CatalogFilters({
  categorias,
  query,
  categoria,
  soloDisp,
  onQueryChange,
  onCategoriaChange,
  onSoloDispChange,
}: Props) {
  return (
    <section className="wrap toolbar" aria-label="Filtros">
      <input
        className="search"
        type="search"
        placeholder="Buscar productos…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Buscar productos"
      />

      <div className="chips" role="group" aria-label="Categorías">
        {categorias.map((c) => (
          <button
            key={c}
            className={`chip${c === categoria ? " on" : ""}`}
            onClick={() => onCategoriaChange(c)}
            aria-pressed={c === categoria}
          >
            {c}
          </button>
        ))}
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={soloDisp}
          onChange={(e) => onSoloDispChange(e.target.checked)}
        />
        Solo disponibles
      </label>
    </section>
  );
}