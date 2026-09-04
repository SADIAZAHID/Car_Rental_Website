import { Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { formatPKR } from '../../utils/currency';
import './BookingHistory.css';

function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BookingHistory() {
    const { bookings, removeBooking } = useBookings();

    return (
        <div className="section history-page">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">Your activity</span>
                    <h2>My bookings</h2>
                    <p>Everything you've requested through this browser, stored locally on this device.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="history-page__empty">
                        <h3>No bookings yet</h3>
                        <p>Once you submit a booking request, it will show up here.</p>
                        <Link to="/booking" className="btn btn-primary">
                            Book a Car
                        </Link>
                    </div>
                ) : (
                    <div className="history-list">
                        {bookings.map((b) => (
                            <div className="history-card" key={b.id}>
                                <div className="history-card__main">
                                    <h3>{b.carName || 'Car removed'}</h3>
                                    <p>
                                        {formatDate(b.pickupDate)} → {formatDate(b.returnDate)} · {b.totalDays} day{b.totalDays === 1 ? '' : 's'}
                                    </p>
                                    <p className="history-card__contact">
                                        {b.fullName} · {b.email} · {b.phone}
                                    </p>
                                </div>
                                <div className="history-card__side">
                                    <span className={`history-status history-status--${b.status.toLowerCase()}`}>
                                        {b.status}
                                    </span>
                                    <strong>{formatPKR(b.estimatedTotal || 0)}</strong>
                                    <button className="history-card__remove" onClick={() => removeBooking(b.id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}