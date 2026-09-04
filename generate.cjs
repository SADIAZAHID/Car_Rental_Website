const fs = require('fs');
const path = require('path');

const srcFiles = {
  'index.css': `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

:root {
  --color-bg-light: #e5e7eb; /* cool concrete grey */
  --color-bg-dark: #14171c; /* dark asphalt near-black */
  --color-primary: #f2a93b; /* headlight-gold accent */
  --color-primary-hover: #d98f1f;
  --color-success: #2dd4bf; /* teal go-signal */
  --color-danger: #ef4444; /* red stop-signal */
  --color-text-light: #374151;
  --color-text-dark: #f3f4f6;

  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Space Mono', monospace;
}

html[data-theme='light'] {
  --bg-color: var(--color-bg-light);
  --text-color: var(--color-text-light);
  --card-bg: #ffffff;
  --border-color: #d1d5db;
}

html[data-theme='dark'] {
  --bg-color: var(--color-bg-dark);
  --text-color: var(--color-text-dark);
  --card-bg: #1f2937;
  --border-color: #374151;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font-body);
  transition: background-color 0.3s, color 0.3s;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.mono {
  font-family: var(--font-mono);
}

a {
  color: inherit;
  text-decoration: none;
}

.btn {
  background-color: var(--color-primary);
  color: #14171c;
  font-family: var(--font-heading);
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  transition: background-color 0.2s, transform 0.2s;
  display: inline-block;
}

.btn:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.btn:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-danger {
  background-color: var(--color-danger);
  color: white;
}
.btn-danger:hover {
  background-color: #b91c1c;
}
`,
  'main.jsx': `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
  'App.jsx': `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BookingProvider>
          <BrowserRouter>
            <div className="app-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
              <Navbar />
              <main style={{flex: 1}}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<h2>404 Not Found</h2>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </BookingProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;
`,
  'context/ThemeContext.jsx': `
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
`,
  'context/AuthContext.jsx': `
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (email, password) => {
    if (email === 'admin@nomadmotors.com' && password === 'admin123') {
      setUser({ email, role: 'admin', name: 'Admin' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
`,
  'context/BookingContext.jsx': `
import { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings')) || []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { ...booking, id: Date.now(), status: 'Pending' }]);
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
`,
  'data/cars.js': `
export const cars = [
  { id: 1, name: 'Toyota Camry', category: 'Sedan', pricePerDay: 45, fuelType: 'Gasoline', transmission: 'Auto', seats: 5, rating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Tesla Model 3', category: 'Electric', pricePerDay: 85, fuelType: 'Electric', transmission: 'Auto', seats: 5, rating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Ford Mustang', category: 'Luxury', pricePerDay: 120, fuelType: 'Gasoline', transmission: 'Manual', seats: 4, rating: 4.7, available: false, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42a5?auto=format&fit=crop&q=80&w=800' },
];
`,
  'components/Navbar/Navbar.jsx': `
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-brand"><Link to="/">NOMAD MOTORS</Link></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Fleet</Link>
        {user && <Link to="/history">My Bookings</Link>}
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      </div>
      <div className="nav-actions">
        <button onClick={toggleTheme} className="btn-theme">{theme === 'light' ? '🌙' : '☀️'}</button>
        {user ? (
          <button onClick={logout} className="btn">Logout</button>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}
`,
  'components/Navbar/Navbar.css': `
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-bg-dark);
  color: var(--color-text-dark);
  border-bottom: 2px solid var(--color-primary);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-brand {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
}
.nav-links a {
  margin: 0 1rem;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--color-primary);
}
.btn-theme {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
}
`,
  'components/Footer/Footer.jsx': `
import './Footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Nomad Motors. All rights reserved.</p>
    </footer>
  );
}
`,
  'components/Footer/Footer.css': `
.footer {
  text-align: center;
  padding: 2rem;
  background-color: var(--color-bg-dark);
  color: #9ca3af;
  margin-top: auto;
}
`,
  'components/RouteLine/RouteLine.jsx': `
import './RouteLine.css';
export default function RouteLine() {
  return <div className="route-line" />;
}
`,
  'components/RouteLine/RouteLine.css': `
.route-line {
  height: 4px;
  width: 100%;
  background: repeating-linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-primary) 30px,
    transparent 30px,
    transparent 60px
  );
  margin: 2rem 0;
  opacity: 0.8;
}
`,
  'pages/Home/Home.jsx': `
import React from 'react';
import RouteLine from '../../components/RouteLine/RouteLine';
import { cars } from '../../data/cars';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Ignite Your Journey</h1>
          <p>Premium rides for the modern nomad.</p>
          <button className="btn">Book Now</button>
        </div>
      </section>
      <RouteLine />
      <section className="featured">
        <h2>Featured Fleet</h2>
        <div className="car-grid">
          {cars.slice(0, 3).map(car => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p className="mono">\\$\\{car.pricePerDay\\} / day</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
`,
  'pages/Home/Home.css': `
.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(rgba(20,23,28,0.7), rgba(20,23,28,0.7)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920') center/cover;
  color: white;
}
.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}
.featured {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.featured h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}
.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.car-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.car-card:hover {
  transform: translateY(-5px);
}
.car-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.car-card h3 {
  padding: 1rem;
  font-size: 1.5rem;
}
.car-card p {
  padding: 0 1rem 1rem;
  color: var(--color-primary);
  font-weight: bold;
}
`
};

for (const [file, content] of Object.entries(srcFiles)) {
  const fullPath = path.join(__dirname, 'src', file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
}
console.log('Files generated!');
