import { useMemo, useState } from "react";

function ReservationCard({
  pricing,
  rating,
  reviewCount,
  maxGuests,
}) {
  const [checkIn, setCheckIn] = useState(
  "2026-10-18",
);
const [checkOut, setCheckOut] = useState(
  "2026-10-23",
);
const [guests, setGuests] = useState(2);

  const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const difference = end.getTime() - start.getTime();

    return difference > 0 ? Math.round(difference / 86400000) : 0;
  }, [checkIn, checkOut]);

  const [reservationMessage, setReservationMessage] = useState("");

const handleReserve = () => {
  if (!checkIn || !checkOut) {
    setReservationMessage("Please select check-in and check-out dates.");
    return;
  }

  if (checkIn >= checkOut) {
    setReservationMessage("Check-out must be after check-in.");
    return;
  }

  if (guests < 1 || guests > maxGuests) {
    setReservationMessage(`Guests must be between 1 and ${maxGuests}.`);
    return;
  }

  setReservationMessage(
    `Reservation request ready for ${guests} ${
      guests === 1 ? "guest" : "guests"
    }, from ${checkIn} to ${checkOut}.`,
  );
};

  const nightlyPrice =
  pricing.nights > 0
    ? pricing.total / pricing.nights
    : 0;

const calculatedTotal = nights * nightlyPrice;

  const handleCheckInChange = (event) => {
  const nextCheckIn = event.target.value;

  setCheckIn(nextCheckIn);
  setReservationMessage("");

  if (checkOut && nextCheckIn >= checkOut) {
    setCheckOut("");
  }
};

  const handleGuestChange = (delta) => {
    setGuests((current) =>
      Math.min(maxGuests, Math.max(1, current + delta)),
    );
  };

  return (
    <aside
      className="reservation-card"
      aria-label="Reservation information"
    >
      <div className="reservation-card__price">
<strong>{money(calculatedTotal)}</strong>
  <span>
    {nights > 0 ? ` for ${nights} nights` : " for your stay"}
  </span>
</div>

      <div className="reservation-card__rating">
        <span aria-hidden="true">★</span>
        <strong>{rating}</strong>
        <a href="#reviews">{reviewCount} reviews</a>
      </div>

      <div className="reservation-fields">
        <div className="reservation-field">
          <label
            className="reservation-field__label"
            htmlFor="check-in"
          >
            CHECK-IN
          </label>

          <input
            id="check-in"
            name="check-in"
            type="date"
            value={checkIn}
            onChange={handleCheckInChange}
            aria-label="Check-in date"
          />
        </div>

        <div className="reservation-field">
          <label
            className="reservation-field__label"
            htmlFor="check-out"
          >
            CHECKOUT
          </label>

          <input
  id="check-out"
  name="check-out"
  type="date"
  value={checkOut}
  min={checkIn || undefined}
  onChange={(event) => {
    const nextCheckOut = event.target.value;

    setCheckOut(nextCheckOut);
    setReservationMessage("");
  }}
  aria-label="Checkout date"
/>
        </div>

        <div className="reservation-field reservation-field--full">
          <span className="reservation-field__label">
            GUESTS
          </span>

          <div className="guest-control">
            <span className="guest-control__summary">
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>

            <div className="guest-control__buttons">
              <button
                className="guest-control__button"
                type="button"
                onClick={() => handleGuestChange(-1)}
                disabled={guests <= 1}
                aria-label="Decrease guest count"
              >
                −
              </button>

              <button
                className="guest-control__button"
                type="button"
                onClick={() => handleGuestChange(1)}
                disabled={guests >= maxGuests}
                aria-label={`Increase guest count, maximum ${maxGuests}`}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {reservationMessage ? (
  <p className="reservation-feedback" role="status">
    {reservationMessage}
  </p>
) : (
  <p className="reservation-feedback" aria-live="polite">
    {nights > 0
      ? `${nights} nights · ${guests} guests`
      : "Add dates to see your stay details."}
  </p>
)}

      <button
  className="reserve-button"
  type="button"
  onClick={handleReserve}
>
  Reserve
</button>

      <p className="reservation-note">
        You won't be charged yet
      </p>

  {nights > 0 ? (
  <>
    <div className="price-breakdown__total">
  <strong>{nights} nights</strong>
  <strong>{money(calculatedTotal)}</strong>
</div>
    <div>
      <p className="price-breakdown__note">
        Price updates based on the selected number of nights.
      </p>
    </div>
  </>
) : (
  <div className="price-breakdown">
    <div className="price-breakdown__empty">
      <span>
        Select check-in and checkout dates to calculate
        your stay.
      </span>
    </div>
  </div>
)}
    </aside>
  );
}

export default ReservationCard;
