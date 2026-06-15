"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * Preloads all gallery and venue images in the background so they're cached
 * by the time the user scrolls to them. Renders nothing visible.
 */
export function ImagePreloader() {
  useEffect(() => {
    const urls: string[] = [];

    // Venue image
    if (site.venue.image) {
      urls.push(site.venue.image);
    }

    // All gallery cover + photo images
    for (const album of site.memories.albums) {
      if (album.cover) urls.push(album.cover);
      for (const photo of album.photos) {
        if (photo.src) urls.push(photo.src);
      }
    }

    // Deduplicate (covers often repeat a photo src)
    const unique = [...new Set(urls)];

    // Preload each image in the background
    for (const src of unique) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  return null;
}
