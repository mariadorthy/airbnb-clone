import { useState } from "react";

function ListingHeader({ listing }) {
  const [saved, setSaved] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: `${listing.title} — ${listing.location}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback("Listing shared.");
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setShareFeedback("");
          return;
        }
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback("Listing link copied to your clipboard.");
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      setShareFeedback(
        copied
          ? "Listing link copied to your clipboard."
          : "Copy the page URL from your browser to share this listing.",
      );
    } catch {
      setShareFeedback(
        "Copy the page URL from your browser to share this listing.",
      );
    }
  };

  const handleSave = () => {
    setSaved((current) => !current);
  };

  return (
    <section className="listing-header" aria-labelledby="listing-title">
      <div>
        <h1 id="listing-title">{listing.title}</h1>

        <div className="listing-meta">
          <span className="meta-rating">
            <span aria-hidden="true">★</span>
            {listing.rating}
          </span>

          <a href="#reviews" className="meta-link">
            {listing.reviewCount} reviews
          </a>

          <span aria-hidden="true">·</span>

          <a href="#location" className="meta-link">
            {listing.location}
          </a>
        </div>
      </div>

      <div>
        <div className="listing-actions" aria-label="Listing actions">
          <button
            type="button"
            className="text-action"
            onClick={handleShare}
            aria-describedby="share-feedback"
          >
            <span aria-hidden="true">↗</span>
            Share
          </button>

          <button
            type="button"
            className="text-action"
            onClick={handleSave}
            aria-pressed={saved}
            aria-label={saved ? "Remove listing from saved" : "Save listing"}
          >
            <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
            {saved ? "Saved" : "Save"}
          </button>
        </div>

        <p
          id="share-feedback"
          className="interaction-feedback"
          aria-live="polite"
        >
          {shareFeedback}
        </p>
      </div>
    </section>
  );
}

export default ListingHeader;
