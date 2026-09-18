import { useEffect, useRef } from "react";

function PhotoTour({
  images,
  sections,
  onClose,
  onOpenLightbox,
  isLightboxOpen,
}) {
  const closeButtonRef = useRef(null);
  const photoTourRef = useRef(null);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow =
        previousOverflow;
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
          "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
        ) ?? [],
      );

      if (focusableControls.length === 0) {
        event.preventDefault();
        return;
      }

      const firstControl =
        focusableControls[0];

      const lastControl =
        focusableControls[
          focusableControls.length - 1
        ];

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

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isLightboxOpen, onClose]);

  const scrollToImage = (index) => {
    const target =
      document.getElementById(
        `photo-tour-image-${index}`,
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
        <nav
          className="photo-tour__thumbnails"
          aria-label="Photo tour navigation"
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              ref={(element) => {
                thumbnailRefs.current[index] =
                  element;
              }}
              type="button"
              className="photo-tour__thumbnail"
              onClick={() =>
                scrollToImage(index)
              }
              aria-label={`Go to photo ${index + 1}: ${image.alt}`}
            >
              <img
                src={image.src}
                alt=""
              />
            </button>
          ))}
        </nav>

        <div className="photo-tour__sections">
          {sections.map((section, sectionIndex) => (
  <section
    className="photo-tour__section"
    key={section.id}
  >
    <div className="photo-tour__section-info">
      <h3>{section.title}</h3>

      <p>{section.description}</p>

      {section.details?.length > 0 && (
        <ul className="photo-tour__details">
          {section.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </div>

    <div className="photo-tour__grid">
      <figure
        id={`photo-tour-section-${section.id}`}
        className="photo-tour__item"
      >
        <button
          type="button"
          className="photo-tour__photo-button"
          onClick={(event) =>
            onOpenLightbox(
              sectionIndex,
              event.currentTarget,
            )
          }
          aria-label={`Open ${section.title}`}
        >
          <img
            src={section.image}
            alt={section.title}
          />
        </button>
      </figure>
    </div>
  </section>
))}

        </div>
      </div>
    </div>
  );
}

export default PhotoTour;
