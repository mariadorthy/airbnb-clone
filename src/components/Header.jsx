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

          <span className="brand__name">
            airbnb
          </span>
        </a>

       <nav
  className="primary-nav"
  aria-label="Primary navigation"
>
  <button
    type="button"
    onClick={() =>
      setHeaderMessage("Stays navigation is available in this demo.")
    }
  >
    Stays
  </button>

  <button
    type="button"
    onClick={() =>
      setHeaderMessage(
        "Experiences navigation is available in this demo.",
      )
    }
  >
    Experiences
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
    setHeaderMessage(
      "Hosting is available in this demo.",
    )
  }
>
  Airbnb your home
</button>

      <button
  className="globe-button"
  type="button"
  aria-label="Choose language"
  onClick={() =>
    setHeaderMessage("Language selection is available in this demo.")
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
  <span aria-hidden="true">
    ☰
  </span>

  <span
    className="account-avatar"
    aria-hidden="true"
  >
    ●
  </span>
</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

