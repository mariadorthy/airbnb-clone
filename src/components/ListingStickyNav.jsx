function ListingStickyNav({ listing, onReserve }) {
  const handleNavigation = (event, id) => {
    event.preventDefault();

    const target = document.getElementById(id);

    if (!target) {
      console.warn(`Element #${id} not found`);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="listing-sticky-nav"
      aria-label="Listing navigation"
    >
      <div className="listing-sticky-nav__inner">
        <div className="listing-sticky-nav__links">
          <a
            href="#photo-tour"
            onClick={(event) =>
              handleNavigation(event, "photo-tour")
            }
          >
            Photos
          </a>

          <a
            href="#amenities"
            onClick={(event) =>
              handleNavigation(event, "amenities")
            }
          >
            Amenities
          </a>

          <a
            href="#reviews"
            onClick={(event) =>
              handleNavigation(event, "reviews")
            }
          >
            Reviews
          </a>

          <a
            href="#location"
            onClick={(event) =>
              handleNavigation(event, "location")
            }
          >
            Location
          </a>
        </div>

        <div className="listing-sticky-nav__reservation">
          <div className="listing-sticky-nav__price">
            <strong>
              ₹{listing.pricing.total.toLocaleString("en-IN")}
            </strong>

            <span>
              for {listing.pricing.nights} nights
            </span>
          </div>

          <button
            type="button"
            onClick={onReserve}
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ListingStickyNav;
