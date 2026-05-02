/** JPEGs served from `/public` — add or remove files here when the folder changes */
export const publicGalleryFilenames = [
  "IMG_7470.JPG.jpeg",
  "IMG_7471.JPG.jpeg",
  "IMG_7472.JPG.jpeg",
  "IMG_7473.JPG.jpeg",
  "IMG_7475.JPG.jpeg",
  "IMG_7476.JPG.jpeg",
  "IMG_7477.JPG.jpeg",
  "IMG_7478.JPG.jpeg",
  "IMG_7479.JPG.jpeg",
  "IMG_7480.JPG.jpeg",
  "IMG_7481.JPG.jpeg",
  "IMG_7482.JPG.jpeg",
  "IMG_7483.JPG.jpeg",
  "IMG_7484.JPG.jpeg",
] as const;

export const publicGalleryUrls = publicGalleryFilenames.map(
  (name) => `${import.meta.env.BASE_URL}${encodeURI(name)}`
);
