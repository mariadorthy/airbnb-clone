import { useState } from "react";

function Description({ listing }) {
  const [expanded, setExpanded] = useState(false);

  const visibleDescription = expanded
    ? listing.description
    : listing.description.slice(0, 1);

  return (
    <>
      <section className="content-section" aria-labelledby="sleeping-title">
        <div className="section-heading">
          <h2 id="sleeping-title">Where you'll sleep</h2>
        </div>

        <div className="sleeping-grid">
          {listing.sleepingArrangements.map((arrangement) => (
            <article className="sleeping-card" key={arrangement.room}>
              <div className="sleeping-card__icon" aria-hidden="true">
                ▱
              </div>

              <h3>{arrangement.room}</h3>
              <p>{arrangement.beds}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section description-section"
        aria-labelledby="description-title"
      >
        <div className="section-heading">
          <h2 id="description-title">About this place</h2>
        </div>

        <div className="description-copy" id="description-copy">
          {visibleDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {listing.description.length > 1 && (
          <button
            className="text-button"
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls="description-copy"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </section>
    </>
  );
}

export default Description;
