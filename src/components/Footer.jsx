function Footer({ groups }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-groups">
          {groups.map((group) => (
            <section className="footer-group" key={group.title}>
              <h2>{group.title}</h2>

              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replaceAll(" ", "-")}`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 Airbnb-style listing demo</span>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;