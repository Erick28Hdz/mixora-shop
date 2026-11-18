
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

import CatalogHeader from "./layout/CatalogHeader";
import CatalogHero from "./layout/CatalogHero";
import CatalogFooter from "./layout/CatalogFooter";

import CatalogFilters from "./filters/CatalogFilters";

import ProductGrid from "./products/ProductGrid";

import CartButton from "./cart/CartButton";
import CartDrawer from "./cart/CartDrawer";
import FloatingCart from "./cart/FloatingCart";

type Props = {
  products: Product[];
  source: "sheet" | "demo";
  error?: string;
  negocio: string;
  whatsapp: string;
  moneda: string;
};

const STORAGE_KEY = "catalogo-carrito-v1";

function makeFormatter(moneda: string): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    });
  } catch {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  }
}

function norm(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Catalog({
  products,
  source,
  error,
  negocio,
  whatsapp,
  moneda,
}: Props) {
  // Estados
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [soloDisp, setSoloDisp] = useState(false);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Formato de moneda
  const fmt = useMemo(
    () => makeFormatter(moneda),
    [moneda],
  );

  const formatPrice = (price: number) => fmt.format(price);

  // Cargar carrito
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed: unknown = JSON.parse(raw);

        if (parsed && typeof parsed === "object") {
          const clean: Record<string, number> = {};

          for (const [key, value] of Object.entries(
            parsed as Record<string, unknown>,
          )) {
            if (
              typeof value === "number" &&
              Number.isFinite(value) &&
              value > 0
            ) {
              clean[key] = Math.floor(value);
            }
          }

          setCart(clean);
        }
      }
    } catch {
      // Sin almacenamiento disponible
    }

    setLoaded(true);
  }, []);

  // Guardar carrito
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart),
      );
    } catch {
      // Ignorar
    }
  }, [cart, loaded]);

  // Control del panel lateral
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Categorías
  const categorias = useMemo(() => {
    const set = new Set<string>();

    products.forEach((product) => {
      if (product.categoria) {
        set.add(product.categoria);
      }
    });

    return ["Todas", ...Array.from(set)];
  }, [products]);

  // Filtrar productos
  const filtered = useMemo(() => {
    const q = norm(query.trim());

    return products.filter((product) => {
      if (
        categoria !== "Todas" &&
        product.categoria !== categoria
      ) {
        return false;
      }

      if (soloDisp && !product.disponible) {
        return false;
      }

      if (!q) return true;

      return norm(
        `${product.nombre} ${product.descripcion} ${product.categoria}`,
      ).includes(q);
    });
  }, [products, query, categoria, soloDisp]);

  // Productos del carrito
  const items = useMemo(
    () =>
      products
        .filter(
          (product) =>
            product.disponible &&
            (cart[product.id] ?? 0) > 0,
        )
        .map((product) => ({
          p: product,
          qty: cart[product.id],
        })),
    [products, cart],
  );

  // Totales
  const count = items.reduce(
    (sum, item) => sum + item.qty,
    0,
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.qty * item.p.precio,
    0,
  );

  // Acciones del carrito
  const add = (id: string) => {
    setCart((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
  };

  const dec = (id: string) => {
    setCart((current) => {
      const next = { ...current };

      if ((next[id] ?? 0) <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }

      return next;
    });
  };

  const remove = (id: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const clear = () => setCart({});

  // Preparar pedido
  const orderText = useMemo(() => {
    const lines = items.map(
      ({ p, qty }) =>
        `• ${qty} x ${p.nombre} — ${fmt.format(p.precio * qty)}`,
    );

    return `Hola ${negocio}, quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal: ${fmt.format(total)}`;
  }, [items, fmt, negocio, total]);

  // Enviar pedido
  const sendOrder = async () => {
    if (whatsapp) {
      window.open(
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(orderText)}`,
        "_blank",
        "noopener,noreferrer",
      );

      return;
    }

    try {
      await navigator.clipboard.writeText(orderText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Ignorar
    }
  };


  return (
    <>
      {/* Encabezado */}
      <CatalogHeader
        negocio={negocio}
        count={count}
        onOpenCart={() => setOpen(true)}
      />

      <main>
        {/* Presentación */}
        <CatalogHero />

        {/* Mensajes del catálogo */}
        {source === "demo" && (
          <div className="wrap">
            <div className="banner">
              Estás viendo productos de ejemplo. Conecta
              tu hoja de cálculo en .env.local (mira el README).
            </div>
          </div>
        )}

        {error && (
          <div className="wrap">
            <div className="banner banner-error" role="alert">
              No se pudieron cargar los productos: {error}
            </div>
          </div>
        )}

        {/* Filtros */}
        <CatalogFilters
          categorias={categorias}
          query={query}
          categoria={categoria}
          soloDisp={soloDisp}
          onQueryChange={setQuery}
          onCategoriaChange={setCategoria}
          onSoloDispChange={setSoloDisp}
        />

        {/* Productos */}
        <section className="wrap">
          {filtered.length === 0 ? (
            <p className="empty">
              {products.length === 0
                ? "Aún no hay productos para mostrar."
                : "No encontramos productos con esa búsqueda."}
            </p>
          ) : (
            <ProductGrid
              products={filtered}
              cart={cart}
              formatPrice={formatPrice}
              onAdd={add}
              onDecrease={dec}
            />
          )}
        </section>
      </main>

      {/* Pie de página */}
      <CatalogFooter negocio={negocio} />

      {/* Carrito flotante */}
      <FloatingCart
        count={open ? 0 : count}
        total={formatPrice(total)}
        onClick={() => setOpen(true)}
      />

      {/* Panel lateral */}
      <CartDrawer
        open={open}
        items={items}
        total={total}
        formatPrice={formatPrice}
        onClose={() => setOpen(false)}
        onAdd={add}
        onDecrease={dec}
        onRemove={remove}
        onClear={clear}
        onSendOrder={sendOrder}
        whatsapp={whatsapp}
        copied={copied}
      />
    </>
  );

}
