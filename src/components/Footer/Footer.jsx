import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__brand-text">
            Drive<em>Now</em>
          </span>
          <p>
            Self-drive car rentals for city errands, weekend trips, and everything
            in between. Book online in minutes, pick up the keys, go.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">x</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/cars">Browse Cars</Link>
          <Link to="/booking">Book a Car</Link>
          <Link to="/history">My Bookings</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#help">Help Centre</a>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <p>Rawalpindi, Punjab, Pakistan</p>
          <p>+92 300 1234567</p>
          <p>support@drivenow.example</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} DriveNow. Student project — for educational use.</span>
        </div>
      </div>
    </footer>
  );
}