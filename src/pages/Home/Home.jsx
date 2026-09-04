import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import CarCard from '../../components/CarCard/CarCard';
import RouteLine from '../../components/RouteLine/RouteLine';
import cars from '../../data/cars';
import './Home.css';

const featured = cars.slice(0, 4);

const perks = [
  { title: 'No hidden fees', body: 'The price you see on the listing is the price you pay per day. Taxes and insurance are shown before you confirm.' },
  { title: 'Verified fleet', body: 'Every car is inspected and serviced between rentals, so what you book is what shows up at pickup.' },
  { title: 'Flexible pickup', body: 'Choose from six pickup points across the city, or ask about doorstep delivery at checkout.' },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <RouteLine label="Why DriveNow" />
          <div className="perks">
            {perks.map((perk) => (
              <div className="perk" key={perk.title}>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured fleet</span>
            <h2>Popular picks this week</h2>
            <p>A sample of what's parked and ready. Browse the full fleet to filter by budget, body type, and fuel.</p>
          </div>

          <div className="car-grid">
            {featured.map((car) => (
              <CarCard car={car} key={car.id} />
            ))}
          </div>

          <div className="home__more">
            <Link to="/cars" className="btn btn-outline">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container cta__inner">
          <div>
            <h2>Ready for the next trip?</h2>
            <p>Reserve a car in under two minutes — no paperwork at the counter.</p>
          </div>
          <Link to="/booking" className="btn btn-primary">
            Book a Car Now
          </Link>
        </div>
      </section>
    </>
  );
}