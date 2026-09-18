import { useEffect, useRef } from "react";

function PhotoTour({
  images = [],
  sections = [],
  onClose,
  onOpenLightbox,
  isLightboxOpen,
}) {
  const closeButtonRef = useRef(null);
  const photoTourRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (isLightboxOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableControls = Array.from(
        photoTourRef.current?.querySelectorAll(
          "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"
        ) ?? []
      );

      if (focusableControls.length === 0) {
        event.preventDefault();
        return;
      }

      const firstControl = focusableControls[0];
      const lastControl =
        focusableControls[focusableControls.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstControl
      ) {
        event.preventDefault();
        lastControl.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastControl
      ) {
        event.preventDefault();
        firstControl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, onClose]);

  /*
   * Open the clicked Photo Tour image
   * inside the EXISTING Lightbox.
   */
  const openImage = (photo, event) => {
    if (!photo) return;

    const imageIndex = images.findIndex(
      (image) => image.id === photo.imageId
    );

    if (imageIndex === -1) {
      console.warn(
        `Photo Tour image "${photo.imageId}" was not found in listing.images`
      );

      return;
    }

    onOpenLightbox(
      imageIndex,
      event.currentTarget
    );
  };

  /*
   * Scroll to a Photo Tour section.
   */
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(
      `photo-tour-section-${sectionId}`
    );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div
      ref={photoTourRef}
      className="photo-tour"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tour-title"
    >
      {/* HEADER */}

      <header className="photo-tour__header">
        <button
          ref={closeButtonRef}
          type="button"
          className="photo-tour__close"
          onClick={onClose}
          aria-label="Close photo tour"
        >
          <span aria-hidden="true">×</span>
          <span>Close</span>
        </button>

        <h2 id="photo-tour-title">
          Photo tour
        </h2>
      </header>

      <div className="photo-tour__content">

        {/* LEFT THUMBNAILS */}

        <nav
          className="photo-tour__thumbnails"
          aria-label="Photo tour navigation"
        >
          {sections.map((section) => {
            const thumbnail =
              section.images?.[0];

            return (
              <button
                key={section.id}
                type="button"
                className="photo-tour__thumbnail"
                onClick={() =>
                  scrollToSection(section.id)
                }
                aria-label={`Go to ${section.title}`}
              >
                {thumbnail && (
                  <img
                    src={thumbnail.image}
                    alt=""
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* PHOTO TOUR */}

        <div className="photo-tour__sections">
          {sections.map((section) => {
            const galleryImages =
              section.images || [];

            const mainImage =
              galleryImages[0];

            const secondaryImage1 =
              galleryImages[1];

            const secondaryImage2 =
              galleryImages[2];

            return (
              <section
                className="photo-tour__section"
                key={section.id}
                id={`photo-tour-section-${section.id}`}
              >
                {/* INFORMATION */}

                <div className="photo-tour__section-info">
                  <h3>
                    {section.title}
                  </h3>

                  {section.description && (
                    <p>
                      {section.description}
                    </p>
                  )}

                  {section.details?.length > 0 && (
                    <ul className="photo-tour__details">
                      {section.details.map(
                        (detail) => (
                          <li key={detail}>
                            {detail}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>

                {/* GALLERY */}

                <div className="photo-tour__gallery">

                  {/* MAIN IMAGE */}

                  {mainImage && (
                    <figure className="photo-tour__gallery-main">
                      <button
                        type="button"
                        className="photo-tour__photo-button"
                        onClick={(event) =>
                          openImage(
                            mainImage,
                            event
                          )
                        }
                        aria-label={`Open ${section.title} photo`}
                      >
                        <img
                          src={mainImage.image}
                          alt={
                            mainImage.alt ||
                            section.title
                          }
                        />
                      </button>
                    </figure>
                  )}

                  {/* SECONDARY IMAGES */}

                  <div className="photo-tour__gallery-side">

                    {secondaryImage1 && (
                      <figure className="photo-tour__gallery-small">
                        <button
                          type="button"
                          className="photo-tour__photo-button"
                          onClick={(event) =>
                            openImage(
                              secondaryImage1,
                              event
                            )
                          }
                          aria-label={`Open ${section.title} second photo`}
                        >
                          <img
                            src={
                              secondaryImage1.image
                            }
                            alt={
                              secondaryImage1.alt ||
                              `${section.title} additional photo`
                            }
                          />
                        </button>
                      </figure>
                    )}

                    {secondaryImage2 && (
                      <figure className="photo-tour__gallery-small">
                        <button
                          type="button"
                          className="photo-tour__photo-button"
                          onClick={(event) =>
                            openImage(
                              secondaryImage2,
                              event
                            )
                          }
                          aria-label={`Open ${section.title} third photo`}
                        >
                          <img
                            src={
                              secondaryImage2.image
                            }
                            alt={
                              secondaryImage2.alt ||
                              `${section.title} additional photo`
                            }
                          />
                        </button>
                      </figure>
                    )}

                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotoTour;
