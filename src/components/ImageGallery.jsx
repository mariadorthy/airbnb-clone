function ImageGallery({
  images,
  onOpenPhotoTour,
  onOpenLightbox,
}) {
  const [hero, ...secondaryImages] = images;

  if (!hero) {
    return null;
  }

  const visibleSecondaryImages = secondaryImages.slice(0, 4);

  return (
    <section
      className="gallery"
      aria-label="Property photos"
    >
      <button
        type="button"
        className="gallery__hero gallery__photo-button"
        onClick={(event) =>
          onOpenLightbox(0, event.currentTarget)
        }
        aria-label={`Open photo 1 of ${images.length}: ${hero.alt}`}
      >
        <img
          src={hero.src}
          alt={hero.alt}
        />
      </button>

      <div className="gallery__secondary">
        {visibleSecondaryImages.map((image, index) => {
          const imageIndex = index + 1;

          return (
            <button
              type="button"
              className="gallery__item gallery__photo-button"
              key={image.id}
              onClick={(event) =>
                onOpenLightbox(
                  imageIndex,
                  event.currentTarget,
                )
              }
              aria-label={`Open photo ${imageIndex + 1} of ${images.length}: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="gallery__show-all"
        onClick={(event) =>
          onOpenPhotoTour(event.currentTarget)
        }
        aria-label={`Show all ${images.length} photos`}
      >
        <span aria-hidden="true">⊞</span>
        Show all photos
      </button>
    </section>
  );
}

export default ImageGallery;
