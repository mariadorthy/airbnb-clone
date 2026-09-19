import { useState } from "react";

function Footer({ groups }) {
    const [footerMessage, setFooterMessage] = useState("");
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
                     <span>{link}</span>

                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

       <div className="footer-bottom">
  <span>© 2026 Airbnb-style listing demo</span>

  <button
    type="button"
    onClick={() =>
      setFooterMessage(
        "Privacy information is available in this demo only.",
      )
    }
  >
    Privacy
  </button>

  <button
    type="button"
    onClick={() =>
      setFooterMessage(
        "Terms information is available in this demo only.",
      )
    }
  >
    Terms
  </button>

  <button
    type="button"
    onClick={() =>
      setFooterMessage(
        "Sitemap navigation is available in this demo only.",
      )
    }
  >
    Sitemap
  </button>
</div>

{footerMessage && (
  <p className="interaction-feedback" role="status">
    {footerMessage}
  </p>
)}
      </div>
    </footer>
  );
}

export default Footer;