import { useEffect, useRef, useState } from "react";

const ICONS = {
  Kitchen: "🍴",
  Wifi: "⌁",
  "Dedicated workspace": "▣",
  "Free parking on premises": "▱",
  Pool: "≋",
  "Hot tub": "♨",
  "Pets allowed": "♧",
  "Exterior security cameras on property": "▣",
  "Carbon monoxide alarm": "◉",
  "Smoke alarm": "◉",

  Hairdryer: "⌁",
  "Cleaning products": "✦",
  Shampoo: "◌",
  "Hot water": "♨",
  "Shower gel": "◌",

  "Washing machine": "◫",
  Hangers: "⌒",
  "Bed linen": "▱",
  "Room-darkening blinds": "▤",
  Iron: "⌁",
  "Clothes storage": "▤",
  Cot: "▱",

  TV: "▣",

  "Air conditioning": "❄",
  "Ceiling fan": "◉",

  Fridge: "▥",
  Freezer: "▥",
  Microwave: "▥",
  "Cooking basics": "♨",
  "Crockery and cutlery": "🍴",
  Kettle: "♨",
  Coffee: "☕",
  "Wine glasses": "♢",
  Toaster: "▤",
  Blender: "◉",
  Cooker: "♨",

  "Private entrance": "↪",

  "Patio or balcony": "▱",
  "Outdoor dining area": "♢",

  Gym: "♧",
  "Exercise equipment": "♧",

  "Cleaning available during stay": "✦",
  "Long-term stays allowed": "↔",
  "Self check-in": "↪",
};

const UNAVAILABLE_AMENITIES = new Set([
  "Carbon monoxide alarm",
  "Smoke alarm",
]);

function AmenityIcon({ name }) {
  const icon = ICONS[name] || "◇";

  return (
    <span
      className="amenity__icon"
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
function Amenities({ amenities, amenityCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  const visibleAmenities = amenities.slice(0, 10);

  const totalAmenityCount = amenityCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  const openModal = (event) => {
    triggerRef.current = event.currentTarget;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        className="content-section"
        aria-labelledby="amenities-title"
      >
        <div className="section-heading">
          <h2 id="amenities-title">
            What this place offers
          </h2>
        </div>

        <div
          className="amenities-grid"
          id="amenities-list"
        >
          {visibleAmenities.map((amenity) => {
  const isUnavailable = UNAVAILABLE_AMENITIES.has(amenity);

  return (
    <div
      key={amenity}
      className={`amenity${isUnavailable ? " amenity--unavailable" : ""}`}
      aria-label={isUnavailable ? `${amenity}, unavailable` : amenity}
    >
      <AmenityIcon name={amenity} />

      <span className="amenity__name">
        {amenity}
      </span>
    </div>
  );
})}
        </div>

        <button
          ref={triggerRef}
          className="secondary-button"
          type="button"
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          aria-controls="amenities-dialog"
        >
          Show all {totalAmenityCount} amenities
        </button>
      </section>

      {isModalOpen && (
        <div
          className="amenities-modal__backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={modalRef}
            id="amenities-dialog"
            className="amenities-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="amenities-modal-title"
            tabIndex="-1"
          >
            <div className="amenities-modal__header">
              <h2 id="amenities-modal-title">
                What this place offers
              </h2>

              <button
                className="amenities-modal__close"
                type="button"
                onClick={closeModal}
                aria-label="Close amenities"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="amenities-modal__content">
              {amenityCategories.map((category) => (
                <section
                  className="amenities-category"
                  key={category.title}
                  aria-labelledby={`amenity-${category.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <h3
                    id={`amenity-${category.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    {category.title}
                  </h3>

                  <div className="amenities-category__grid">
                   {category.items.map((item) => {
  const isUnavailable = UNAVAILABLE_AMENITIES.has(item);

  return (
    <div
      key={item}
      className={`amenity amenity--modal${
        isUnavailable ? " amenity--unavailable" : ""
      }`}
      aria-label={isUnavailable ? `${item}, unavailable` : item}
    >
      <AmenityIcon name={item} />

      <span className="amenity__name">
        {item}
      </span>
    </div>
  );
})}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Amenities;
