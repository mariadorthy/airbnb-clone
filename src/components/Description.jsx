import { useState } from "react";

function Description({ listing }) {
  const [expanded, setExpanded] = useState(false);

  const description = listing.description.join("\n\n");
  const maxLength = 250;

  const shouldTruncate = description.length > maxLength;

  const visibleDescription =
    expanded || !shouldTruncate
      ? description
      : `${description.slice(0, maxLength)}...`;

  return (
    <section
      className="content-section description-section"
      aria-labelledby="description-title"
    >
      <div className="section-heading">
        <h2 id="description-title">About this place</h2>
      </div>

      <div
        className="description-copy"
        id="description-copy"
      >
        <p>{visibleDescription}</p>
      </div>

      {shouldTruncate && (
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
  );
}

export default Description;
