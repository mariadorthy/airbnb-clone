import { useRef, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import ListingHeader from "./components/ListingHeader";
import ImageGallery from "./components/ImageGallery";
import PhotoTour from "./components/PhotoTour";
import Lightbox from "./components/Lightbox";
import PropertySummary from "./components/PropertySummary";
import Amenities from "./components/Amenities";
import Description from "./components/Description";
import ReservationCard from "./components/ReservationCard";
import Footer from "./components/Footer";
import { listing } from "./data/listing";

function App() {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photoTourTriggerRef = useRef(null);
  const lightboxTriggerRef = useRef(null);

  const openPhotoTour = (triggerElement) => {
    photoTourTriggerRef.current = triggerElement;
    setIsPhotoTourOpen(true);
  };

  const closePhotoTour = () => {
    setIsPhotoTourOpen(false);

    requestAnimationFrame(() => {
      photoTourTriggerRef.current?.focus();
    });
  };

  const openLightbox = (index, triggerElement) => {
    lightboxTriggerRef.current = triggerElement;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);

    requestAnimationFrame(() => {
      lightboxTriggerRef.current?.focus();
    });
  };

  const showPreviousPhoto = () => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || currentIndex <= 0) {
        return currentIndex;
      }

      return currentIndex - 1;
    });
  };

  const showNextPhoto = () => {
    setLightboxIndex((currentIndex) => {
      if (
        currentIndex === null ||
        currentIndex >= listing.images.length - 1
      ) {
        return currentIndex;
      }

      return currentIndex + 1;
    });
  };

  return (
    <div className="app">
      <Header />

      <main>
        <div className="page-container">
          <ListingHeader listing={listing} />

          <ImageGallery
            images={listing.images}
            onOpenPhotoTour={openPhotoTour}
            onOpenLightbox={openLightbox}
          />

          <div className="listing-layout">
            <div className="listing-main">
             {/* Property details below gallery */}
<section
  className="property-details"
  aria-labelledby="property-details-title"
>
  <h2 id="property-details-title">
    Entire serviced apartment in Candolim, India
  </h2>

  <p>
    {listing.guestCount} guests · {listing.bedroomCount} bedroom ·{" "}
    {listing.bedCount} bed · {listing.bathroomCount} bathroom
  </p>
</section>

{/* Property summary / highlights */}
<PropertySummary listing={listing} />

{/* Sleeping arrangements */}
<section
  className="content-section sleeping-section"
  aria-labelledby="sleeping-title"
>
  <div className="section-heading">
    <h2 id="sleeping-title">Where you'll sleep</h2>
  </div>

  <div className="sleeping-grid">
    {listing.sleepingArrangements.map((item) => (
      <article
        className="sleeping-card"
        key={item.room}
      >
        <div
          className="sleeping-card__icon"
          aria-hidden="true"
        >
          {item.room === "Bedroom" ? "🛏" : "🛋"}
        </div>

        <h3>{item.room}</h3>
        <p>{item.beds}</p>
      </article>
    ))}
  </div>
</section>

              {/* Description */}
              <Description listing={listing} />

              {/* Amenities */}
              <Amenities
                amenities={listing.amenities}
                amenityCategories={listing.amenityCategories}
              />

              {/* Photo tour */}
              <section
                className="content-section"
                aria-labelledby="photo-tour-section-title"
              >
                <div className="section-heading">
                  <h2 id="photo-tour-section-title">
                    Take a tour of this home
                  </h2>
                  <p>
                    Explore the rooms, amenities and spaces.
                  </p>
                </div>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={(event) =>
                    openPhotoTour(event.currentTarget)
                  }
                >
                  View photo tour
                </button>
              </section>

              {/* Location */}
              <section
                className="content-section location-section"
                id="location"
                aria-labelledby="location-title"
              >
                <div className="section-heading">
                  <h2 id="location-title">
                    Where you'll be
                  </h2>

                  <p>
                    {listing.locationDetails.location}
                  </p>
                </div>

                <div
                  className="map-placeholder"
                  aria-label="Map showing approximate location in Candolim, Goa"
                >
                  <span aria-hidden="true">◎</span>

                  <strong>
                    Candolim, Goa
                  </strong>

                  <p>
                    {listing.location}
                  </p>
                </div>

                <div className="location-info">
                  <p className="location-note">
                    {listing.locationDetails.exactLocation}
                  </p>

                  <div className="location-highlights">
                    <h3>
                      Neighbourhood highlights
                    </h3>

                    <p>
                      {
                        listing.locationDetails
                          .neighbourhoodHighlights
                      }
                    </p>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section
                className="reviews-section"
                id="reviews"
                aria-labelledby="reviews-title"
              >
                <div className="section-heading">
                  <h2 id="reviews-title">
                    Reviews
                  </h2>

                  <div className="reviews-header">
                    <span className="reviews-header__rating">
                      <span
                        className="reviews-header__star"
                        aria-hidden="true"
                      >
                        ★
                      </span>

                      {listing.rating}
                    </span>

                    <span className="reviews-header__separator">
                      ·
                    </span>

                    <span className="reviews-header__count">
                      {listing.reviewCount} reviews
                    </span>
                  </div>
                </div>

                {/* Rating breakdown */}
                <div className="review-breakdown">
                  {listing.ratingBreakdown.map((item) => {
                    const percentage =
                      (item.rating / 5) * 100;

                    return (
                      <div
                        className="review-breakdown__item"
                        key={item.label}
                      >
                        <span className="review-breakdown__label">
                          {item.label}
                        </span>

                        <div
                          className="review-breakdown__bar"
                          aria-hidden="true"
                        >
                          <span
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span className="review-breakdown__rating">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Review topics */}
                <div
                  className="review-chips"
                  aria-label="Review topics"
                >
                  {listing.reviewChips.map((chip) => (
                    <span
                      className="review-chip"
                      key={chip.label}
                    >
                      {chip.label}

                      <strong>
                        {chip.count}
                      </strong>
                    </span>
                  ))}
                </div>

                {/* Review list */}
                <div className="reviews-list">
                  {listing.reviews.map((review) => (
                    <article
                      className="review-item"
                      key={review.id}
                    >
                      <div className="review-item__header">
                        <img
                          src={review.avatar}
                          alt=""
                          className="review-item__avatar"
                        />

                        <div className="review-item__author">
                          <strong>
                            {review.name}
                          </strong>

                          <span>
                            {review.hosting}
                          </span>
                        </div>
                      </div>

                      <p className="review-item__text">
                        {review.text}
                      </p>

                      <p className="review-item__date">
                        {review.date}
                      </p>
                    </article>
                  ))}
                </div>

                <button
                  className="reviews-show-more"
                  type="button"
                >
                  Show all {listing.reviewCount} reviews
                </button>
              </section>

            {/* Host */}
<section
  className="content-section host-section"
  id="host"
  aria-labelledby="host-title"
>
  <div className="section-heading">
    <h2 id="host-title">Meet your host</h2>
  </div>

  <div className="host-layout">
    <div className="host-profile">
      <img
        src={listing.host.avatar}
        alt={`${listing.host.name}, host`}
        className="host-profile__avatar"
      />

      <div className="host-profile__info">
        <h3>{listing.host.name}</h3>
        <p>{listing.hostDetails.type}</p>
      </div>
    </div>

    <div className="host-stats">
      <div>
        <strong>
          {listing.host.reviewCount.toLocaleString()}
        </strong>
        <span>Reviews</span>
      </div>

      <div>
        <strong>
          {listing.host.rating.toFixed(2)}★
        </strong>
        <span>Rating</span>
      </div>

      <div>
        <strong>{listing.host.yearsHosting}</strong>
        <span>Years hosting</span>
      </div>
    </div>

    <div className="host-details">
      <p>{listing.hostDetails.facts[0]}</p>
      <p>{listing.hostDetails.facts[1]}</p>
      <p>
        Response rate:{" "}
        {listing.hostDetails.responseRate}
      </p>
      <p>{listing.hostDetails.responseTime}</p>
    </div>
  </div>

  <button
    className="secondary-button"
    type="button"
  >
    Message host
  </button>
</section>

              {/* Things to know */}
              <section
                className="content-section things-section"
                aria-labelledby="things-title"
              >
                <div className="section-heading">
                  <h2 id="things-title">
                    Things to know
                  </h2>
                </div>

                <div className="things-grid">
                  <div className="things-column">
                    <h3>
                      House rules
                    </h3>

                    <ul>
                      {listing.thingsToKnow.houseRules.map(
                        (rule) => (
                          <li key={rule}>
                            {rule}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="things-column">
                    <h3>
                      Safety & property
                    </h3>

                    <ul>
                      {listing.thingsToKnow.safety.map(
                        (item) => (
                          <li key={item}>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="things-column">
                    <h3>
                      Cancellation policy
                    </h3>

                    <p>
                      {
                        listing.thingsToKnow
                          .cancellationPolicy.text
                      }
                    </p>

                    <button
                      className="text-button"
                      type="button"
                    >
                      {
                        listing.thingsToKnow
                          .cancellationPolicy.linkLabel
                      }
                    </button>
                  </div>
                </div>
              </section>

              {/* Nearby stays */}
              <section
                className="content-section nearby-section"
                aria-labelledby="nearby-title"
              >
                <div className="section-heading">
                  <h2 id="nearby-title">
                    Places to stay nearby
                  </h2>
                </div>

                <div className="nearby-stays">
                  {listing.nearbyStays.map((stay) => (
                    <article
                      className="nearby-stay"
                      key={stay.id}
                    >
                      <img
                        src={stay.image}
                        alt={stay.title}
                      />

                      <div className="nearby-stay__content">
                        <h3>{stay.title}</h3>

                        <p className="nearby-stay__rating">
                          ★ {stay.rating}
                        </p>

                        <p>
                          <strong>
                            {stay.price}
                          </strong>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Reservation sidebar */}
            <div className="listing-sidebar">
              <ReservationCard
                pricing={listing.pricing}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                maxGuests={listing.guestCount}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer groups={listing.footerGroups} />

      {isPhotoTourOpen && (
        <PhotoTour
          images={listing.images}
          sections={listing.photoTourSections}
          onClose={closePhotoTour}
          onOpenLightbox={openLightbox}
          isLightboxOpen={lightboxIndex !== null}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={listing.images}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={showPreviousPhoto}
          onNext={showNextPhoto}
        />
      )}
    </div>
  );
}

export default App;
