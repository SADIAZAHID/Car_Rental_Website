import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/cars', label: 'Cars' },
  { to: '/booking', label: 'Book Now' },
  { to: '/history', label: 'My Bookings' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function closeMenu() {
    setOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-mark">DN</span>
          <span className="navbar__brand-text">
            Drive<em>Now</em>
          </span>
        </NavLink>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          )}

          <div className="navbar__actions navbar__actions--mobile">
            {user ? (
              <button className="btn btn-outline btn-block" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <NavLink to="/login" className="btn btn-outline btn-block" onClick={closeMenu}>
                Log in
              </NavLink>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="navbar__user">
              <span className="navbar__user-name">Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary">
              Log in
            </NavLink>
          )}

          <button
            className={`navbar__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}