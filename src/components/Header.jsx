import { useState } from "react";

function Header() {
  const [headerMessage, setHeaderMessage] = useState("");

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" aria-label="Home">
          <span className="brand__mark" aria-hidden="true">
            ◇
          </span>
          <span className="brand__name">airbnb</span>
        </a>

        <nav className="primary-nav" aria-label="Search filters">
          <button
            type="button"
            onClick={() =>
              setHeaderMessage("Choose where you want to go.")
            }
          >
            <span className="search-filter__label">Where</span>
            <span className="search-filter__value">Anywhere</span>
          </button>

          <span className="search-divider" aria-hidden="true">
            |
          </span>

          <button
            type="button"
            onClick={() =>
              setHeaderMessage("Choose your travel dates.")
            }
          >
            <span className="search-filter__label">When</span>
            <span className="search-filter__value">Anytime</span>
          </button>

          <span className="search-divider" aria-hidden="true">
            |
          </span>

          <button
            type="button"
            onClick={() =>
              setHeaderMessage("Add guests to your search.")
            }
          >
            <span className="search-filter__label">Who</span>
            <span className="search-filter__value">Add guests</span>
          </button>

          <button
            className="header-search-button"
            type="button"
            aria-label="Search"
            onClick={() =>
              setHeaderMessage("Search is available in this demo.")
            }
          >
            <span aria-hidden="true">⌕</span>
          </button>
        </nav>

        <div className="header-actions">
          {headerMessage && (
            <p className="interaction-feedback" role="status">
              {headerMessage}
            </p>
          )}

          <button
            className="host-link"
            type="button"
            onClick={() =>
              setHeaderMessage("Hosting is available in this demo.")
            }
          >
            Become a host
          </button>

          <button
            className="globe-button"
            type="button"
            aria-label="Choose language"
            onClick={() =>
              setHeaderMessage(
                "Language selection is available in this demo.",
              )
            }
          >
            ◎
          </button>

          <button
            className="account-button"
            type="button"
            aria-label="Open account menu"
            onClick={() =>
              setHeaderMessage("Account menu is available in this demo.")
            }
          >
            <span aria-hidden="true">☰</span>
            <span className="account-avatar" aria-hidden="true">
              ♙
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;