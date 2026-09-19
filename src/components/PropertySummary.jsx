function PropertySummary({ listing }) {
  return (
    <section className="content-section property-summary" aria-labelledby="summary-title">
      <div className="section-heading">
        <h2 id="summary-title">
          {listing.guestCount} guests · {listing.bedroomCount} bedrooms ·{" "}
          {listing.bedCount} beds · {listing.bathroomCount} bathrooms
        </h2>
        <p>
  Entire serviced apartment in {listing.location}
</p>
      </div>

      <div className="host-preview">
        <img
  src={listing.host.avatar}
  alt={`${listing.host.name}, your host`}
  className="host-preview__avatar"
  onError={(event) => {
    event.currentTarget.style.visibility = "hidden";
  }}
/>
        <div>
          <strong>Hosted by {listing.host.name}</strong>
          <span>{listing.host.yearsHosting} years hosting</span>
        </div>
      </div>

      <div className="highlight-list">
        {listing.highlights.map((highlight) => (
          <article className="highlight" key={highlight.title}>
            <span className="highlight__icon" aria-hidden="true">
              ◆
            </span>

            <div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PropertySummary;