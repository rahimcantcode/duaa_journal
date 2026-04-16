import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duaa Journal",
    short_name: "Duaa",
    description: "A soft, private space for duaas, reflections, and a calm Hajj journey.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F6F7F5",
    theme_color: "#A8BFA3",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
