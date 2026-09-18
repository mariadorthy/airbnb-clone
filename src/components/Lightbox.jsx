import { useEffect, useRef } from "react";

function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const closeButtonRef = useRef(null);
  const lightboxRef = useRef(null);

  const image = images[activeIndex];
  const isFirstImage = activeIndex === 0;
  const isLastImage = activeIndex === images.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();

        if (!isFirstImage) {
          onPrevious();
        }

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();

        if (!isLastImage) {
          onNext();
        }

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      event.stopPropagation();

      const focusableControls = Array.from(
        lightboxRef.current?.querySelectorAll(
          "button:not([disabled])"
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
  }, [
    isFirstImage,
    isLastImage,
    onClose,
    onNext,
    onPrevious,
  ]);

  if (!image) {
    return null;
  }

  return (
    <div
      ref={lightboxRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <header className="lightbox__header">
        <button
          ref={closeButtonRef}
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <span aria-hidden="true">×</span>
          <span>Close</span>
        </button>

        <h2 id="lightbox-title" className="lightbox__counter">
          Photo {activeIndex + 1} of {images.length}
        </h2>
      </header>

      <div className="lightbox__content">
        <button
          type="button"
          className="lightbox__navigation lightbox__navigation--previous"
          onClick={onPrevious}
          disabled={isFirstImage}
          aria-label="Previous photo"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <figure className="lightbox__figure">
          <img src={image.src} alt={image.alt} />
        </figure>

        <button
          type="button"
          className="lightbox__navigation lightbox__navigation--next"
          onClick={onNext}
          disabled={isLastImage}
          aria-label="Next photo"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}

export default Lightbox;