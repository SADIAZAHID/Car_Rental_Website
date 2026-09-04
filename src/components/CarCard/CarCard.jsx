import { Link } from 'react-router-dom';
import { formatPKR } from '../../utils/currency';
import './CarCard.css';

export default function CarCard({ car }) {
    return (
        <article className={`car-card ${!car.available ? 'is-unavailable' : ''}`}>
            <div className="car-card__image-wrap">
                <img src={car.image} alt={car.name} loading="lazy" />
                <span className={`car-card__badge ${car.available ? 'is-available' : 'is-booked'}`}>
                    <span className="car-card__dot" />
                    {car.available ? 'Available' : 'Booked'}
                </span>
            </div>

            <div className="car-card__body">
                <div className="car-card__title-row">
                    <h3>{car.name}</h3>
                    <span className="car-card__rating">★ {car.rating}</span>
                </div>
                <p className="car-card__category">{car.category}</p>

                <ul className="car-card__specs">
                    <li>{car.fuelType}</li>
                    <li>{car.transmission}</li>
                    <li>{car.seats} seats</li>
                </ul>

                <div className="car-card__footer">
                    <div className="car-card__price">
                        <span>{formatPKR(car.pricePerDay)}</span>/day
                    </div>
                    <div className="car-card__actions">
                        <Link to={`/cars/${car.id}`} className="btn btn-outline">
                            Details
                        </Link>
                        <Link
                            to={`/booking?car=${car.id}`}
                            className={`btn btn-primary ${!car.available ? 'btn-disabled-link' : ''}`}
                            aria-disabled={!car.available}
                            onClick={(e) => !car.available && e.preventDefault()}
                        >
                            Book
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}