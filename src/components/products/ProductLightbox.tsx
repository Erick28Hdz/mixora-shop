
"use client";

import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

type Props = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    onClose: () => void;
};

export default function ProductLightbox({
    src,
    alt,
    width = 1600,
    height = 1600,
    onClose,
}: Props) {
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            dataSource: [
                {
                    src,
                    width,
                    height,
                    alt,
                },
            ],
            pswpModule: () => import("photoswipe"),
            showHideAnimationType: "fade",
            bgOpacity: 0.95,
        });

        lightbox.on("close", onClose);

        lightbox.init();
        lightbox.loadAndOpen(0);

        return () => {
            lightbox.destroy();
        };
    }, [src, alt, width, height, onClose]);

    return null;
}
