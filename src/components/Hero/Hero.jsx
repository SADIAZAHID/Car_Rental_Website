import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero__inner">
                <div className="hero__copy">
                    <span className="eyebrow">● Open 24/7 across 6 pickup points</span>
                    <h1>
                        Rent the road,
                        <br />
                        not just the car.
                    </h1>
                    <p>
                        DriveNow puts a clean, well-maintained fleet a few taps away —
                        from city hatchbacks to weekend-ready SUVs. Pick your dates, pick
                        your car, and drive off in minutes.
                    </p>
                    <div className="hero__ctas">
                        <Link to="/cars" className="btn btn-primary">
                            Browse the Fleet
                        </Link>
                        <Link to="/booking" className="btn btn-outline">
                            Book a Car
                        </Link>
                    </div>

                    <dl className="hero__stats">
                        <div>
                            <dt>120+</dt>
                            <dd>Cars in fleet</dd>
                        </div>
                        <div>
                            <dt>18k</dt>
                            <dd>Trips completed</dd>
                        </div>
                        <div>
                            <dt>4.8/5</dt>
                            <dd>Average rating</dd>
                        </div>
                    </dl>
                </div>

                <div className="hero__visual">
                    <div className="hero__gauge">
                        <svg viewBox="0 0 200 120" aria-hidden="true">
                            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" />
                            <path d="M20 110 A80 80 0 0 1 152 42" fill="none" stroke="var(--gold)" strokeWidth="14" strokeLinecap="round" />
                        </svg>
                        <div className="hero__gauge-label">
                            <strong>Ready</strong>
                            <span>to roll</span>
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
                        alt="A car ready for pickup, parked in soft evening light"
                        className="hero__image"
                    />
                </div>
            </div>
        </section>
    );
}