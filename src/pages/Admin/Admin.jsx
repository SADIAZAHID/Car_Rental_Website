import { useMemo } from 'react';
import { useBookings } from '../../context/BookingContext';
import cars from '../../data/cars';
import { formatPKR } from '../../utils/currency';
import './Admin.css';

export default function Admin() {
    const { bookings, updateStatus, removeBooking } = useBookings();

    const stats = useMemo(() => {
        const totalRevenue = bookings
            .filter((b) => b.status !== 'Cancelled')
            .reduce((sum, b) => sum + (b.estimatedTotal || 0), 0);
        const available = cars.filter((c) => c.available).length;

        return {
            totalBookings: bookings.length,
            pending: bookings.filter((b) => b.status === 'Pending').length,
            confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
            totalRevenue,
            fleetSize: cars.length,
            available,
        };
    }, [bookings]);

    return (
        <div className="section admin-page">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">Admin dashboard</span>
                    <h2>Fleet & bookings overview</h2>
                    <p>A simple operations view for staff to review and action incoming requests.</p>
                </div>

                <div className="admin-stats">
                    <div className="admin-stat">
                        <span>Total bookings</span>
                        <strong>{stats.totalBookings}</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Pending review</span>
                        <strong>{stats.pending}</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Confirmed</span>
                        <strong>{stats.confirmed}</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Estimated revenue</span>
                        <strong>{formatPKR(stats.totalRevenue)}</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Fleet available</span>
                        <strong>{stats.available}/{stats.fleetSize}</strong>
                    </div>
                </div>

                <h3 className="admin-page__subhead">Booking requests</h3>

                {bookings.length === 0 ? (
                    <p className="admin-page__empty">No booking requests yet.</p>
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car</th>
                                    <th>Dates</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => (
                                    <tr key={b.id}>
                                        <td>
                                            <strong>{b.fullName}</strong>
                                            <span>{b.email}</span>
                                        </td>
                                        <td>{b.carName || '—'}</td>
                                        <td>{b.pickupDate} → {b.returnDate}</td>
                                        <td>{formatPKR(b.estimatedTotal || 0)}</td>
                                        <td>
                                            <select
                                                value={b.status}
                                                onChange={(e) => updateStatus(b.id, e.target.value)}
                                                className={`admin-table__status admin-table__status--${b.status.toLowerCase()}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="admin-table__delete" onClick={() => removeBooking(b.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}