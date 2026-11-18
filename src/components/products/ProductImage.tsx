
"use client";

import { useState } from "react";
import ProductLightbox from "./ProductLightbox";

type Props = {
    src: string;
    alt: string;
};

export default function ProductImage({ src, alt }: Props) {
    const [failed, setFailed] = useState(false);
    const [zoomOpen, setZoomOpen] = useState(false);

    if (!src || failed) {
        return (
            <div className="media-fallback" aria-hidden="true">
                {alt.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <>
            <button
                type="button"
                className="product-image-trigger"
                onClick={() => setZoomOpen(true)}
                aria-label={`Ampliar imagen de ${alt}`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setFailed(true)}
                />

                <span className="image-zoom-icon" aria-hidden="true">
                    ⌕
                </span>
            </button>

            {zoomOpen && (
                <ProductLightbox
                    src={src}
                    alt={alt}
                    onClose={() => setZoomOpen(false)}
                />
            )}
        </>
    );
}
