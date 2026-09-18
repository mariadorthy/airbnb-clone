function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" aria-label="Home">
          <span className="brand__mark" aria-hidden="true">
            ◇
          </span>
          <span className="brand__name">airbnb</span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#stay">Stays</a>
          <a href="#experiences">Experiences</a>
        </nav>

        <div className="header-actions">
          <a className="host-link" href="#hosting">
            Airbnb your home
          </a>

          <button
            className="globe-button"
            type="button"
            aria-label="Choose language"
          >
            ◎
          </button>

          <button
            className="account-button"
            type="button"
            aria-label="Open account menu"
          >
            <span aria-hidden="true">☰</span>
            <span className="account-avatar" aria-hidden="true">
              ●
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;