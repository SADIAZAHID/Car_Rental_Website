import { useSearchParams } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import './Booking.css';

export default function Booking() {
    const [searchParams] = useSearchParams();
    const carId = searchParams.get('car') || '';

    return (
        <div className="section booking-page">
            <div className="container booking-page__inner">
                <div className="section-head">
                    <span className="eyebrow">Reserve a car</span>
                    <h2>Book your ride</h2>
                    <p>Fill in your details below. We'll confirm your booking by email or phone within a couple of hours.</p>
                </div>

                <BookingForm defaultCarId={carId} />
            </div>
        </div>
    );
}