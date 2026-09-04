import { Link, useNavigate, useParams } from 'react-router-dom';
import cars from '../../data/cars';
import { formatPKR } from '../../utils/currency';
import './CarDetails.css';

export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const car = cars.find((c) => c.id === id);

    if (!car) {
        return (
            <div className="section container car-details__missing">
                <h2>Car not found</h2>
                <p>We couldn't find that listing. It may have been removed from the fleet.</p>
                <Link to="/cars" className="btn btn-primary">
                    Back to All Cars
                </Link>
            </div>
        );
    }

    const specs = [
        { label: 'Category', value: car.category },
        { label: 'Fuel type', value: car.fuelType },
        { label: 'Transmission', value: car.transmission },
        { label: 'Seats', value: `${car.seats} people` },
        { label: 'Rating', value: `${car.rating} / 5` },
        { label: 'Status', value: car.available ? 'Available' : 'Currently booked' },
    ];

    return (
        <div className="section car-details">
            <div className="container car-details__grid">
                <div className="car-details__image">
                    <img src={car.image} alt={car.name} />
                    <span className={`car-card__badge ${car.available ? 'is-available' : 'is-booked'}`}>
                        <span className="car-card__dot" />
                        {car.available ? 'Available' : 'Booked'}
                    </span>
                </div>

                <div className="car-details__info">
                    <span className="eyebrow">{car.category}</span>
                    <h1>{car.name}</h1>
                    <p className="car-details__desc">{car.description}</p>

                    <div className="car-details__specs">
                        {specs.map((spec) => (
                            <div key={spec.label}>
                                <span>{spec.label}</span>
                                <strong>{spec.value}</strong>
                            </div>
                        ))}
                    </div>

                    <div className="car-details__price-row">
                        <div>
                            <span>Daily rate</span>
                            <strong>{formatPKR(car.pricePerDay)}</strong>
                        </div>
                        <button className="btn btn-primary" disabled={!car.available}
                            onClick={() => navigate(`/booking?car=${car.id}`)}>
                            {car.available ? 'Book This Car' : 'Currently Unavailable'}
                        </button>
                    </div>

                    <Link to="/cars" className="car-details__back">
                        ← Back to all cars
                    </Link>
                </div>
            </div>
        </div>
    );
}